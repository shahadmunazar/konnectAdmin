// import React, { useEffect, useState } from "react";
// import { Table, Button, Form, Modal } from "react-bootstrap";
// import Layout from "../Layout/Layout";

// const SubscriptionManagement = () => {
//   const [plans, setPlans] = useState([]);
//   const [filteredPlans, setFilteredPlans] = useState([]);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [tierFilter, setTierFilter] = useState("");
//   const [editModal, setEditModal] = useState(false);
//   const [selectedPlan, setSelectedPlan] = useState(null);
//   const [billingType, setBillingType] = useState("monthly");
//   const [pricing, setPricing] = useState({
//     monthly: "",
//     yearly: "",
//     custom: "",
//   });

//   // Fetch plans from API
//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(`${BASE_URL}/api/superadmin/plans`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const result = await response.json();

//         if (result.success) {
//           const formattedPlans = result.data.map((plan) => ({
//             id: plan.id,
//             name: plan.name,
//             tier: plan.tier,
//             features: JSON.parse(plan.features),
//             assetLimit: plan.asset_limit
//               ? `${plan.asset_limit} Assets`
//               : "Unlimited Assets",
//             price: `$${plan.price_monthly}/month`,
//             status: plan.status ? "Active" : "Inactive",
//             lastModified: new Date(plan.updatedAt).toISOString().split("T")[0],
//             original: plan,
//           }));

//           setPlans(formattedPlans);
//           setFilteredPlans(formattedPlans);
//         } else {
//           console.error("Failed to fetch plans");
//         }
//       } catch (err) {
//         console.error("Error fetching plans:", err);
//       }
//     };

//     fetchPlans();
//   }, []);

//   // Filtering
//   useEffect(() => {
//     let filtered = plans;
//     if (search) {
//       filtered = filtered.filter((plan) =>
//         plan.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     if (statusFilter) {
//       filtered = filtered.filter((plan) => plan.status === statusFilter);
//     }
//     if (tierFilter) {
//       filtered = filtered.filter((plan) => plan.tier === tierFilter);
//     }
//     setFilteredPlans(filtered);
//   }, [search, statusFilter, tierFilter, plans]);

//   // Handlers
//   const handleEdit = (plan) => {
//     setSelectedPlan(plan);
//     setPricing({
//       monthly: plan.original.price_monthly || "",
//       yearly: plan.original.price_yearly || "",
//       custom: plan.original.price_custom || "",
//     });
//     setBillingType(plan.original.billing_cycle || "monthly");
//     setEditModal(true);
//   };

//   const handleStatusToggle = (planId) => {
//     setPlans((prev) =>
//       prev.map((plan) =>
//         plan.id === planId
//           ? {
//               ...plan,
//               status: plan.status === "Active" ? "Inactive" : "Active",
//               lastModified: new Date().toISOString().split("T")[0],
//             }
//           : plan
//       )
//     );
//   };

//   return (
//     <Layout>
//       <div className="container mt-6">
//         <h3>SAAS Subscription Plans</h3>

//         <div className="row my-3">
//           <div className="col-md-4">
//             <Form.Control
//               type="text"
//               placeholder="Search by Plan Name"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//           <div className="col-md-3">
//             <Form.Select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="">All Statuses</option>
//               <option value="Active">Enabled</option>
//               <option value="Inactive">Disabled</option>
//             </Form.Select>
//           </div>
//           <div className="col-md-3">
//             <Form.Select
//               value={tierFilter}
//               onChange={(e) => setTierFilter(e.target.value)}
//             >
//               <option value="">All Tiers</option>
//               <option value="Basic">Basic</option>
//               <option value="Intermediate">Intermediate</option>
//               <option value="Premium">Premium</option>
//             </Form.Select>
//           </div>
//         </div>

//         <Table striped bordered hover>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Tier</th>
//               <th>Features</th>
//               <th>Asset Limit</th>
//               <th>Pricing</th>
//               <th>Status</th>
//               <th>Last Modified</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredPlans.map((plan) => (
//               <tr key={plan.id}>
//                 <td>{plan.name}</td>
//                 <td>{plan.tier}</td>
//                 <td>
//                   <ul>
//                     {plan.features.map((f, i) => (
//                       <li key={i}>{f}</li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td>{plan.assetLimit}</td>
//                 <td>{plan.price}</td>
//                 <td>{plan.status}</td>
//                 <td>{plan.lastModified}</td>
//                 <td>
//                   <Button
//                     variant="info"
//                     size="sm"
//                     onClick={() => handleEdit(plan)}
//                   >
//                     Edit
//                   </Button>{" "}
//                   <Button
//                     variant={plan.status === "Active" ? "danger" : "success"}
//                     size="sm"
//                     onClick={() => handleStatusToggle(plan.id)}
//                   >
//                     {plan.status === "Active" ? "Disable" : "Enable"}
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>

//         {/* Edit Modal */}
//         <Modal show={editModal} onHide={() => setEditModal(false)}>
//           <Modal.Header closeButton>
//             <Modal.Title>Edit Plan</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {selectedPlan && (
//               <Form>
//                 <Form.Group className="mb-3">
//                   <Form.Label>Plan Name</Form.Label>
//                   <Form.Control
//                     type="text"
//                     defaultValue={selectedPlan.name}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     defaultValue={selectedPlan.original.description}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Billing Type</Form.Label>
//                   <Form.Select
//                     value={billingType}
//                     onChange={(e) => setBillingType(e.target.value)}
//                   >
//                     <option value="monthly">Monthly</option>
//                     <option value="yearly">Yearly</option>
//                     <option value="custom">Custom</option>
//                   </Form.Select>
//                 </Form.Group>

//                 {billingType === "monthly" && (
//                   <Form.Group className="mb-3">
//                     <Form.Label>Monthly Price</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={pricing.monthly}
//                       onChange={(e) =>
//                         setPricing({ ...pricing, monthly: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                 )}

//                 {billingType === "yearly" && (
//                   <Form.Group className="mb-3">
//                     <Form.Label>Yearly Price</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={pricing.yearly}
//                       onChange={(e) =>
//                         setPricing({ ...pricing, yearly: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                 )}

//                 {billingType === "custom" && (
//                   <Form.Group className="mb-3">
//                     <Form.Label>Custom Billing Info</Form.Label>
//                     <Form.Control
//                       type="text"
//                       value={pricing.custom}
//                       onChange={(e) =>
//                         setPricing({ ...pricing, custom: e.target.value })
//                       }
//                     />
//                   </Form.Group>
//                 )}

//                 <Form.Group className="mb-3">
//                   <Form.Label>Asset Limit</Form.Label>
//                   <Form.Control
//                     type="text"
//                     defaultValue={selectedPlan.assetLimit}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Included Features</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={3}
//                     defaultValue={selectedPlan.features.join(", ")}
//                   />
//                 </Form.Group>

//                 <Button variant="primary" onClick={() => setEditModal(false)}>
//                   Save Changes
//                 </Button>
//               </Form>
//             )}
//           </Modal.Body>
//         </Modal>
//       </div>
//     </Layout>
//   );
// };

// export default SubscriptionManagement;

import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import Layout from "../Layout/Layout";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SubscriptionManagement = () => {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingType, setBillingType] = useState("monthly");
  const [pricing, setPricing] = useState({
    monthly: "",
    yearly: "",
    custom: "",
  });
  const [description, setDescription] = useState("");
  const [featuresText, setFeaturesText] = useState("");
  const [assetLimit, setAssetLimit] = useState("");
  const [userLimit, setUserLimit] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  // Fetch plans from API
  const shouldUseYearly = (updatedAt) => {
    const updatedDate = new Date(updatedAt);
    const now = new Date();
    const daysSinceUpdate = (now - updatedDate) / (1000 * 60 * 60 * 24);
  
    // Example: if updated within last 30 days, use yearly price
    return daysSinceUpdate < 30;
  };
  

  const fetchPlans = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/superadmin/plans`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const result = await response.json();
  
      if (result.success) {
        const formattedPlans = result.data.map((plan) => {
          let price = "";
  
          // Display price based on billing cycle
          switch (plan.billing_cycle) {
            case "custom":
              price = plan.price_custom ? `$${plan.price_custom} (Custom)` : "N/A";
              break;
            case "yearly":
              price = plan.price_yearly ? `$${plan.price_yearly}/year` : "N/A";
              break;
            case "monthly":
            default:
              price = plan.price_monthly ? `$${plan.price_monthly}/month` : "N/A";
              break;
          }
  
          return {
            id: plan.id,
            name: plan.name,
            tier: plan.tier,
            features: JSON.parse(plan.features),
            assetLimit: plan.asset_limit
              ? `${plan.asset_limit} Assets`
              : "Unlimited Assets",
            price: price,
            status: plan.status ? "Active" : "Inactive",
            lastModified: new Date(plan.updatedAt).toISOString().split("T")[0],
            original: plan,
          };
        });
  
        setPlans(formattedPlans);
        setFilteredPlans(formattedPlans);
      } else {
        console.error("Failed to fetch plans");
      }
    } catch (err) {
      console.error("Error fetching plans:", err);
    }
  };
  
  useEffect(() => {
    fetchPlans();
  }, []);
  
  // Filtering
  useEffect(() => {
    let filtered = plans;
    if (search) {
      filtered = filtered.filter((plan) =>
        plan.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (statusFilter) {
      filtered = filtered.filter((plan) => plan.status === statusFilter);
    }
    if (tierFilter) {
      filtered = filtered.filter((plan) => plan.tier === tierFilter);
    }
    setFilteredPlans(filtered);
  }, [search, statusFilter, tierFilter, plans]);

  const handleEdit = (plan) => {
    setSelectedPlan(plan);
    setPricing({
      monthly: plan.original.price_monthly || "",
      yearly: plan.original.price_yearly || "",
      custom: plan.original.price_custom || "",
    });
    setBillingType(plan.original.billing_cycle || "monthly");
    setDescription(plan.original.description || "");
    setFeaturesText(plan.features.join(", "));
    setAssetLimit(plan.original.asset_limit || "");
    setUserLimit(plan.original.user_limit || "");
    setAdditionalInfo(plan.original.additional_info || "");
    setEditModal(true);
  };

  const handleStatusToggle = async (planId) => {
    const planToUpdate = plans.find((plan) => plan.id === planId);
    if (!planToUpdate) return;
  
    const newStatus = planToUpdate.status === "Active" ? false : true;
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(`${BASE_URL}/api/superadmin/toggle-plan-status/${planId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          // id: planId,
          status: newStatus,
        }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        setPlans((prev) =>
          prev.map((plan) =>
            plan.id === planId
              ? {
                  ...plan,
                  status: newStatus ? "Active" : "Inactive",
                  lastModified: new Date().toISOString().split("T")[0],
                }
              : plan
          )
        );
      } else {
        alert("Failed to update plan status.");
      }
    } catch (err) {
      console.error("Error toggling plan status:", err);
      alert("Something went wrong while updating status.");
    }
  };
  

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("token");
      const featuresArray = featuresText
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);

      const payload = {
        name: selectedPlan.name,
        description,
        tier: selectedPlan.tier,
        features: featuresArray,
        asset_limit: assetLimit,
        user_limit: parseInt(userLimit),
        price_monthly: parseFloat(pricing.monthly),
        price_yearly: parseFloat(pricing.yearly),
        price_custom: parseFloat(pricing.custom),
        billing_cycle: billingType,
        status: selectedPlan.status === "Active",
        additional_info: additionalInfo,
      };

      const response = await fetch(
        `${BASE_URL}/api/superadmin/update-plans/${selectedPlan.original.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Plan updated successfully!");
        fetchPlans();
        setEditModal(false);
      } else {
        alert("Failed to update plan.");
      }
    } catch (err) {
      console.error("Error updating plan:", err);
      alert("An error occurred while updating the plan.");
    }
  };

  return (
    <Layout>
      <div className="container mt-6">
        <h3>Subscription Plans</h3>

        <div className="row my-3">
          <div className="col-md-4">
            <Form.Control
              type="text"
              placeholder="Search by Plan Name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="Active">Enabled</option>
              <option value="Inactive">Disabled</option>
            </Form.Select>
          </div>
          <div className="col-md-3">
            <Form.Select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
            >
              <option value="">All Tiers</option>
              <option value="Basic">Basic</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Premium">Premium</option>
            </Form.Select>
          </div>
        </div>

        <Table  bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Tier</th>
              <th>Features</th>
              <th>Asset Limit</th>
              <th>Pricing</th>
              <th>Status</th>
              <th>Last Modified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlans.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.name}</td>
                <td>{plan.tier}</td>
                <td>
                  <ul>
                    {plan.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </td>
                <td>{plan.assetLimit}</td>
                <td>{plan.price}</td>
                <td>{plan.status}</td>
                <td>{plan.lastModified}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    onClick={() => handleEdit(plan)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant={plan.status === "Active" ? "danger" : "success"}
                    size="sm"
                    onClick={() => handleStatusToggle(plan.id)}
                  >
                    {plan.status === "Active" ? "Disable" : "Enable"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Edit Modal */}
        <Modal show={editModal} onHide={() => setEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Plan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedPlan && (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Plan Name</Form.Label>
                  <Form.Control type="text" value={selectedPlan.name} readOnly />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Billing Type</Form.Label>
                  <Form.Select
                    value={billingType}
                    onChange={(e) => setBillingType(e.target.value)}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    <option value="custom">Custom</option>
                  </Form.Select>
                </Form.Group>

                {billingType === "monthly" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Monthly Price</Form.Label>
                    <Form.Control
                      type="text"
                      value={pricing.monthly}
                      onChange={(e) =>
                        setPricing({ ...pricing, monthly: e.target.value })
                      }
                    />
                  </Form.Group>
                )}

                {billingType === "yearly" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Yearly Price</Form.Label>
                    <Form.Control
                      type="text"
                      value={pricing.yearly}
                      onChange={(e) =>
                        setPricing({ ...pricing, yearly: e.target.value })
                      }
                    />
                  </Form.Group>
                )}

                {billingType === "custom" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Custom Billing Info</Form.Label>
                    <Form.Control
                      type="text"
                      value={pricing.custom}
                      onChange={(e) =>
                        setPricing({ ...pricing, custom: e.target.value })
                      }
                    />
                  </Form.Group>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>Asset Limit</Form.Label>
                  <Form.Control
                    type="text"
                    value={assetLimit}
                    onChange={(e) => setAssetLimit(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>User Limit</Form.Label>
                  <Form.Control
                    type="number"
                    value={userLimit}
                    onChange={(e) => setUserLimit(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Included Features</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={featuresText}
                    onChange={(e) => setFeaturesText(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Additional Info</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" onClick={handleSaveChanges}>
                  Save Changes
                </Button>
              </Form>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  );
};

export default SubscriptionManagement;
