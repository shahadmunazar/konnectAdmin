// import React, { useState } from "react";
// import { Table, Form, Modal, Button } from "react-bootstrap";
// import Layout from "../Layout/Layout";

// const dummyEnquiries = [
//   {
//     id: "ENQ-001",
//     submittedAt: "2025-04-14T10:15:00",
//     user: "Acme Corp",
//     contact: "admin@acme.com",
//     phone: "123-456-7890",
//     subject: "Issue with asset tracking",
//     message: "We're unable to track new assets.",
//     status: "New",
//     priority: "High",
//     role: "Admin",
//     assignedAdmin: "",
//     attachments: [],
//     activityLog: [],
//   },
//   {
//     id: "ENQ-002",
//     submittedAt: "2025-04-13T09:00:00",
//     user: "Beta Ltd",
//     contact: "support@beta.com",
//     phone: "555-678-1234",
//     subject: "Bug in reporting module",
//     message: "The analytics dashboard fails to load.",
//     status: "In Progress",
//     priority: "Medium",
//     role: "Technician",
//     assignedAdmin: "John Smith",
//     attachments: [],
//     activityLog: [
//       { action: "Assigned to John Smith", date: "2025-04-13 10:00", by: "SuperAdmin" },
//     ],
//   },
// ];

// const statusOptions = ["New", "In Progress", "Resolved", "Closed"];

// const EnquiryManagement = () => {
//   const [enquiries, setEnquiries] = useState(dummyEnquiries);
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [selectedEnquiry, setSelectedEnquiry] = useState(null);

//   const handleStatusChange = (newStatus) => {
//     if (!selectedEnquiry) return;
//     const updated = enquiries.map((e) =>
//       e.id === selectedEnquiry.id
//         ? {
//           ...e,
//           status: newStatus,
//           activityLog: [
//             ...e.activityLog,
//             {
//               action: `Status changed to ${newStatus}`,
//               date: new Date().toISOString().slice(0, 16).replace("T", " "),
//               by: "SuperAdmin",
//             },
//           ],
//         }
//         : e
//     );
//     setEnquiries(updated);
//     setSelectedEnquiry(null);
//   };

//   const handleAssign = (name) => {
//     if (!selectedEnquiry) return;
//     const updated = enquiries.map((e) =>
//       e.id === selectedEnquiry.id
//         ? {
//           ...e,
//           assignedAdmin: name,
//           activityLog: [
//             ...e.activityLog,
//             {
//               action: `Assigned to ${name}`,
//               date: new Date().toISOString().slice(0, 16).replace("T", " "),
//               by: "SuperAdmin",
//             },
//           ],
//         }
//         : e
//     );
//     setEnquiries(updated);
//     setSelectedEnquiry(null);
//   };

//   const filtered = enquiries.filter((e) => {
//     const matchSearch =
//       e.subject.toLowerCase().includes(search.toLowerCase()) ||
//       e.user.toLowerCase().includes(search.toLowerCase());
//     const matchStatus = statusFilter ? e.status === statusFilter : true;
//     return matchSearch && matchStatus;
//   });

//   const exportToCSV = () => {
//     const csv = filtered.map((e) =>
//       `${e.id},${e.user},${e.subject},${e.status},${e.assignedAdmin},${e.submittedAt}`
//     );
//     const blob = new Blob([["ID,User,Subject,Status,Assigned,Submitted\n", ...csv].join("\n")], {
//       type: "text/csv;charset=utf-8;",
//     });
//     const link = document.createElement("a");
//     link.href = URL.createObjectURL(blob);
//     link.setAttribute("download", "enquiries.csv");
//     document.body.appendChild(link);
//     link.click();
//   };

//   return (
//     <Layout>
//       <div className="container mt-6">
//         <h3>Enquiry Management</h3>

//         <div className="row my-3">
//           <div className="col-md-4">
//             <Form.Control
//               placeholder="Search by subject or user"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//             />
//           </div>
//           <div className="col-md-3">
//             <Form.Select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <option value="">All Statuses</option>
//               {statusOptions.map((s) => (
//                 <option key={s}>{s}</option>
//               ))}
//             </Form.Select>
//           </div>
//           <div className="col-md-3">
//             <Button variant="secondary" onClick={exportToCSV}>
//               Export CSV
//             </Button>
//           </div>
//         </div>

//         <Table bordered hover>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Submitted</th>
//               <th>User</th>
//               <th>Subject</th>
//               <th>Status</th>
//               <th>Assigned</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filtered.map((e) => (
//               <tr key={e.id}>
//                 <td>{e.id}</td>
//                 <td>{new Date(e.submittedAt).toLocaleString()}</td>
//                 <td>{e.user}</td>
//                 <td>{e.subject}</td>
//                 <td>{e.status}</td>
//                 <td>{e.assignedAdmin || "—"}</td>
//                 <td>
//                   <Button
//                     size="sm"
//                     variant="info"
//                     onClick={() => setSelectedEnquiry(e)}
//                   >
//                     View
//                   </Button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>

//         {/* Detail Modal */}
//         <Modal
//           show={!!selectedEnquiry}
//           onHide={() => setSelectedEnquiry(null)}
//           size="lg"
//         >
//           <Modal.Header closeButton>
//             <Modal.Title>Enquiry Details</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             {selectedEnquiry && (
//               <>
//                 <p><strong>ID:</strong> {selectedEnquiry.id}</p>
//                 <p><strong>Submitted:</strong> {new Date(selectedEnquiry.submittedAt).toLocaleString()}</p>
//                 <p><strong>User:</strong> {selectedEnquiry.user} ({selectedEnquiry.role})</p>
//                 <p><strong>Contact:</strong> {selectedEnquiry.contact} | {selectedEnquiry.phone}</p>
//                 <p><strong>Subject:</strong> {selectedEnquiry.subject}</p>
//                 <p><strong>Message:</strong> {selectedEnquiry.message}</p>
//                 <p><strong>Status:</strong> {selectedEnquiry.status}</p>
//                 <p><strong>Assigned Admin:</strong> {selectedEnquiry.assignedAdmin || "None"}</p>

//                 <Form.Group className="my-3">
//                   <Form.Label>Update Status</Form.Label>
//                   <Form.Select
//                     onChange={(e) => handleStatusChange(e.target.value)}
//                     defaultValue={selectedEnquiry.status}
//                   >
//                     {statusOptions.map((status) => (
//                       <option key={status} value={status}>
//                         {status}
//                       </option>
//                     ))}
//                   </Form.Select>
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                   <Form.Label>Assign to Admin</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="Enter admin name"
//                     onKeyDown={(e) => {
//                       if (e.key === "Enter") {
//                         e.preventDefault();
//                         handleAssign(e.target.value);
//                       }
//                     }}
//                   />
//                 </Form.Group>

//                 <h6>Activity Log</h6>
//                 <ul>
//                   {selectedEnquiry.activityLog.map((log, idx) => (
//                     <li key={idx}>
//                       <strong>{log.date}:</strong> {log.action} by {log.by}
//                     </li>
//                   ))}
//                 </ul>
//               </>
//             )}
//           </Modal.Body>
//         </Modal>
//       </div>
//     </Layout>
//   );
// };

// export default EnquiryManagement;

import React, { useState, useEffect } from "react";
import { Table, Form, Modal, Button } from "react-bootstrap";
import Layout from "../Layout/Layout";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const statusOptions = ["New", "In Progress", "Resolved", "Closed"];

const EnquiryManagement = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [immediate, setImmediate] = useState(null);

  // 🔄 Fetch enquiries from API
  
    const fetchEnquiries = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${BASE_URL}/api/superadmin/get-all-enquiry`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch enquiries");

        const result = await response.json();
        setEnquiries(result.data || []);
      } catch (error) {
        console.error("Error fetching enquiries:", error);
      }
    };
    useEffect(() => {
    fetchEnquiries();
  }, []);

  // const handleStatusChange = (newStatus) => {
  //   if (!selectedEnquiry) return;
  //   const updated = enquiries.map((e) =>
  //     e.id === selectedEnquiry.id
  //       ? {
  //           ...e,
  //           status: newStatus,
  //           activityLog: [
  //             ...(e.activityLog || []),
  //             {
  //               action: `Status changed to ${newStatus}`,
  //               date: new Date().toISOString().slice(0, 16).replace("T", " "),
  //               by: "SuperAdmin",
  //             },
  //           ],
  //         }
  //       : e
  //   );
  //   setEnquiries(updated);
  //   setSelectedEnquiry(null);
  // };
  
  const handleStatusChange = async (newStatus) => {
    if (!immediate) {
      console.warn("Enquiry not properly selected or missing ID.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(
        `${BASE_URL}/api/superadmin/update-inquiry-by-id/${immediate}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: newStatus,
            comments: "", // Optionally replace with real comments
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update enquiry status");
        
      }
  
      const updated = enquiries.map((e) =>
        e.id === selectedEnquiry.id
          ? {
              ...e,
              status: newStatus,
              activityLog: [
                ...(e.activityLog || []),
                {
                  action: `Status changed to ${newStatus}`,
                  date: new Date().toISOString().slice(0, 16).replace("T", " "),
                  by: "SuperAdmin",
                },
              ],
            }
          : e
      );
      fetchEnquiries(); // Refresh the list of enquiries

      setEnquiries(updated);
      setSelectedEnquiry(null);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update enquiry status. Please try again.");
    }
  };
  
  
  const getEnquiryDetails = async (id) => {
     setImmediate(id)
    console.log("Fetching details for enquiry ID:", id);
    try {
      const token = localStorage.getItem("token");
  
      const response = await fetch(
        `${BASE_URL}/api/superadmin/get-enquiry-by-id/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch enquiry details");
      }
  
      const result = await response.json();
  
      // Assuming the result has a `data` field
      setSelectedEnquiry(result.data);
    } catch (error) {
      console.error("Error fetching enquiry details:", error);
      alert("Unable to fetch enquiry details. Please try again.");
    }
  };
  
  const handleAssign = (name) => {
    if (!selectedEnquiry) return;
    const updated = enquiries.map((e) =>
      e.id === selectedEnquiry.id
        ? {
            ...e,
            assignedAdminName: name,
            activityLog: [
              ...(e.activityLog || []),
              {
                action: `Assigned to ${name}`,
                date: new Date().toISOString().slice(0, 16).replace("T", " "),
                by: "SuperAdmin",
              },
            ],
          }
        : e
    );
    setEnquiries(updated);
    setSelectedEnquiry(null);
  };

  const filtered = enquiries.filter((e) => {
    const matchSearch =
      e.subject?.toLowerCase().includes(search.toLowerCase()) ||
      e.businessName?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter ? e.status === statusFilter : true;
    return matchSearch && matchStatus;
  });

  const exportToCSV = () => {
    const csv = filtered.map((e) =>
      `${e.id},${e.businessName},${e.subject},${e.status},${e.assignedAdminName || ""},${e.createdAt}`
    );
    const blob = new Blob([["ID,User,Subject,Status,Assigned,Submitted\n", ...csv].join("\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "enquiries.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <Layout>
      <div className="container mt-6">
        <h3>Enquiry Management</h3>

        <div className="row my-3">
          <div className="col-md-4">
            <Form.Control
              placeholder="Search by subject or Organization"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <Form.Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statusOptions.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </Form.Select>
          </div>
          <div className="col-md-3">
            <Button variant="secondary" onClick={exportToCSV}>
              Export CSV
            </Button>
          </div>
        </div>

        <Table bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Submitted</th>
              <th>User & Organization</th>
              <th>Subject</th>
              <th>Status</th>
              <th>Assigned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id}>
                <td>Enq.{e.id}</td>
                <td>{e.createdAt}</td>
                <td>{e.firstName } ( {e.businessName} )</td>
                <td>{e.subject}</td>
                <td>{e.status}</td>
                <td>{e.assignedAdminName || "—"}</td>
                <td>
                  <Button size="sm" variant="info" onClick={() => getEnquiryDetails(e.id)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Detail Modal */}
        <Modal
          show={!!selectedEnquiry}
          onHide={() => setSelectedEnquiry(null)}
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Enquiry Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedEnquiry && (
              <>
                <p><strong>ID:</strong> {selectedEnquiry.enquiryId}</p>
                <p><strong>Submitted:</strong> {selectedEnquiry.createdAt}</p>
                <p><strong>User:</strong> {selectedEnquiry.businessName} ({selectedEnquiry.userRole || "N/A"})</p>
                <p><strong>Contact:</strong> {selectedEnquiry.email} | {selectedEnquiry.mobileNumber}</p>
                <p><strong>Subject:</strong> {selectedEnquiry.subject}</p>
                <p><strong>Message:</strong> {selectedEnquiry.description || "No message provided."}</p>
                <p><strong>Status:</strong> {selectedEnquiry.status}</p>
                <p><strong>Assigned Admin:</strong> {selectedEnquiry.assignedAdminName || "None"}</p>

                <Form.Group className="my-3">
                  <Form.Label>Update Status</Form.Label>
                  <Form.Select
                    onChange={(e) => handleStatusChange(e.target.value)}
                    defaultValue={selectedEnquiry.status}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Assign to Admin</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter admin name"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAssign(e.target.value);
                      }
                    }}
                  />
                </Form.Group>

                <h6>Activity Log</h6>
                <ul>
                  {(selectedEnquiry.activityLogs || []).map((log, idx) => (
                    <>
                    <li key={idx}>
                      <strong>{log.action}:</strong> {log.subAdminName} by {log.timestamp}
                    </li>
                    <li key={idx}>
                      <strong>{log.comments}</strong>
                    </li>
                    </>
                  ))}
                </ul>
              </>
            )}
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  );
};

export default EnquiryManagement;
