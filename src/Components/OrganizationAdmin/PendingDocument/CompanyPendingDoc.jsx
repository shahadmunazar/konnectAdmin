
import React, { useState,useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Table, Pagination } from 'react-bootstrap';
import Layout from '../../Layout/Layout';

const mockData = [
    {
        id: 1,
        name: 'Nick Ahmed',
        pin: '10894619',
        trade: 'IT',
        state: 'NSW',
        company: 'AHMED NOREEM',
        description: 'Covid Test',
        reference: '353255352620',
        issueDate: '15/04/2025',
        expiryDate: 'N/A',
        image: 'https://randomuser.me/api/portraits/men/75.jpg',
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
        id: 2,
        name: 'Alice Johnson',
        pin: '10890012',
        trade: 'Nurse',
        state: 'VIC',
        company: 'MEDI GROUP',
        description: 'Police Check',
        reference: 'ABC-2023-888',
        issueDate: '01/01/2024',
        expiryDate: '01/01/2027',
        image: 'https://randomuser.me/api/portraits/women/65.jpg',
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
        id: 3,
        name: 'John Smith',
        pin: '10934321',
        trade: 'Electrician',
        state: 'WA',
        company: 'SparkPro Services',
        description: 'Trade License',
        reference: 'ELEC-1098',
        issueDate: '12/03/2023',
        expiryDate: '12/03/2026',
        image: 'https://randomuser.me/api/portraits/men/40.jpg',
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
        id: 4,
        name: 'Priya Desai',
        pin: '10778890',
        trade: 'Support Worker',
        state: 'SA',
        company: 'CareCompanions',
        description: 'ID Check',
        reference: 'ID-7865',
        issueDate: '15/06/2024',
        expiryDate: 'N/A',
        image: 'https://randomuser.me/api/portraits/women/34.jpg',
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
    {
        id: 5,
        name: 'Marcus Lin',
        pin: '10566789',
        trade: 'Carpenter',
        state: 'QLD',
        company: 'BuildSmart',
        description: 'White Card',
        reference: 'CARD-9921',
        issueDate: '01/02/2022',
        expiryDate: '01/02/2027',
        image: 'https://randomuser.me/api/portraits/men/25.jpg',
        pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    },
];

function CompanyPendingDoc() {
    const [search, setSearch] = useState('');
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [mockData, setMockData] = useState([]);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;

    const filteredData = mockData.filter((d) =>
        (d.first_name + ' ' + d.last_name).toLowerCase().includes(search.toLowerCase()) ||
        d.document_type.toLowerCase().includes(search.toLowerCase()) ||
        d.reference_number.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleRowClick = (doc) => setSelectedDoc(doc);    
    const handleClose = () => setSelectedDoc(null);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };  

    const handleSearchClear = () => {
        setSearch('');
        setCurrentPage(1);
    };

    // Pagination items for numbered buttons
    const paginationItems = [];
    for (let page = 1; page <= totalPages; page++) {
        paginationItems.push(
            <Pagination.Item
                key={page}
                active={page === currentPage}
                onClick={() => handlePageChange(page)}
            >
                {page}
            </Pagination.Item>
        );
    }

  useEffect(() => {
  const fetchDocuments = async () => {
    const token = localStorage.getItem("token");
    console.log("Token hai kya:", token);
    
    try {
      const response = await fetch(
        `http://localhost:5000/api/orginazation/get-all-documents-contractor?induction_type=contractor_admin`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();
      if (result.success) {
        setMockData(result.data);
      } else {
        console.error("Failed to load documents:", result.message);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  fetchDocuments();
}, []);


    return (
        <Layout>
            <div className="p-4 mt-6">
                <h5>Pending Company Documents</h5>
                <div className="d-flex gap-2 my-3">
                    <Form.Select><option>Contractor</option></Form.Select>
                    <Form.Select><option>Trade Type</option></Form.Select>
                    <Form.Select><option>Document Type</option></Form.Select>
                    <Form.Select><option>Status</option></Form.Select>
                    <Form.Control
                        type="text"
                        placeholder="Enter name, description, reference..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1); // reset page on new search
                        }}
                        style={{ maxWidth: '300px' }}
                    />
                    <Button onClick={() => setCurrentPage(1)}>Search</Button>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setSearch('');
                            setCurrentPage(1);
                        }}
                    >
                        Clear
                    </Button>
                </div>

                  <Table hover bordered responsive>
                    <thead>
                        <tr>
                            <th>Contractor</th>
                            <th>Contact Person</th>
                            <th>Document</th>
                            <th>Description</th>
                            <th>Reference</th>
                            <th>Issue Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.length > 0 ? (
                            paginatedData.map((doc) => (
                                <tr key={doc.id} onClick={() => handleRowClick(doc)} style={{ cursor: 'pointer' }}>
                                    <td>{doc.organization_name}</td>
                                    <td>{doc.first_name} {doc.last_name}</td>
                                    <td>{doc.document_type.replace(/_/g, ' ')}</td>
                                    <td></td>
                                    <td>{doc.organization_name + " - "+   doc.document_name}</td>
                                    <td>{doc.issue_date}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No records found</td>
                            </tr>
                        )}
                    </tbody>
                </Table>

                {/* Pagination - Centered */}
                {totalPages > 1 && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Pagination>
                            <Pagination.Prev
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            />
                            {paginationItems}
                            <Pagination.Next
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            />
                        </Pagination>
                    </div>
                )}

                <Modal show={!!selectedDoc} onHide={handleClose} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>Review Credential</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div style={{ display: 'flex', height: '70vh' }}>
                            {/* Left - 40%: Image and Details */}
                            <div
                                style={{
                                    flex: '0 0 40%',
                                    paddingRight: '20px',
                                    overflowY: 'auto',
                                }}
                            >
                                <div className="text-center mb-3">
                                    <img
                                        src={selectedDoc?.user_image}
                                        alt="Worker"
                                        style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                                    />
                                </div>
                                <Form>
                                    <Form.Group as={Row} className="mb-2 align-items-center">
                                        <Form.Label column sm={4} className="text-end">
                                            Contractor
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control value={selectedDoc ? `${selectedDoc.first_name} ${selectedDoc.last_name}` : ''}disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-2 align-items-center">
                                        <Form.Label column sm={4} className="text-end">
                                            ABN
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control value={selectedDoc?.pin} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-2 align-items-center">
                                        <Form.Label column sm={4} className="text-end">
                                            Entity Description	
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control value={selectedDoc?.state} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-2 align-items-center">
                                        <Form.Label column sm={4} className="text-end">
                                            Contact Person
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control value={selectedDoc?.organization_name} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-2 align-items-center">
                                        <Form.Label column sm={4} className="text-end">
                                            Record Type
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control value={selectedDoc?.trade} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-2 align-items-center">
                                        <Form.Label column sm={4} className="text-end">
                                            Description
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control value={selectedDoc?.description} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-2 align-items-center">
                                        <Form.Label column sm={4} className="text-end">
                                            Reference
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control value={selectedDoc?.organization_name} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-2 align-items-center">
                                        <Form.Label column sm={4} className="text-end">
                                            Uploaded
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control value={selectedDoc?.issue_date} disabled />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-2 align-items-center">
                                        <Form.Label column sm={4} className="text-end">
                                            Expiry Date
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control value={selectedDoc?.expiry_date} disabled />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-2 align-items-center">
                                        <Form.Label column sm={4} className="text-end">
                                           Filename
                                        </Form.Label>
                                        <Col sm={8}>
                                            <Form.Control value={selectedDoc?.expiry_date} disabled />
                                        </Col>
                                    </Form.Group>
                                </Form>

                            </div>

                            {/* Right - 60%: PDF Preview */}
                            <div
                                style={{
                                    flex: '0 0 60%',
                                    height: '100%',
                                    borderLeft: '1px solid #ccc',
                                    paddingLeft: '0px',
                                }}
                            >
                                <iframe
                                    src={`https://docs.google.com/gview?url=${selectedDoc?.pdfUrl}&embedded=true`}
                                    title="Document Preview"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 'none' }}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="success">Approve</Button>
                        <Button variant="danger">Reject</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </Layout>
    );
}

export default CompanyPendingDoc;

// import React, { useState } from "react";
// import { Table, Form, Row, Col, Button, Container } from "react-bootstrap";

// const mockData = [
//   {
//     contractor: "Let The Music Play...",
//     contactPerson: "Johanna Harie",
//     record: "Public Liability Insurance",
//     description: "Description of the record",
//     reference: "Let the music play... public liability insurance",
//     expiryDate: "28/04/2025 > 28/04/2026",
//   },
// ];

// export default function CompanyPendingDoc() {
//   const [filters, setFilters] = useState({
//     contractorType: "",
//     recordType: "",
//     state: "",
//     searchText: "",
//   });

//   const [filteredData, setFilteredData] = useState(mockData);

//   const handleChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   const handleSearch = () => {
//     // Basic filter example
//     const filtered = mockData.filter((item) => {
//       return (
//         (filters.searchText === "" ||
//           item.contractor
//             .toLowerCase()
//             .includes(filters.searchText.toLowerCase())) &&
//         (filters.contractorType === "" ||
//           item.record === filters.contractorType) // Example filter by record type
//       );
//     });
//     setFilteredData(filtered);
//   };

//   const handleClear = () => {
//     setFilters({
//       contractorType: "",
//       recordType: "",
//       state: "",
//       searchText: "",
//     });
//     setFilteredData(mockData);
//   };

//   return (
//     <Container fluid className="p-3">
//       <h5>Pending Company Documents</h5>

//       {/* Filters */}
//       <Form className="mb-3">
//         <Row className="g-2 align-items-center">
//           <Col md={2}>
//             <Form.Select
//               name="contractorType"
//               value={filters.contractorType}
//               onChange={handleChange}
//               aria-label="Contractor Type"
//             >
//               <option value="">Contractor Type</option>
//               <option value="Public Liability Insurance">
//                 Public Liability Insurance
//               </option>
//               {/* add more options */}
//             </Form.Select>
//           </Col>

//           <Col md={2}>
//             <Form.Select
//               name="recordType"
//               value={filters.recordType}
//               onChange={handleChange}
//               aria-label="Record Type"
//             >
//               <option value="">Record Type</option>
//               <option value="Record 1">Record 1</option>
//               {/* add more options */}
//             </Form.Select>
//           </Col>

//           <Col md={2}>
//             <Form.Select
//               name="state"
//               value={filters.state}
//               onChange={handleChange}
//               aria-label="State"
//             >
//               <option value="">State</option>
//               <option value="NSW">NSW</option>
//               {/* add more states */}
//             </Form.Select>
//           </Col>

//           <Col md={4}>
//             <Form.Control
//               type="text"
//               name="searchText"
//               placeholder="Enter name, description, reference..."
//               value={filters.searchText}
//               onChange={handleChange}
//             />
//           </Col>

//           <Col md="auto">
//             <Button variant="dark" onClick={handleSearch}>
//               Search
//             </Button>{" "}
//             <Button variant="secondary" onClick={handleClear}>
//               Clear
//             </Button>
//           </Col>
//         </Row>
//       </Form>

//       {/* Table */}
//       <Table hover bordered responsive size="sm" className="text-center">
//         <thead>
//           <tr>
//             <th>Contractor</th>
//             <th>Contact Person</th>
//             <th>Record</th>
//             <th>Description</th>
//             <th>Reference</th>
//             <th>Expiry Date</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.length > 0 ? (
//             filteredData.map((row, idx) => (
//               <tr key={idx} style={{ cursor: "pointer" }}>
//                 <td>{row.contractor}</td>
//                 <td>{row.contactPerson}</td>
//                 <td>{row.record}</td>
//                 <td>{row.description}</td>
//                 <td>{row.reference}</td>
//                 <td>{row.expiryDate}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">No records found</td>
//             </tr>
//           )}
//         </tbody>
//       </Table>

//       {/* Pagination text */}
//       <div className="text-center small">
//         Displaying records 1 to {filteredData.length} of {filteredData.length}
//       </div>
//     </Container>
//   );
// }
