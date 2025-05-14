import React, { useState, useEffect, useRef } from "react";
import OrganizationDetail from "./OrganizationDetail";
import OrganizationFilters from "./OrganizationFilters";
import EnableDisableModal from "./EnableDisableModal";
import Layout from "../Layout/Layout";
import { Button } from "react-bootstrap";

const ManageOrganization = () => {
  const [organizations, setOrganizations] = useState([]);
  const [filteredOrgs, setFilteredOrgs] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [targetOrg, setTargetOrg] = useState(null);

  const token = localStorage.getItem("token"); // Adjust if stored differently
  const detailRef = useRef(null); // Ref for scrolling

  const fetchOrganizations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/superadmin/managment-orginzation", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const json = await res.json();
      if (json.success) {
        const formatted = json.data.map((org) => ({
          id: org.id,
          organization_Id: org.id,
          name: org.organization_name,
          logo: org.logo_url || "https://via.placeholder.com/50",
          status: org.status ? "Active" : "Inactive",
          registeredOn: org.createdAt,
          activeUsers: org.users?.length || 0,
          admin: {
            name: org.users[0]?.name || "N/A",
            contact: org.users[0]?.email || "N/A",
          },
          plan: org.plan_name || "N/A",
          fullData: org,
        }));
  
        setOrganizations(formatted);
        setFilteredOrgs(formatted);
      }
    } catch (err) {
      console.error("Error fetching organizations:", err);
    }
  };
  
  // Now just call it inside useEffect
  useEffect(() => {
    fetchOrganizations();
  }, [token]);
  

  const handleFilter = (criteria) => {
    let result = [...organizations];
    if (criteria.status) result = result.filter(o => o.status === criteria.status);
    if (criteria.plan) result = result.filter(o => o.plan === criteria.plan);
    if (criteria.name) result = result.filter(o => o.name.toLowerCase().includes(criteria.name.toLowerCase()));
    setFilteredOrgs(result);
  };

  const handleToggleStatus = (org) => {
    setTargetOrg(org);
    setShowModal(true);
  };

  const handleViewClick = (org) => {
    setSelectedOrg(org.fullData);
    setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <Layout>
      <div className="container mt-4">
        <h4>Organizations</h4>
        <OrganizationFilters onFilter={handleFilter} />

        <table className="table table-bordered mt-3 table-hover">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Organization ID</th>
              <th>Org Name</th>
              <th>Status</th>
              <th>Registered</th>
              <th>Users</th>
              <th>Plan</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrgs.map((org) => (
              console.log("org1111 kya h ", org.status), // For debugging purposes
              <tr key={org.id}>
                <td><img src={org.fullData.logo_url} alt="Logo" width={40} /></td>
                <td>{org.organization_Id}</td>
                <td>{org.name}</td>
                <td>{org.status}</td>
                <td>{org.registeredOn}</td>
                <td>{org.activeUsers}</td>
                <td>{org.plan}</td>
                <td>
                  {org.admin.name}<br />
                  <small>{org.admin.contact}</small>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleViewClick(org)}
                  >
                    View
                  </button>
                  <Button variant={org.status == "Active" ? "success" : "danger"}  onClick={() => handleToggleStatus(org.fullData)}>
                  {org.status == "Active" ? " Enable" : "Disable"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Scroll target and details */}
        {selectedOrg && (
          <div ref={detailRef}>
            <OrganizationDetail org={selectedOrg} onClose={() => setSelectedOrg(null)} />
          </div>
        )}

        <EnableDisableModal org={targetOrg} show={showModal} onClose={() => setShowModal(false)} onStatusChanged={() => {
          setShowModal(false);
          fetchOrganizations();
        }} />
      </div>
    </Layout>
  );
};

export default ManageOrganization;
