import React from "react";

const OrganizationDetail = ({ org, onClose }) => (

  console.log(org), // For debugging purposes
  <div className="card mt-4 p-4">
    <div className="d-flex justify-content-between">
      <h5>Organization Details</h5>
      <button className="btn btn-sm btn-secondary" onClick={onClose}>Back</button>
    </div>
    <p><strong>Industry:</strong> IT</p>
    <p><strong>Address:</strong> Placeholder Address</p>
    <p><strong>Logo:</strong> <img src={org?.logo_url} alt="Logo" width={50} /></p>
    <p>
      <strong>Agreement Paper:</strong>{" "}
      <a href={org?.agreement_url} target="_blank" rel="noopener noreferrer">
        Download
      </a>
    </p>

    <p><strong>Admin:</strong> {org?.admin?.name}, {org?.admin?.email}</p>
    <p><strong>Plan:</strong> {org?.plan_name}</p>
    <p><strong>Registered On:</strong> {org?.updatedAt}</p>
    <p><strong>Active Users:</strong> {org?.activeUsers}</p>
  </div>
);

export default OrganizationDetail;
