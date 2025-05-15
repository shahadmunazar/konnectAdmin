// import React, { useEffect, useState } from "react";
// import { Table, Button, Form, Modal } from "react-bootstrap";
// import Layout from "../Layout/Layout";
// import { CSVLink } from "react-csv";

// const ViewSubscribers = () => {
//   const [subscribers, setSubscribers] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [filters, setFilters] = useState({ plan: "", status: "", payment: "" });
//   const [selectedSubscriber, setSelectedSubscriber] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [auditLog, setAuditLog] = useState([]);

//   useEffect(() => {
//     // Simulated fetch
//     const dummyData = [
//       {
//         id: 1,
//         orgName: "Alpha Corp",
//         adminName: "John Doe",
//         adminContact: "john@alpha.com",
//         planName: "Pro",
//         planTier: "Intermediate",
//         status: "Active",
//         startDate: "2024-01-01",
//         endDate: "2025-01-01",
//         billingCycle: "Annually",
//         paymentStatus: "Paid",
//         orgDetails: {
//           address: "123 Main St",
//           industry: "IT",
//           users: 150
//         },
//         modules: ["Asset Management", "Maintenance Management"],
//         history: [
//           { date: "2024-01-01", action: "Subscribed", payment: "Paid" },
//           { date: "2025-01-01", action: "Renewal Due", payment: "Pending" }
//         ]
//       },
//       // Add more mock subscribers here
//     ];
//     setSubscribers(dummyData);
//     setFiltered(dummyData);

//     const dummyLog = [
//       { date: "2024-01-01", action: "Created subscription", user: "admin" },
//       { date: "2025-01-01", action: "Marked payment as pending", user: "admin" }
//     ];
//     setAuditLog(dummyLog);
//   }, []);

//   useEffect(() => {
//     let result = [...subscribers];
//     if (search) {
//       result = result.filter(s =>
//         s.orgName.toLowerCase().includes(search.toLowerCase()) ||
//         s.adminContact.toLowerCase().includes(search.toLowerCase())
//       );
//     }
//     if (filters.plan) result = result.filter(s => s.planName === filters.plan);
//     if (filters.status) result = result.filter(s => s.status === filters.status);
//     if (filters.payment) result = result.filter(s => s.paymentStatus === filters.payment);
//     setFiltered(result);
//   }, [search, filters, subscribers]);

//   const handleView = (subscriber) => {
//     setSelectedSubscriber(subscriber);
//     setShowModal(true);
//   };

//   return (
//     <Layout>
//       <div className="container mt-6">
//         <h3>Subscribers Management</h3>

//         <div className="d-flex mb-3 gap-2">
//           <Form.Control
//             type="text"
//             placeholder="Search by Org/Admin"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <Form.Select value={filters.plan} onChange={e => setFilters(f => ({ ...f, plan: e.target.value }))}>
//             <option value="">All Plans</option>
//             <option value="Basic">Basic</option>
//             <option value="Pro">Pro</option>
//             <option value="Premium">Premium</option>
//           </Form.Select>
//           <Form.Select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
//             <option value="">All Statuses</option>
//             <option value="Active">Active</option>
//             <option value="Expired">Expired</option>
//           </Form.Select>
//           <Form.Select value={filters.payment} onChange={e => setFilters(f => ({ ...f, payment: e.target.value }))}>
//             <option value="">All Payment</option>
//             <option value="Paid">Paid</option>
//             <option value="Overdue">Overdue</option>
//           </Form.Select>
//           <CSVLink
//             data={filtered}
//             filename="subscribers_report.csv"
//             className="btn btn-outline-primary"
//           >
//             Export CSV
//           </CSVLink>
//         </div>

//         <Table bordered hover>
//           <thead>
//             <tr>
//               <th>Organization</th>
//               <th>Admin</th>
//               <th>Plan</th>
//               <th>Status</th>
//               <th>Billing</th>
//               <th>Payment</th>
//               <th>Start</th>
//               <th>End</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map(sub => (
//               <tr key={sub.id} className={sub.paymentStatus === "Overdue" ? "table-danger" : ""}>
//                 <td>{sub.orgName}</td>
//                 <td>{sub.adminName} ({sub.adminContact})</td>
//                 <td>{sub.planName} ({sub.planTier})</td>
//                 <td>{sub.status}</td>
//                 <td>{sub.billingCycle}</td>
//                 <td>{sub.paymentStatus}</td>
//                 <td>{sub.startDate}</td>
//                 <td>{sub.endDate}</td>
//                 <td>
//                   <Button size="sm" onClick={() => handleView(sub)}>View</Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>

//         {/* Modal for Subscriber Detail */}
//         <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
//           <Modal.Header closeButton>
//             <Modal.Title>Subscriber Details</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {selectedSubscriber && (
//               <div>
//                 <h5>{selectedSubscriber.orgName}</h5>
//                 <p><strong>Admin:</strong> {selectedSubscriber.adminName} ({selectedSubscriber.adminContact})</p>
//                 <p><strong>Address:</strong> {selectedSubscriber.orgDetails.address}</p>
//                 <p><strong>Industry:</strong> {selectedSubscriber.orgDetails.industry}</p>
//                 <p><strong>Users:</strong> {selectedSubscriber.orgDetails.users}</p>
//                 <p><strong>Plan:</strong> {selectedSubscriber.planName} ({selectedSubscriber.planTier})</p>
//                 <p><strong>Billing:</strong> {selectedSubscriber.billingCycle}</p>
//                 <p><strong>Modules:</strong> {selectedSubscriber.modules.join(", ")}</p>
//                 <p><strong>History:</strong></p>
//                 <ul>
//                   {selectedSubscriber.history.map((h, i) => (
//                     <li key={i}>{h.date}: {h.action} ({h.payment})</li>
//                   ))}
//                 </ul>
//                 <Button variant="success" size="sm">Mark Payment as Paid</Button>

//                 <hr />
//                 <h6>Audit Log</h6>
//                 <ul>
//                   {auditLog.map((log, idx) => (
//                     <li key={idx}>{log.date}: {log.action} by {log.user}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </Modal.Body>
//         </Modal>
//       </div>
//     </Layout>
//   );
// };

// export default ViewSubscribers;
import React, { useEffect, useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import Layout from "../Layout/Layout";
import { CSVLink } from "react-csv";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const ViewSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ plan: "", status: "", payment: "" });
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [auditLog, setAuditLog] = useState([]);



  const fetchSubscribers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/superadmin/get-subscription-user-list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.success && Array.isArray(result.data)) {
        const mappedData = result.data.map((item, index) => ({
          id: index + 1,
          ids: item.id,
          orgName: item.organization_name,
          adminName: item.admin_name,
          adminContact: item.admin_contact,
          planName: item.plan_name,
          planTier: item.plan_tier,
          status: item.subscription_status,
          startDate: item.subscription_start_date,
          endDate: item.renewal_end_date,
          billingCycle: item.billing_cycle,
          paymentStatus: item.payment_status,
          left_days: item.left_days,
          orgDetails: {
            address: "N/A", // Can update if API provides
            industry: "N/A",
            users: 0
          },
          modules: [],
          history: [
            {
              date: item.createdAt,
              action: "Created",
              payment: item.payment_status,
            },
            {
              date: item.updatedAt,
              action: "Last Updated",
              payment: item.payment_status,
            },
          ],
        }));

        setSubscribers(mappedData);
        setFiltered(mappedData);

        // Example audit log
        const dummyLog = [
          { date: new Date().toISOString().split("T")[0], action: "Fetched subscriber list", user: "superadmin" },
        ];
        setAuditLog(dummyLog);
      } else {
        console.error("Failed to fetch data:", result.message);
      }
    } catch (error) {
      console.error("Error fetching subscribers:", error);
    }
  };
  useEffect(() => {
    fetchSubscribers();
  }, []);

  useEffect(() => {
    let result = [...subscribers];
    if (search) {
      result = result.filter(s =>
        s.orgName.toLowerCase().includes(search.toLowerCase()) ||
        s.adminContact.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filters.plan) result = result.filter(s => s.planName === filters.plan);
    if (filters.status) result = result.filter(s => s.status === filters.status);
    if (filters.payment) result = result.filter(s => s.paymentStatus === filters.payment);
    setFiltered(result);
  }, [search, filters, subscribers]);

  const handleView = async (subscriberId) => {
    setShowModal(true);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${BASE_URL}/api/superadmin/get-subscriber-activity-logs?subscription_id=${subscriberId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const { subscriberDetails, activityLog } = result.data;

      // Transforming the response to match modal structure
      const formattedData = {
        orgName: subscriberDetails.organization.organization_name,
        adminName: subscriberDetails.user.name,
        adminContact: subscriberDetails.organization.contact_phone_number,
        orgDetails: {
          address: subscriberDetails.organization.organization_address,
          industry: subscriberDetails.industry.name,
          users: subscriberDetails.organization.number_of_employees,
        },
        planName: subscriberDetails.plan.name,
        planTier: subscriberDetails.plan.tier,
        billingCycle: subscriberDetails.plan.billing_cycle,
        subscription_status: subscriberDetails.subscription.subscription_status,
        subscription_id: subscriberDetails.subscription.id,
        modules: JSON.parse(subscriberDetails.plan.features), // assuming it's a stringified array
        history: [
          {
            date: new Date(subscriberDetails.subscription.validity_start_date).toLocaleDateString(),
            action: "Subscribed",
            payment: subscriberDetails.subscription.payment_status,
          },
        ],
      };

      const formattedAuditLog = activityLog.map((log) => ({
        date: new Date(log.createdAt).toLocaleString(),
        action: log.action,
        newPlan: log.newPlan,
        reason: log.reason,
        user: log.performedByAdminName,
      }));

      setSelectedSubscriber(formattedData);
      setAuditLog(formattedAuditLog);
    } catch (error) {
      console.error("Error fetching activity logs:", error);
    }
  };


  const handleMarkAsPaid = async (subscription_id) => {
    console.log("Marking as paid for subscription ID:", subscription_id);
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/api/superadmin/update-payment-status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subscription_id: subscription_id, // <- we’ll make sure to pass this ID
          payment_status: "Paid",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Payment marked as Paid successfully!");
        fetchSubscribers()
        setShowModal(false);
        // Optionally, refresh the modal with updated data
        handleView(selectedSubscriber.subscriptionId);
      } else {
        alert("Failed to update payment status: " + result.message);
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      alert("Something went wrong while updating payment status.");
    }
  };


  return (
    <Layout>
      <div className="container mt-6">
        <h3>Subscribers Management</h3>

        <div className="d-flex mb-3 gap-2">
          <Form.Control
            type="text"
            placeholder="Search by Org/Admin"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Form.Select value={filters.plan} onChange={e => setFilters(f => ({ ...f, plan: e.target.value }))}>
            <option value="">All Plans</option>
            <option value="Basic Plan">Basic</option>
            <option value="Intermediate Plan">Intermediate</option>
            <option value="Premium Plan">Premium</option>
          </Form.Select>
          <Form.Select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
          </Form.Select>
          <Form.Select value={filters.payment} onChange={e => setFilters(f => ({ ...f, payment: e.target.value }))}>
            <option value="">All Payment</option>
            <option value="Paid">Paid</option>
            <option value="Due">Due</option>
            <option value="Overdue">Overdue</option>
          </Form.Select>
          <CSVLink
            data={filtered}
            filename="subscribers_report.csv"
            className="btn btn-outline-primary"
          >
            Export CSV
          </CSVLink>
        </div>

        <Table bordered hover >
          <thead>
            <tr>
              <th>Organization</th>
              <th>Admin</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Billing</th>
              <th>Payment</th>
              <th>Start</th>
              <th>End</th>
              <th>Left Days</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(sub => (
              <tr key={sub.id} className={sub.paymentStatus === "Overdue" ? "white" : ""}>
                <td>{sub.orgName}</td>
                <td>{sub.adminName} ({sub.adminContact})</td>
                <td>{sub.planName} ({sub.planTier})</td>
                <td>{sub.status }</td>
                <td>{sub.billingCycle}</td>
                <td>{sub.paymentStatus == "Due" ? <span style={{color:"red" ,fontWeight:"600"}}>{sub.paymentStatus}</span> : sub.paymentStatus == "Paid" ? <span style={{color:"green" ,fontWeight:"600"}}>{sub.paymentStatus}</span>:<span style={{color:"#42bde8" ,fontWeight:"600"}}>{sub.paymentStatus}</span>}</td>
                <td>{sub.startDate}</td>
                <td>{sub.endDate}</td>
                <td className={sub.left_days <= 5 ? "blink" : ""}>{sub.left_days}</td>

                <td>
                  <Button size="sm" onClick={() => handleView(sub.ids)}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Modal for Subscriber Detail */}
        <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Subscriber Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedSubscriber && (
              <div>
                <h5>{selectedSubscriber.orgName}</h5>
                <p>
                  <strong>Admin:</strong> {selectedSubscriber.adminName} (
                  {selectedSubscriber.adminContact})
                </p>
                <p>
                  <strong>Address:</strong> {selectedSubscriber.orgDetails.address}
                </p>
                <p>
                  <strong>Industry:</strong> {selectedSubscriber.orgDetails.industry}
                </p>
                <p>
                  <strong>Users:</strong> {selectedSubscriber.orgDetails.users}
                </p>
                <p>
                  <strong>Plan:</strong> {selectedSubscriber.planName} (
                  {selectedSubscriber.planTier})
                </p>
                <p>
                  <strong>Billing:</strong> {selectedSubscriber.billingCycle}
                </p>
                <p>
                  <strong>Subscription Status:</strong> {selectedSubscriber.subscription_status}
                </p>
                <p>
                  <strong>Modules:</strong> {selectedSubscriber.modules.join(", ")}
                </p>
                <p>
                  <strong>History:</strong>
                </p>
                <ul>
                  {selectedSubscriber.history.map((h, i) => (
                    <li key={i}>
                      {h.date}: {h.action} ({h.payment})
                    </li>
                  ))}
                </ul>

                <Button
                  variant="success"
                  size="sm"
                  onClick={() => {
                    const confirm = window.confirm("Are you sure you want to mark this payment as Paid?");
                    if (confirm) {
                      handleMarkAsPaid(selectedSubscriber?.subscription_id);
                    }
                  }}
                >
                  Mark Payment as Paid
                </Button>

                <hr />
                <h6>Audit Log</h6>
                <ul>
                  {auditLog.map((log, idx) => (<>
                    <li key={idx}>
                      {log.newPlan} : {log.action} by {log.user} on {log.date}
                    </li>
                    <li key={idx}>
                      {log.reason}
                    </li>
                  </>
                  ))}
                </ul>
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  );
};

export default ViewSubscribers;
