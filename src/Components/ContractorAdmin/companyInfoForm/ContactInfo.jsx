import React from "react";
import { Table, Button, Container } from "react-bootstrap";

function ContactInformation() {
  const contactList = [
    {
      contactType: "Primary",
      name: "avdesh kumar",
      reminders: "All Record Types"
    }
  ];

  return (
    <Container className="px-3 py-3">
      <Table responsive bordered className="mb-0">
        <thead>
          <tr style={{ borderBottom: "2px solid #f78d3a" }}>
            <th>Contact Type &#9650;</th>
            <th>Name</th>
            <th>Reminders</th>
          </tr>
        </thead>
        <tbody>
          {contactList.map((contact, index) => (
            <tr key={index}>
              <td className="text-muted">{contact.contactType}</td>
              <td className="text-muted">{contact.name}</td>
              <td className="text-muted">{contact.reminders}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center mt-2 flex-wrap">
        <Button variant="primary" className="border-0 px-4 mb-2">
          Add Contact
        </Button>
        <span className="fw-semibold text-center mb-2">
          displaying records 1 to {contactList.length} of {contactList.length}
        </span>
      </div>
    </Container>
  );
}

export default ContactInformation;
