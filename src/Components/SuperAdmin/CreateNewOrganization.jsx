// import React, { useEffect, useState } from "react";

// const CreateOrganization = ({ handleBack }) => {
//   const [formData, setFormData] = useState({
//     orgName: "",
//     industry: "",
//     organization_address: "",
//     city: "",
//     state: "",
//     postal_code: "",
//     registrationId: "",
//     contactPhone: "",
//     numEmployees: "",
//     logo: null,
//     agreement: null,
//     adminName: "",
//     adminEmail: "",
//     plan: "",
//     role: "",
//   });

//   const [plans, setPlans] = useState([]);
//   const [industries, setIndustries] = useState([]);
//   const [roles, setRoles] = useState([]);

//   // Fetch dropdown values (Plans, Industries, Roles)
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     const fetchDropdowns = async () => {
//       try {
//         const [plansRes, industriesRes, rolesRes] = await Promise.all([
//           fetch("http://localhost:5000/api/superadmin/plans", {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           fetch("http://localhost:5000/api/superadmin/industries", {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           fetch("http://localhost:5000/api/superadmin/all-roles", {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);

//         const plansData = await plansRes.json();
//         const industriesData = await industriesRes.json();
//         const rolesData = await rolesRes.json();

//         setPlans(plansData.data || []);
//         setIndustries(industriesData.data || []);
//         setRoles(rolesData.data || []);
//       } catch (err) {
//         console.error("Failed to fetch dropdowns:", err);
//       }
//     };

//     fetchDropdowns();
//   }, []);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     const form = new FormData();

//     form.append("organization_name", formData.orgName);
//     form.append("industryId", formData.industry);
//     form.append("organization_address", formData.organization_address);
//     form.append("city", formData.city);
//     form.append("state", formData.state);
//     form.append("postal_code", formData.postal_code);
//     form.append("registration_id", formData.registrationId);
//     form.append("contact_phone_number", formData.contactPhone);
//     form.append("number_of_employees", formData.numEmployees);
//     form.append("agreement_paper", formData.agreement);
//     form.append("logo", formData.logo);

//     form.append("name", formData.adminName);
//     form.append("email", formData.adminEmail);
//     form.append("user_name", "test_admin_user_name");  // Replace with actual user name if needed
//     form.append("plan_id", formData.plan);
//     form.append("role_id", formData.role);

//     try {
//       const response = await fetch("http://localhost:5000/api/superadmin/create-organization", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: "application/json",
//         },
//         body: form,
//       });

//       const data = await response.json();

//       if (response.ok) {
//         handleBack();
//         alert("Organization created successfully!");
//       } else {
//         alert(data.message || "Failed to create organization");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while creating the organization.");
//     }
//   };

//   return (
//     <div className="container mt-0">
//       <div className="d-flex justify-content-between align-items-center">
//         <h4>Create New Organization</h4>
//         <button className="btn btn-primary mb-4" onClick={handleBack}>
//           Back to List
//         </button>
//       </div>

//       <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
//         <h5 className="mb-4">Organization Details</h5>

//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Organization Name *</label>
//             <input
//               type="text"
//               name="orgName"
//               className="form-control"
//               required
//               value={formData.orgName}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="col-md-6 mb-3">
//             <label className="form-label">Industry</label>
//             <select
//               name="industry"
//               className="form-control"
//               value={formData.industry}
//               onChange={handleChange}
//             >
//               <option value="">Select Industry</option>
//               {industries.map((ind) => (
//                 <option key={ind.id} value={ind.id}>
//                   {ind.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Street Address</label>
//             <input
//               type="text"
//               name="organization_address"
//               className="form-control"
//               value={formData.organization_address}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-6 mb-3">
//             <label className="form-label">City</label>
//             <input
//               type="text"
//               name="city"
//               className="form-control"
//               value={formData.city}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-6 mb-3">
//             <label className="form-label">State</label>
//             <input
//               type="text"
//               name="state"
//               className="form-control"
//               value={formData.state}
//               onChange={handleChange}
//             />
//           </div>
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Postal Code</label>
//             <input
//               type="text"
//               name="postal_code"
//               className="form-control"
//               value={formData.postal_code}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Registration ID</label>
//             <input
//               type="text"
//               name="registrationId"
//               className="form-control"
//               value={formData.registrationId}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="col-md-6 mb-3">
//             <label className="form-label">Contact Phone Number</label>
//             <input
//               type="text"
//               name="contactPhone"
//               className="form-control"
//               value={formData.contactPhone}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Number of Employees</label>
//             <select
//               name="numEmployees"
//               className="form-control"
//               value={formData.numEmployees}
//               onChange={handleChange}
//             >
//               <option value="">Select</option>
//               <option value="1-10">1-10</option>
//               <option value="11-50">11-50</option>
//               <option value="51-200">51-200</option>
//               <option value="201+">201+</option>
//             </select>
//           </div>

//           <div className="col-md-6 mb-3">
//             <label className="form-label">Upload Logo (.jpeg or .png)</label>
//             <input
//               type="file"
//               name="logo"
//               accept="image/png, image/jpeg"
//               className="form-control"
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-md-12 mb-3">
//             <label className="form-label">Upload Agreement Paper (.pdf or .doc)</label>
//             <input
//               type="file"
//               name="agreement"
//               accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//               className="form-control"
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <h5 className="mt-4 mb-4">Organization Admin Details</h5>
//         <div className="row">
//           <div className="col-md-6 mb-3">
//             <label className="form-label">Org.Admin Full Name *</label>
//             <input
//               type="text"
//               name="adminName"
//               className="form-control"
//               required
//               value={formData.adminName}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="col-md-6 mb-3">
//             <label className="form-label">Org.Admin Email Address *</label>
//             <input
//               type="email"
//               name="adminEmail"
//               className="form-control"
//               required
//               value={formData.adminEmail}
//               onChange={handleChange}
//             />
//           </div>
//         </div>

//         <div className="row">
//           <div className=" col-md-6 mb-3">
//             <label className="form-label">Assign Plan</label>
//             <select
//               name="plan"
//               className="form-control"
//               value={formData.plan}
//               onChange={handleChange}
//             >
//               <option value="">Select Plan</option>
//               {plans.map((plan) => (
//                 <option key={plan.id} value={plan.id}>
//                   {plan.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className=" col-md-6 mb-3">
//             <label className="form-label">Assign Role</label>
//             <select
//               name="role"
//               className="form-control"
//               value={formData.role}
//               onChange={handleChange}
//             >
//               <option value="">Select Role</option>
//               {roles.map((role) => (
//                 <option key={role.id} value={role.id}>
//                   {role.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         <button type="submit" className="btn btn-primary w-100 mt-3">
//           Create Organization
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateOrganization;

import React, { useEffect, useState } from "react";

const OrganizationForm = ({ mode = "create", initialData = null, handleBack }) => {
  const [formData, setFormData] = useState({
    orgName: "",
    industry: "",
    organization_address: "",
    city: "",
    state: "",
    postal_code: "",
    registrationId: "",
    contactPhone: "",
    numEmployees: "",
    logo: null,
    agreement: null,
    adminName: "",
    adminEmail: "",
    plan: "",
  });

  const [plans, setPlans] = useState([]);
  const [errors, setErrors] = useState("");
  const [industries, setIndustries] = useState([]);

  // Load dropdowns
  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token create @@@@@2", token) 
    const fetchDropdowns = async () => {
      try {
        const [plansRes, industriesRes, rolesRes] = await Promise.all([
          fetch("http://localhost:5000/api/superadmin/plans", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:5000/api/superadmin/industries", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setPlans((await plansRes.json()).data || []);
        setIndustries((await industriesRes.json()).data || []);

      } catch (err) {
        console.error("Dropdown fetch failed:", err);
      }
    };
    fetchDropdowns();
  }, []);

  // Load initial data for edit
  useEffect(() => {

    console.log("initialData", initialData)
    if (mode === "edit" && initialData) {
      setFormData({
        orgName: initialData.organization_name || "",
        industry: initialData.industryId || "",
        organization_address: initialData.organization_address || "",
        city: initialData.city || "",
        state: initialData.state || "",
        postal_code: initialData.postal_code || "",
        registrationId: initialData.registration_id || "",
        contactPhone: initialData.contact_phone_number || "",
        numEmployees: initialData.number_of_employees || "",
        logo: null,
        agreement: null,
        adminName: initialData.users?.[0]?.name || "",
        adminEmail: initialData.users?.[0]?.email || "",
        plan: initialData.plan_id || "",
      });
    }
  }, [mode, initialData]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const form = new FormData();

    form.append("organization_name", formData.orgName);
    form.append("industryId", formData.industry);
    form.append("organization_address", formData.organization_address);
    form.append("city", formData.city);
    form.append("state", formData.state);
    form.append("postal_code", formData.postal_code);
    form.append("registration_id", formData.registrationId);
    form.append("contact_phone_number", formData.contactPhone);
    form.append("number_of_employees", formData.numEmployees);
    form.append("name", formData.adminName);
    form.append("email", formData.adminEmail);
    form.append("user_name", "test_admin_user_name"); // Replace with real username
    form.append("plan_id", formData.plan);


    if (formData.logo) form.append("logo", formData.logo);
    if (formData.agreement) form.append("agreement_paper", formData.agreement);

    const endpoint =
      mode === "create"
        ? "http://localhost:5000/api/superadmin/create-organization"
        : `http://localhost:5000/api/superadmin/update-organization/${initialData?.id}`;

    try {
      const response = await fetch(endpoint, {
        method: mode === "create" ? "POST" : "PUT", // If update is PUT/PATCH on your backend, change accordingly
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: form,
      });

      const result = await response.json();
      if (response.ok) {
        alert(`Organization ${mode === "edit" ? "updated" : "created"} successfully!`);
        handleBack();
      } else {
        console.error("Error:", result);
        // alert(result.errors[0].msg || "Something went wrong.");
        setErrors(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Form submit error:", error);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="container mt-0">
      <div className="d-flex justify-content-between align-items-center">
        <h4>{mode === "edit" ? "Update Organization" : "Create New Organization"}</h4>
        <button className="btn btn-secondary mb-4" onClick={handleBack}>
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm">
        <h5 className="mb-4">Organization Details</h5>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Organization Name *</label>
            <input
              type="text"
              name="orgName"
              className="form-control"
              required
              value={formData.orgName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Industry</label>
            <select
              name="industry"
              className="form-control"
              value={formData.industry}
              onChange={handleChange}
            >
              <option value="">Select Industry</option>
              {industries.map((ind) => (
                <option key={ind.id} value={ind.id}>
                  {ind.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Street Address</label>
            <input
              type="text"
              name="organization_address"
              className="form-control"
              value={formData.organization_address}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">State</label>
            <input
              type="text"
              name="state"
              className="form-control"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Postal Code</label>
            <input
              type="text"
              name="postal_code"
              className="form-control"
              value={formData.postal_code}
              onChange={handleChange}
              inputMode="numeric"
              pattern="\d{4}"
              maxLength="4"
              required
              title="Postal code must be exactly 4 digits"
            />

          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Registration ID</label>
            <input
              type="text"
              name="registrationId"
              className="form-control"
              value={formData.registrationId}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Contact Phone Number</label>
            <input
              type="text"
              name="contactPhone"
              className="form-control"
              value={formData.contactPhone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Number of Employees</label>
            <select
              name="numEmployees"
              className="form-control"
              value={formData.numEmployees}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Upload Logo (.jpeg or .png)</label>
            <input
              type="file"
              name="logo"
              accept="image/png, image/jpeg"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-12 mb-3">
            <label className="form-label">Upload Agreement Paper (.pdf or .doc)</label>
            <input
              type="file"
              name="agreement"
              accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>

        <h5 className="mt-4 mb-4">Organization Admin Details</h5>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Org.Admin Full Name *</label>
            <input
              type="text"
              name="adminName"
              className="form-control"
              required
              value={formData.adminName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Org.Admin Email Address *</label>
            <input
              type="email"
              name="adminEmail"
              className="form-control"
              required
              value={formData.adminEmail}
              onChange={handleChange}
            />
            {errors && <div className="text-danger" style={{ textAlign: "left", fontWeight: "500" }}>{errors}</div>}
          </div>
        </div>

        <div className="row">
          <div className=" col-md-6 mb-3">
            <label className="form-label">Assign Plan</label>
            <select
              name="plan"
              className="form-control"
              value={formData.plan}
              onChange={handleChange}
            >
              <option value="">Select Plan</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </div>

          {/* <div className=" col-md-6 mb-3">
            <label className="form-label">Assign Role</label>
            <select
              name="role"
              className="form-control"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="">Select Role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div> */}
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          {mode === "edit" ? "Update Organization" : "Create Organization"}
        </button>
      </form>
    </div>
  );
};

export default OrganizationForm;
