
import { Container, Row, Col, Form, Button, Nav } from "react-bootstrap";
import BusinessDetails from "./BusinessDetails";
import BankingDetails from "./BankingDetails";
import { useState } from "react";
import ContactInfo from "./ContactInfo";
import Resources from "./Resources";
import Header from "../header";
function CompanyInfoForm() {

  const [activeTab, setActiveTab] = useState("business");

  const renderTab = () => {
    switch (activeTab) {
      case "business":
        return <BusinessDetails />;
      case "banking":
        return <BankingDetails/>;
      case "contact":
        return <ContactInfo/>;
      case "resources":
        return <Resources/>;
      default:
        return <BusinessDetails />;
    }
  };
  return (
    <div className="d-flex">
    <Header/>
    <Container fluid className="p-4">
      <h4 className="fw-semibold mb-4">Company Information</h4>
      <div className="d-flex flex-wrap gap-2 mb-4">
        <Form.Select className="w-25" defaultValue="">
          <option>James Milson Village - S COX & A KUMRA</option>
        </Form.Select>
        <Button variant="dark">Archive my company</Button>
      </div>

      <div className="border rounded-3 py-3">
        <nav className="  border-bottom border-light-subtle mb-3 ps-3">
        <ul className="d-flex list-unstyled gap-3 fs-6">
          <li className="cursor-pointer" onClick={() => setActiveTab("business")}>Business Details</li>
          <li className="cursor-pointer" onClick={() => setActiveTab("banking")}>Banking Details</li>
          <li className="cursor-pointer" onClick={() => setActiveTab("contact")}>Contact Information</li>
          <li className="cursor-pointer" onClick={() => setActiveTab("resources")}>Resources</li>
        </ul>
        </nav>
         <div>
        {
          renderTab()
        }
       </div>
      </div>
      <footer className="text-center mt-5 text-muted small">
        Copyright © 2025 All rights reserved | Contractor Portal | Version 145
      </footer>
    </Container>
    </div>
  );
}

export default CompanyInfoForm;
