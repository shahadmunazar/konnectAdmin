import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import CreateOrganization from "./CreateNewOrganization";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OrganizationList = () => {
  const [showForm, setShowForm] = useState(false);
  const [orgData, setOrgData] = useState([]);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const fetchOrganizations = () => {
    fetch(`${BASE_URL}/api/superadmin/get-organization`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
          setOrgData(response.data);
        } else {
          console.error("Failed to fetch organizations");
        }
      })
      .catch((err) => console.error("Error fetching organizations:", err));
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  useEffect(() => {
    if (!showForm) {
      fetchOrganizations();
    }
  }, [showForm]);

  const handleToggleForm = (org = null) => {
    setSelectedOrg(org);
    setShowForm(!showForm);
  };

  const handleOpenConfirmModal = (org) => {
    setSelectedOrg(org);
    setShowConfirmModal(true);
  };

  const handleResendInvitation = async () => {
    const adminEmail = selectedOrg?.users?.[0]?.email;
    if (!adminEmail) {
      toast.error("Admin email not found.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/superadmin/send-onboarding-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ email: adminEmail }),
      });

      const result = await response.json();

      if (result.status == 200 || result.success) {
        toast.success("Invitation resent successfully!");
        fetchOrganizations();
      } else {
        toast.error("Failed to resend invitation.");
      }
    } catch (error) {
      console.error("Resend error:", error);
      toast.error("Something went wrong while resending invitation.");
    }
    fetchOrganizations();
    setShowConfirmModal(false);
    setSelectedOrg(null);
  };

  return (
    <Layout>
      <div className="container mt-6">
        <ToastContainer position="top-right" autoClose={3000} />
        {showForm ? (
          <CreateOrganization
            handleBack={handleToggleForm}
            mode={selectedOrg ? "edit" : "create"}
            initialData={selectedOrg}
          />
        ) : (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4>Organizations</h4>
              <button className="btn btn-primary" onClick={() => handleToggleForm()}>
                + Create Organization
              </button>
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Organization Name</th>
                    <th>Admin Name</th>
                    <th>Admin Email</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Subdomain</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orgData.map((org, index) => {
                    const admin = org.users?.[0] || {};
                    return (
                      <tr key={index}>
                        <td>{org.organization_name}</td>
                        <td>{admin.name || "—"}</td>
                        <td>{admin.email || "—"}</td>
                        <td>{org.plan_name || "No Plan"}</td>
                        <td>
                          {admin.invitation_status === "sent" ? (
                            <span style={{ color: "#E0A800" }}>Pending Activation..</span>
                          ) : admin.invitation_status === "expired" ? (
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleOpenConfirmModal(org)}
                            >
                              Expired Invitation
                            </button>
                          ) : (
                            admin.invitation_status
                          )}
                        </td>
                        <td>
                          {org.organization_name ? (
                            <a
                              href={`https://${org.organization_name
                                .toLowerCase()
                                .replace(/\s+/g, "")}.mainplatformurl.com`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {`${org.organization_name.toLowerCase().replace(/\s+/g, "")}.mainplatformurl.com`}
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleToggleForm(org)}
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Confirm Modal */}
        <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Resend Invitation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to resend the invitation to{" "}
            <strong>{selectedOrg?.organization_name}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleResendInvitation}>
              Resend Invitation
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Layout>
  );
};

export default OrganizationList;
