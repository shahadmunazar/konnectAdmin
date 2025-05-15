import React, { useState, useEffect } from "react";
const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const OrganizationFilters = ({ onFilter }) => {
  const [status, setStatus] = useState("");
  const [plan, setPlan] = useState("");
  const [name, setName] = useState("");
  const [plans, setPlans] = useState([]);

  const token = localStorage.getItem("token"); // Adjust if token is stored differently

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/superadmin/plans`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        
        if (json.success == true) {
          setPlans(json.data); // assuming json.data is an array of plan objects
        }
      } catch (err) {
        console.error("Failed to fetch plans", err);
      }
    };

    fetchPlans();
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ status, plan, name });
  };

  console.log("plans11111111" , plans); // For debugging purposes

  return (
    <form onSubmit={handleSubmit} className="d-flex gap-2 mt-5">
      <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All Status</option>
        <option value="Active">Active</option>
        <option value="Inactive">Inactive</option>
      </select>

      <select className="form-select" value={plan} onChange={(e) => setPlan(e.target.value)}>
        <option value="">All Plans</option>
        {plans.map((p) => (
          <option key={p.id} value={p.name}>{p.name}</option>
        ))}
      </select>

      <input
        type="text"
        className="form-control"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button className="btn btn-outline-primary" type="submit">Filter</button>
    </form>
  );
};

export default OrganizationFilters;
