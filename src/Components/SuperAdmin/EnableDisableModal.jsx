import React from "react";
import { Modal, Button } from "react-bootstrap";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EnableDisableModal = ({ org, show, onClose, onStatusChanged }) => {
  if (!org) return null;

  const token = localStorage.getItem("token"); // Adjust if token is stored elsewhere

  const handleConfirm = async () => {
    const newStatus = org.status == true ? 0 : 1;

    try {
      const response = await fetch(`${BASE_URL}/api/superadmin/toggle-status-managment/${org.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      console.log("result", result);

      if (result?.status == "200") {
        console.log(`[Audit] ${org.status === "Active" ? "Disabled" : "Enabled"}: ${org.name}`);
        onClose();
        onStatusChanged(); // Call parent to refresh list 
        alert( result.message);
      } else {
        alert("Failed to update status: " + result.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      // alert("Something went wrong while updating status.");
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{org.status == true ? "Disable" : "Enable"} Organization</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to {org.status == true? "disable" : "enable"} <strong>{org.name}</strong>?
        <p>This will {org.status == true ? "suspend access for all users." : "re-enable access for all users."}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button variant={org.status == true ? "danger" : "success"} onClick={handleConfirm}>
          {org.status == true ? "Disable" : "Enable"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EnableDisableModal;
