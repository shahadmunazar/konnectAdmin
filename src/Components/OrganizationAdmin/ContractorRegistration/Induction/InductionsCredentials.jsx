// // import React, { useState, useEffect } from 'react';
// // import { Button } from 'react-bootstrap';
// // import { useNavigate } from 'react-router-dom';
// // import logo from '../../../../assets/logo.png';
// // import StepUpload from './StepUpload'; // import the step component

// // const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // const InductionsCredentials = () => {
// //   const navigate = useNavigate();
// //   const [credentials, setCredentials] = useState([]);
// //   const [currentStep, setCurrentStep] = useState(0);
// //   const [uploadedData, setUploadedData] = useState([]);
// //   const [showReview, setShowReview] = useState(false);

// // //   useEffect(() => {
// // //     // Fetch mandatory credentials
// // //     fetch(`${BASE_URL}/api/mandatory-credentials`)
// // //       .then((res) => res.json())
// // //       .then((data) => setCredentials(data))
// // //       .catch((err) => console.error(err));
// // //   }, []);
// // useEffect(() => {
// //   // Dummy mandatory credentials
// //   const dummyData = [
// //     { id: 1, name: 'Police Check' },
// //     { id: 2, name: 'Vaccine Certificate' },
// //   ];
// //   setCredentials(dummyData);
// // }, []);


// //   const handleProceed = () => {
// //     setCurrentStep(0);
// //   };

// //   const handleNextStep = (data) => {
// //     setUploadedData([...uploadedData, data]);
// //     const nextStep = currentStep + 1;

// //     if (nextStep < credentials.length) {
// //       setCurrentStep(nextStep);
// //     } else {
// //       setShowReview(true);
// //     }
// //   };

// //   const handleCancel = () => {
// //     navigate('/');
// //   };

// //   const handleFinalSubmit = () => {
// //     console.log('Submitting all uploaded data:', uploadedData);
// //     // submit to API here
// //   };

// //   return (
// //     <div style={{
// //       backgroundColor: '#f0f4f8',
// //       display: 'flex',
// //       justifyContent: 'center',
// //       alignItems: 'center',
// //       padding: '20px',
// //       minHeight: '100vh'
// //     }}>
// //       <div style={{
// //         backgroundColor: '#fff',
// //         width: '100%',
// //         maxWidth: '800px',
// //         borderRadius: '12px',
// //         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
// //         overflow: 'hidden',
// //         fontFamily: 'Segoe UI, sans-serif'
// //       }}>
// //         <div style={{
// //           display: 'flex',
// //           alignItems: 'center',
// //           padding: '25px 30px',
// //           borderBottom: '1px solid #eee',
// //           backgroundColor: '#ffffff'
// //         }}>
// //           <img src={logo} alt="Logo" style={{ height: '80px' }} />
// //         </div>

// //         <div style={{
// //           backgroundColor: '#3a3a3a',
// //           color: '#fff',
// //           padding: '14px 30px',
// //           fontSize: '18px',
// //           fontWeight: '600'
// //         }}>
// //           Contractor Registration
// //         </div>

// //         <div className="p-4">
// //           {!credentials.length && <p>Loading mandatory credentials...</p>}

// //           {credentials.length > 0 && currentStep === 0 && uploadedData.length === 0 && !showReview && (
// //             <>
// //               <p className="text-center mt-3">
// //                 Before we can proceed you are required to supply the following <span className="text-danger">mandatory</span> credentials.
// //               </p>
// //               <ul>
// //                 {credentials.map((c) => (
// //                   <li key={c.id}>{c.name}</li>
// //                 ))}
// //               </ul>
// //               <div className="text-center">
// //                 <Button variant="success" onClick={handleProceed}>Proceed</Button>
// //               </div>
// //             </>
// //           )}

// //           {credentials.length > 0 && currentStep < credentials.length && !showReview && (
// //             <StepUpload
// //               credential={credentials[currentStep]}
// //               onComplete={handleNextStep}
// //               onCancel={handleCancel}
// //             />
// //           )}

// //           {showReview && (
// //             <div className="text-center">
// //               <h5>All Documents Uploaded</h5>
// //               <ul>
// //                 {uploadedData.map((item, idx) => (
// //                   <li key={idx}>{item.name}: {item.file.name}</li>
// //                 ))}
// //               </ul>
// //               <Button variant="primary" onClick={handleFinalSubmit}>Submit All</Button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default InductionsCredentials;

// import React, { useState, useEffect } from 'react';
// import { Form, Button, Card, Row, Col } from 'react-bootstrap';
// import { FaCloudUploadAlt, FaQuestionCircle } from 'react-icons/fa';
// import { FaFileUpload } from 'react-icons/fa';
// import { FaCircleCheck } from "react-icons/fa6";
// import { FaCheckCircle } from 'react-icons/fa';
// import { FaFilePdf } from 'react-icons/fa';

// import logo from '../../../../assets/logo.png';
// const BASE_URL = import.meta.env.VITE_API_BASE_URL;


// const credentialsList = [
//     'Confined Spaces',
//     'Elevated Work Platform (EWP) Licence',
//     'Relevant Trade Qualification',
//     'Annual Influenza Vaccination',
//     'Covid Vax',
//     'High Risk Work Licence',
//     'White Card',
//     'Working At Heights'
// ];

// const InductionsCredentials = () => {
//     const [step, setStep] = useState(0);
//     const [credentials, setCredentials] = useState([]);
//     const [uploadedFiles, setUploadedFiles] = useState({});
//     const [formValues, setFormValues] = useState({});
//     const [reference, setReference] = useState('');
//     const [issueDate, setIssueDate] = useState(null);
//     const [file, setFile] = useState(null);
//     const [selected, setSelected] = useState([]);

//     const toggleSelection = (item) => {
//         setSelected(prev =>
//             prev.includes(item)
//                 ? prev.filter(i => i !== item)
//                 : [...prev, item]
//         );
//     };


//     const GetAllTrade = async () => {
//         const trade_type_id = localStorage.getItem('VerificationId');
//         try {
//             const response = await fetch(`${BASE_URL}/api/orginazation/get-all-trade-type-select-documents?trade_type_id=${trade_type_id}`);
//             if (!response.ok) {

//                 throw new Error('Failed to fetch credentials');
//             }
//             const data = await response.json();
//             setCredentials(data?.data?.mandatory);
//         } catch (error) {
//             console.error('Error fetching credentials:', error);
//             // Handle error (e.g., show a notification)
//         }
//     };


//     useEffect(() => {
//         // const dummyData = [
//         //     { id: 1, name: 'Police Check' },
//         //     { id: 2, name: 'Vaccine Certificate' },
//         //     { id: 3, name: 'Vaccine4543 Certificate' },
//         // ];
//         // setCredentials(dummyData);
//         GetAllTrade();
//     }, []);

//     const handleFileChange = (e) => {
//         const selected = e.target.files[0];
//         setFile(selected);
//     };



//     const handleInputChange = (e, credentialName, field) => {
//         setFormValues((prev) => ({
//             ...prev,
//             [credentialName]: {
//                 ...prev[credentialName],
//                 [field]: e.target.value,
//             },
//         }));
//     };

//     const renderWelcomeScreen = () => (
//         <div style={{ padding: 40, textAlign: 'center' }}>
//             <h4 style={{ marginBottom: 20, color: "#666" }}>
//                 <FaFileUpload size={28} style={{ marginRight: 8 }} />
//                 Trade Credentials
//             </h4>
//             <p style={{ color: "#666" }}>
//                 Before we can proceed you are required to supply the following{' '}
//                 <span style={{ color: 'red' }}>mandatory</span> credentials.
//             </p>
//             <Row className="justify-content-center" style={{ marginTop: 20 }}>
//                 {credentials.map((cred) => (
//                     <Col key={cred.id} md={4} className="mb-3 d-flex justify-content-center">
//                         <div className="credential-card">
//                             <FaCircleCheck color='green' /> {cred.document_type}
//                         </div>
//                     </Col>
//                 ))}
//             </Row>
//             <p style={{ marginTop: 20, color: "#666" }}>
//                 Please press proceed to continue to the credential entry screen
//             </p>
//             <Button onClick={() => setStep(1)} variant="success" className='mt-3'>
//                 Proceed
//             </Button>
//         </div>
//     );

//     const renderUploadStep = (credential, index) => {
//         const currentValues = formValues[credential.name] || {};
//         return (
//             <div style={{ padding: 30 }}>
//                 <h4 style={{ marginBottom: 20, color: "#666" }}>{credential.name}</h4>
//                 <Row className="mb-3">
//                     <Col md={6}>
//                         <Form.Group>
//                             <Form.Label className="mainColor">Enter Reference</Form.Label>
//                             <Form.Control
//                                 placeholder="eg. XXX-12356"
//                                 value={currentValues.reference || ''}
//                                 onChange={(e) =>
//                                     handleInputChange(e, credential.name, 'reference')
//                                 }
//                             />
//                         </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                         <Form.Group>
//                             <Form.Label className="mainColor">Enter Issue Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 value={currentValues.issueDate || ''}
//                                 onChange={(e) =>
//                                     handleInputChange(e, credential.name, 'issueDate')
//                                 }
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>

//                 <Form.Group className="mb-3">

//                     <Form.Group className="mb-3 text-center">
//                         <Form.Label className='mainColor'>Upload Document</Form.Label>
//                         <div
//                             className="border p-4 rounded"
//                             style={{
//                                 borderStyle: 'dashed',
//                                 backgroundColor: '#f8f9fa',
//                                 cursor: 'pointer',
//                             }}
//                             onClick={() => document.getElementById('fileInput').click()}
//                         >
//                             <FaCloudUploadAlt size={40} className="mb-2" />
//                             <div className='mainColor'>Drag and drop or click to select</div>
//                             <Form.Control
//                                 type="file"
//                                 accept=".pdf,image/*"
//                                 id="fileInput"
//                                 onChange={handleFileChange}
//                                 style={{ display: 'none' }}
//                             />
//                         </div>
//                         {file && <div className="mt-2 text-success">Selected: {file.name}</div>}
//                     </Form.Group>
//                     <Form.Text className="text-muted">
//                         We accept PDF and standard image files.
//                     </Form.Text>
//                     {uploadedFiles[credential.name] && (
//                         <div style={{ marginTop: 8, fontSize: 14 }}>
//                             <strong>Selected:</strong> {uploadedFiles[credential.name].name}
//                         </div>
//                     )}
//                 </Form.Group>

//                 <div style={{ marginTop: 30 }}>
//                     {step > 1 && (
//                         <Button
//                             variant="secondary"
//                             onClick={() => setStep(step - 1)}
//                             style={{ marginRight: 10 }}
//                         >
//                             Back
//                         </Button>
//                     )}
//                     {index < credentials.length ? (
//                         <Button onClick={() => setStep(step + 1)} variant="primary">
//                             Next
//                         </Button>
//                     ) : (
//                         <Button onClick={() => setStep(step + 1)} variant="success">
//                             Review & Submit
//                         </Button>
//                     )}
//                     <Button
//                         variant="outline-danger"
//                         style={{ marginLeft: 10 }}
//                         onClick={() => window.location.reload()}
//                     >
//                         Cancel & Exit
//                     </Button>
//                 </div>
//             </div>
//         );
//     };

//     const renderReviewScreen = () => (
//         <div style={{ padding: 40, textAlign: 'center' }}>
//             <h4 style={{ marginBottom: 30, fontWeight: '600', color: '#4b4b4b' }}>
//                 Credential Summary
//             </h4>

//             {credentials.map((cred) => {
//                 const values = formValues[cred.document_type] || {};
//                 const file = uploadedFiles[cred.document_type];

//                 return (
//                     <Card key={cred.id} className="mb-3 text-start" style={{ borderRadius: 12 }}>
//                         <Card.Body>
//                             <h6 style={{ fontWeight: 'bold', marginBottom: 10 }}>{cred.document_type}</h6>

//                             <Row className="mb-2">
//                                 <Col xs={4}>
//                                     <div style={{ fontWeight: 500 }}>Reference</div>
//                                     <div>{values.reference || '-'}</div>
//                                 </Col>
//                                 <Col xs={4}>
//                                     <div style={{ fontWeight: 500 }}>
//                                         {cred.document_type.toLowerCase().includes('vax') ? 'Date Of Vaccination' : 'Expiry Date'}
//                                     </div>
//                                     <div>{values.issueDate ? new Date(values.issueDate).toLocaleDateString('en-GB') : '-'}</div>
//                                 </Col>
//                                 <Col xs={4} className="text-center">
//                                     <FaFilePdf size={32} />
//                                 </Col>
//                             </Row>

//                             <Row>
//                                 <Col xs={12}>
//                                     <div style={{ fontWeight: 500 }}>File</div>
//                                     <div style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}>
//                                         {file?.name || '-'}
//                                     </div>
//                                 </Col>
//                             </Row>
//                         </Card.Body>
//                     </Card>
//                 );
//             })}

//             <div className="mt-4">
//                 <Button variant="secondary" onClick={() => setStep(step - 1)} style={{ marginRight: 10 }}>
//                     Back
//                 </Button>
//                 <Button variant="success">Upload & Continue</Button>
//             </div>
//         </div>
//     );

//     return (
//         <>
//             <div
//                 style={{
//                     backgroundColor: '#f0f4f8',
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     padding: '20px',
//                 }}
//             >
//                 <div
//                     style={{
//                         backgroundColor: '#fff',
//                         width: '100%',
//                         maxWidth: '800px',
//                         borderRadius: '12px',
//                         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
//                         overflow: 'hidden',
//                         fontFamily: 'Segoe UI, sans-serif',
//                     }}
//                 >
//                     {/* Header */}
//                     <div
//                         style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             padding: '25px 30px',
//                             borderBottom: '1px solid #eee',
//                             backgroundColor: '#ffffff',
//                         }}
//                     >
//                         <img src={logo} alt="Logo" style={{ height: '80px' }} />
//                     </div>

//                     {/* Banner */}
//                     <div
//                         style={{
//                             backgroundColor: '#3a3a3a',
//                             color: '#fff',
//                             padding: '4px 30px',
//                             fontSize: '15px',
//                             fontWeight: '600',
//                             textAlign: 'left',
//                         }}
//                     >
//                         Contractor Registration
//                     </div>

//                     {/* Main content */}
//                     {step === 0 && renderWelcomeScreen()}
//                     {step > 0 && step <= credentials.length &&
//                         renderUploadStep(credentials[step - 1], step)}
//                     {step === credentials.length + 1 && renderReviewScreen()}

//                     <div className="instruction">
//                         The following credentials are <span className="optional">optional</span>, if you would like to supply them, please click on the name of every credential that you are willing to supply and then click the 'Add Credentials' button.
//                     </div>

//                     <div className="credentials-grid">
//                         {credentialsList.map((item, idx) => (
//                             <div
//                                 key={idx}
//                                 className={`credential-item ${selected.includes(item) ? 'selected' : ''}`}
//                                 onClick={() => toggleSelection(item)}
//                             >
//                                 <FaCheckCircle className="icon" />
//                                 <span>{item}</span>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="buttons">
//                         <button className="add-btn">Add {selected.length} Credentials</button>
//                         <button className="skip-btn">Skip</button>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default InductionsCredentials;

// import React, { useState } from 'react';
// import { FaCheckCircle } from 'react-icons/fa';
// import logo from '../../../../assets/logo.png';

// const credentialsList = [
//   'Confined Spaces',
//   'Elevated Work Platform (EWP) Licence',
//   'Relevant Trade Qualification',
//   'Annual Influenza Vaccination',
//   'Covid Vax',
//   'High Risk Work Licence',
//   'White Card',
//   'Working At Heights'
// ];

// const InductionsCredentials = () => {
//   const [selected, setSelected] = useState([]);

//   const toggleSelection = (item) => {
//     setSelected(prev =>
//       prev.includes(item)
//         ? prev.filter(i => i !== item)
//         : [...prev, item]
//     );
//   };

//   return (
// <div className="container-wrapper">
//   <div className="card">
//     <div className="header">
//       <img src={logo} alt="Logo" className="logo" />
//     </div>
//     <div className="sub-header">Contractor Induction</div>
//     <div className="instruction">
//       The following credentials are <span className="optional">optional</span>, if you would like to supply them, please click on the name of every credential that you are willing to supply and then click the 'Add Credentials' button.
//     </div>

//     <div className="credentials-grid">
//       {credentialsList.map((item, idx) => (
//         <div
//           key={idx}
//           className={`credential-item ${selected.includes(item) ? 'selected' : ''}`}
//           onClick={() => toggleSelection(item)}
//         >
//           <FaCheckCircle className="icon" />
//           <span>{item}</span>
//         </div>
//       ))}
//     </div>

//     <div className="buttons">
//       <button className="add-btn">Add {selected.length} Credentials</button>
//       <button className="skip-btn">Skip</button>
//     </div>
//   </div>
// </div>
//   );
// };

// export default InductionsCredentials;

// import React, { useState } from 'react';
// import { FaCheckCircle } from 'react-icons/fa';
// import logo from '../../../../assets/logo.png';

// const credentialsList = [
//   'Confined Spaces',
//   'Elevated Work Platform (EWP) Licence',
//   'Relevant Trade Qualification',
//   'Annual Influenza Vaccination',
//   'Covid Vax',
//   'High Risk Work Licence',
//   'White Card',
//   'Working At Heights'
// ];

// const InductionsCredentials = () => {
//   const [selected, setSelected] = useState([]);
//   const [step, setStep] = useState(-1); // -1 means selection screen
//   const [uploadedFiles, setUploadedFiles] = useState({});

//   const toggleSelection = (item) => {
//     setSelected(prev =>
//       prev.includes(item)
//         ? prev.filter(i => i !== item)
//         : [...prev, item]
//     );
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     const currentCredential = selected[step];
//     if (file) {
//       setUploadedFiles(prev => ({
//         ...prev,
//         [currentCredential]: file
//       }));
//     }
//   };

//   const handleNext = () => {
//     if (step < selected.length - 1) {
//       setStep(prev => prev + 1);
//     } else {
//       alert('All files uploaded!');
//       console.log('Uploaded Files:', uploadedFiles);
//       // Submit logic goes here
//     }
//   };

//   const handleBack = () => {
//     setStep(prev => prev - 1);
//   };

//   // Step-by-step upload screen
//   if (step >= 0) {
//     const currentCredential = selected[step];
//     return (
//       <div className="container-wrapper">
//         <div className="card text-center">
//           <h4 className="mb-3">Upload Credential {step + 1} of {selected.length}</h4>
//           <p><strong>{currentCredential}</strong></p>

//           <input type="file" onChange={handleFileChange} className="form-control mb-3" />

//           {uploadedFiles[currentCredential] && (
//             <div className="text-success mb-2">
//               File selected: {uploadedFiles[currentCredential].name}
//             </div>
//           )}

//           <div className="buttons d-flex justify-content-between mt-4">
//             <button className="btn btn-secondary" disabled={step === 0} onClick={handleBack}>Back</button>
//             <button className="btn btn-primary" onClick={handleNext}>
//               {step === selected.length - 1 ? 'Submit' : 'Next'}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Selection screen
//   return (
//     <div className="container-wrapper">
//       <div className="card">
//         <div className="header">
//           <img src={logo} alt="Logo" className="logo" />
//         </div>
//         <div className="sub-header">Contractor Induction</div>
//         <div className="instruction">
//           The following credentials are <span className="optional">optional</span>, if you would like to supply them, please click on the name of every credential that you are willing to supply and then click the 'Add Credentials' button.
//         </div>

//         <div className="credentials-grid">
//           {credentialsList.map((item, idx) => (
//             <div
//               key={idx}
//               className={`credential-item ${selected.includes(item) ? 'selected' : ''}`}
//               onClick={() => toggleSelection(item)}
//             >
//               <FaCheckCircle className="icon" />
//               <span>{item}</span>
//             </div>
//           ))}
//         </div>

//         <div className="buttons">
//           <button
//             className="add-btn"
//             onClick={() => setStep(0)}
//             disabled={selected.length === 0}
//           >
//             Add {selected.length} Credential{selected.length > 1 ? 's' : ''}
//           </button>
//           <button className="skip-btn">Skip</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InductionsCredentials;

// import React, { useState, useEffect } from 'react';
// import { Form, Button, Card, Row, Col } from 'react-bootstrap';
// import { FaCloudUploadAlt, FaQuestionCircle, FaFileUpload, FaFilePdf, FaCheckCircle } from 'react-icons/fa';
// import logo from '../../../../assets/logo.png';


// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const credentialsList = [
//     'Confined Spaces',
//     'Elevated Work Platform (EWP) Licence',
//     'Relevant Trade Qualification',
//     'Annual Influenza Vaccination',
//     'Covid Vax',
//     'High Risk Work Licence',
//     'White Card',
//     'Working At Heights'
// ];

// const InductionsCredentials = () => {
//     const [step, setStep] = useState(0);
//     const [credentials, setCredentials] = useState([]);
//     const [uploadedFiles, setUploadedFiles] = useState({});
//     const [formValues, setFormValues] = useState({});
//     const [file, setFile] = useState(null);
//     const [selected, setSelected] = useState([]);
//     const [optionalStep, setOptionalStep] = useState(0);
//     const [optionalFormValues, setOptionalFormValues] = useState({});
//     const [optionalUploadedFiles, setOptionalUploadedFiles] = useState({});
//     const [fileType, setFileType] = useState(null);

//     useEffect(() => {
//         const handleBeforeUnload = (e) => {
//             e.preventDefault();
//             e.returnValue = 'You cannot refresh the page during credential submission.';
//             return 'You cannot refresh the page during credential submission.';
//         };

//         window.addEventListener('beforeunload', handleBeforeUnload);

//         return () => {
//             window.removeEventListener('beforeunload', handleBeforeUnload);
//         };
//     }, []);

//     useEffect(() => {
//         const savedStep = parseInt(localStorage.getItem('step'));
//         if (!isNaN(savedStep)) {
//             setStep(savedStep);
//         }

//         GetAllTrade();
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('step', step);
//     }, [step]);

//     const toggleSelection = (item) => {
//         setSelected(prev =>
//             prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
//         );
//     };

//     const GetAllTrade = async () => {
//         const trade_type_id = localStorage.getItem('VerificationId');
//         try {
//             const response = await fetch(`${BASE_URL}/api/orginazation/get-all-trade-type-select-documents?trade_type_id=${trade_type_id}`);
//             if (!response.ok) throw new Error('Failed to fetch credentials');
//             const data = await response.json();
//             setCredentials(data?.data?.mandatory);
//         } catch (error) {
//             console.error('Error fetching credentials:', error);
//         }
//     };

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         setFile(selectedFile);
//     };

//     const handleInputChange = (e, name, field, isOptional = false) => {
//         const updater = isOptional ? setOptionalFormValues : setFormValues;
//         const values = isOptional ? optionalFormValues : formValues;

//         console.log('Updating field:', field, e.target.value);

//         updater({
//             ...values,
//             [name]: {
//                 ...values[name],
//                 [field]: e.target.value,
//             },
//         });
//     };

//     const renderWelcomeScreen = () => (
//         <div style={{ padding: 40, textAlign: 'center' }}>
//             <h4 style={{ marginBottom: 20, color: "#666" }}>
//                 <FaFileUpload size={28} style={{ marginRight: 8 }} />
//                 Trade Credentials
//             </h4>
//             <p style={{ color: "#666" }}>
//                 Before we can proceed you are required to supply the following{' '}
//                 <span style={{ color: 'red' }}>mandatory</span> credentials.
//             </p>
//             <Row className="justify-content-center" style={{ marginTop: 20 }}>
//                 {credentials.map((cred) => (
//                     <Col key={cred.id} md={4} className="mb-3 d-flex justify-content-center">
//                         <div className="credential-card">
//                             <FaCheckCircle color='green' /> {cred.document_type}
//                         </div>
//                     </Col>
//                 ))}
//             </Row>
//             <p style={{ marginTop: 20, color: "#666" }}>
//                 Please press proceed to continue to the credential entry screen
//             </p>
//             <Button onClick={() => setStep(1)} variant="success" className='mt-3'>
//                 Proceed
//             </Button>
//         </div>
//     );

//     const renderUploadStep = (credential, index) => {
//         const currentValues = formValues[credential.name] || {};
//         return (
//             <div style={{ padding: 30 }}>
//                 <h4 style={{ marginBottom: 20, color: "#666" }}>{credential.name}</h4>
//                 <Row className="mb-3">
//                     <Col md={6}>
//                         <Form.Group>
//                             <Form.Label className="mainColor">Enter Reference</Form.Label>
//                             <Form.Control
//                                 placeholder="eg. XXX-12356"
//                                 value={currentValues.reference || ''}
//                                 onChange={(e) => handleInputChange(e, credential.name, 'reference')}
//                             />
//                         </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                         <Form.Group>
//                             <Form.Label className="mainColor">Enter Issue Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 value={currentValues.issueDate || ''}
//                                 onChange={(e) => handleInputChange(e, credential.name, 'issueDate')}
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>

//                 <Form.Group className="mb-3 text-center">
//                     <Form.Label className='mainColor'>Upload Document</Form.Label>
//                     <div
//                         className="border p-4 rounded"
//                         style={{ borderStyle: 'dashed', backgroundColor: '#f8f9fa', cursor: 'pointer' }}
//                         onClick={() => document.getElementById('fileInput').click()}
//                     >
//                         <FaCloudUploadAlt size={40} className="mb-2" />
//                         <div className='mainColor'>Drag and drop or click to select</div>
//                         <Form.Control
//                             type="file"
//                             accept=".pdf,image/*"
//                             id="fileInput"
//                             onChange={handleFileChange}
//                             style={{ display: 'none' }}
//                         />
//                     </div>
//                     {file && <div className="mt-2 text-success">Selected: {file.name}</div>}
//                 </Form.Group>

//                 <div style={{ marginTop: 30 }}>
//                     {step > 1 && (
//                         <Button variant="secondary" onClick={() => setStep(step - 1)} style={{ marginRight: 10 }}>
//                             Back
//                         </Button>
//                     )}
//                     <Button onClick={() => setStep(step + 1)} variant={index < credentials.length ? "primary" : "success"}>
//                         {index < credentials.length ? "Next" : "Review & Submit"}
//                     </Button>
//                     <Button
//                         variant="outline-danger"
//                         style={{ marginLeft: 10 }}
//                         onClick={() => {
//                             localStorage.removeItem('step');
//                             window.location.reload();
//                         }}
//                     >
//                         Cancel & Exit
//                     </Button>
//                 </div>
//             </div>
//         );
//     };

//     const renderReviewScreen = () => (
//         <div style={{ padding: 40, textAlign: 'center' }}>
//             <h4 style={{ marginBottom: 30, fontWeight: '600', color: '#4b4b4b' }}>Credential Summary</h4>
//             {credentials.map((cred) => {
//                 const values = formValues[cred.document_type] || {};
//                 const file = uploadedFiles[cred.document_type];
//                 return (
//                     <Card key={cred.id} className="mb-3 text-start" style={{ borderRadius: 12 }}>
//                         <Card.Body>
//                             <h6 style={{ fontWeight: 'bold', marginBottom: 10 }}>{cred.document_type}</h6>
//                             <Row className="mb-2">
//                                 <Col xs={4}><div style={{ fontWeight: 500 }}>Reference</div><div>{values.reference || '-'}</div></Col>
//                                 <Col xs={4}><div style={{ fontWeight: 500 }}>Issue Date</div><div>{values.issueDate || '-'}</div></Col>
//                                 <Col xs={4} className="text-center"><FaFilePdf size={32} /></Col>
//                             </Row>
//                             <Row>
//                                 <Col xs={12}><div style={{ fontWeight: 500 }}>File</div><div>{file?.name || '-'}</div></Col>
//                             </Row>
//                         </Card.Body>
//                     </Card>
//                 );
//             })}
//             <div className="mt-4">
//                 <Button variant="secondary" onClick={() => setStep(step - 1)} style={{ marginRight: 10 }}>Back</Button>
//                 <Button variant="success" onClick={() => setStep(step + 1)}>Upload & Continue</Button>
//             </div>
//         </div>
//     );

//     const renderOptionalScreen = () => (
//         <div style={{ padding: 30 }}>
//             <div className="instruction">
//                 The following credentials are <span className="optional">optional</span>, if you would like to supply them,
//                 please click on the name of every credential that you are willing to supply and then click the 'Add Credentials' button.
//             </div>
//             <div className="credentials-grid">
//                 {credentialsList.map((item, idx) => (
//                     <div
//                         key={idx}
//                         className={`credential-item ${selected.includes(item) ? 'selected' : ''}`}
//                         onClick={() => toggleSelection(item)}
//                     >
//                         <FaCheckCircle className="icon" />
//                         <span>{item}</span>
//                     </div>
//                 ))}
//             </div>
//             <div className="buttons mt-4">
//                 <Button onClick={() => setStep(step + 1)} disabled={selected.length === 0}>Add {selected.length} Credentials</Button>
//                 <Button variant="link" onClick={() => alert("Skipped")}>Skip</Button>
//             </div>
//         </div>
//     );

//     const renderOptionalUploadStep = () => {
//         const name = selected[optionalStep];
//         const currentValues = optionalFormValues[name] || {};
//         return (
//             <div style={{ padding: 30 }}>
//                 <h4>{name}</h4>
//                 <Row className="mb-3">
//                     <Col md={6}>
//                         <Form.Group>
//                             <Form.Label>Reference</Form.Label>
//                             <Form.Control
//                                 placeholder="e.g. REF-456"
//                                 value={currentValues.reference || ''}
//                                 onChange={(e) => handleInputChange(e, name, 'reference', true)}
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group>
//                             <Form.Label>Issue Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 value={currentValues.issueDate || ''}
//                                 onChange={(e) => handleInputChange(e, name, 'issueDate', true)}
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Form.Group className="mb-3 text-center">
//                     <Form.Label>Upload Document</Form.Label>
//                     <div
//                         className="border p-4 rounded"
//                         style={{ borderStyle: 'dashed', backgroundColor: '#f8f9fa', cursor: 'pointer' }}
//                         onClick={() => document.getElementById('optionalFileInput').click()}
//                     >
//                         <FaCloudUploadAlt size={40} className="mb-2" />
//                         <div>Drag and drop or click to select</div>
//                         <Form.Control
//                             type="file"
//                             accept=".pdf,image/*"
//                             id="optionalFileInput"
//                             onChange={handleFileChange}
//                             style={{ display: 'none' }}
//                         />
//                     </div>
//                     {file && <div className="mt-2 text-success">Selected: {file.name}</div>}
//                 </Form.Group>
//                 <div className="mt-4">
//                     {optionalStep > 0 && (
//                         <Button variant="secondary" onClick={() => setOptionalStep(optionalStep - 1)} className="me-2">Back</Button>
//                     )}
//                     <Button
//                         variant="primary"
//                         onClick={() => {
//                             setOptionalUploadedFiles({ ...optionalUploadedFiles, [name]: file });
//                             setFile(null);
//                             if (optionalStep + 1 < selected.length) {
//                                 setOptionalStep(optionalStep + 1);
//                             } else {
//                                 alert("All optional uploads completed!");
//                             }
//                         }}
//                     >
//                         {optionalStep + 1 < selected.length ? "Next" : "Finish"}
//                     </Button>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div style={{ backgroundColor: '#f0f4f8', display: 'flex', justifyContent: 'center', padding: '20px' }}>
//             <div style={{ backgroundColor: '#fff', maxWidth: '800px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', width: '100%' }}>
//                 <div style={{ padding: '25px 30px', borderBottom: '1px solid #eee' }}>
//                     <img src={logo} alt="Logo" style={{ height: '80px' }} />
//                 </div>
//                 <div style={{ backgroundColor: '#3a3a3a', color: '#fff', padding: '4px 30px', fontWeight: '600' }}>
//                     Contractor Registration
//                 </div>

//                 {step === 0 && renderWelcomeScreen()}
//                 {step > 0 && step <= credentials.length && renderUploadStep(credentials[step - 1], step)}
//                 {step === credentials.length + 1 && renderReviewScreen()}
//                 {step === credentials.length + 2 && renderOptionalScreen()}
//                 {step === credentials.length + 3 && optionalStep < selected.length && renderOptionalUploadStep()}
//             </div>
//         </div>
//     );
// };

// export default InductionsCredentials;

// import React, { useState, useEffect, useRef } from 'react';
// import { Form, Button, Card, Row, Col } from 'react-bootstrap';
// import { FaCloudUploadAlt, FaQuestionCircle, FaFileUpload, FaFilePdf, FaCheckCircle } from 'react-icons/fa';
// import logo from '../../../../assets/logo.png';

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const credentialsList = [
//     'Confined Spaces',
//     'Elevated Work Platform (EWP) Licence',
//     'Relevant Trade Qualification',
//     'Annual Influenza Vaccination',
//     'Covid Vax',
//     'High Risk Work Licence',
//     'White Card',
//     'Working At Heights'
// ];

// const InductionsCredentials = () => {
//     const [step, setStep] = useState(0);
//     const [credentials, setCredentials] = useState([]);
//     const [uploadedFiles, setUploadedFiles] = useState({});
//     const [formValues, setFormValues] = useState({});
//     const [formValuesHistory, setFormValuesHistory] = useState({});
//     const [file, setFile] = useState(null);
//     const [selected, setSelected] = useState([]);
//     const [optionalStep, setOptionalStep] = useState(0);
//     const [optionalFormValues, setOptionalFormValues] = useState({});
//     const [optionalFormValuesHistory, setOptionalFormValuesHistory] = useState({});
//     const [optionalUploadedFiles, setOptionalUploadedFiles] = useState({});

//     // Refs for file inputs to reset their values
//     const fileInputRef = useRef(null);
//     const optionalFileInputRef = useRef(null);

//     useEffect(() => {
//         const handleBeforeUnload = (e) => {
//             e.preventDefault();
//             e.returnValue = 'You cannot refresh the page during credential submission.';
//             return 'You cannot refresh the page during credential submission.';
//         };

//         window.addEventListener('beforeunload', handleBeforeUnload);

//         return () => {
//             window.removeEventListener('beforeunload', handleBeforeUnload);
//         };
//     }, []);

//     useEffect(() => {
//         const savedStep = parseInt(localStorage.getItem('step'));
//         if (!isNaN(savedStep)) {
//             setStep(savedStep);
//         }

//         GetAllTrade();
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('step', step);
//     }, [step]);

//     const toggleSelection = (item) => {
//         setSelected(prev =>
//             prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
//         );
//     };

//     const GetAllTrade = async () => {
//         const trade_type_id = localStorage.getItem('VerificationId');
//         try {
//             const response = await fetch(`${BASE_URL}/api/orginazation/get-all-trade-type-select-documents?trade_type_id=${trade_type_id}`);
//             if (!response.ok) throw new Error('Failed to fetch credentials');
//             const data = await response.json();
//             setCredentials(data?.data?.mandatory);
//         } catch (error) {
//             console.error('Error fetching credentials:', error);
//         }
//     };

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         setFile(selectedFile);
//     };

//     const handleInputChange = (e, name, field, isOptional = false) => {
//         const updater = isOptional ? setOptionalFormValues : setFormValues;
//         const values = isOptional ? optionalFormValues : formValues;
//         const historyUpdater = isOptional ? setOptionalFormValuesHistory : setFormValuesHistory;
//         const historyValues = isOptional ? optionalFormValuesHistory : formValuesHistory;

//         const updatedValues = {
//             ...values,
//             [name]: {
//                 ...values[name],
//                 [field]: e.target.value,
//             },
//         };

//         updater(updatedValues);
//         historyUpdater({
//             ...historyValues,
//             [name]: updatedValues[name],
//         });
//     };

//     const uploadDocument = async (credentialName, isOptional = false) => {
//         if (!file) {
//             alert('Please select a file to upload.');
//             return false;
//         }

//         const values = isOptional ? optionalFormValues[credentialName] || {} : formValues[credentialName] || {};
//         const formData = new FormData();
//         formData.append('VerificationId', '1');
//         formData.append('issue_date', values.issueDate || '');
//         formData.append('reference_number', values.reference || '');
//         formData.append('trade_type_id', '2');
//         formData.append('police_check', file);

//         try {
//             const response = await fetch('http://localhost:5000/api/orginazation/upload-contractor-documents', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to upload document');
//             }

//             const data = await response.json();
//             console.log('Upload successful:', data);

//             const updater = isOptional ? setOptionalUploadedFiles : setUploadedFiles;
//             const currentFiles = isOptional ? optionalUploadedFiles : uploadedFiles;
//             updater({
//                 ...currentFiles,
//                 [credentialName]: file,
//             });

//             return true;
//         } catch (error) {
//             console.error('Error uploading document:', error);
//             alert('Failed to upload document. Please try again.');
//             return false;
//         }
//     };

//     const handleNextStep = async (credential, index, isOptional = false) => {
//         const credentialName = isOptional ? selected[optionalStep] : credential.name;
//         const uploadSuccess = await uploadDocument(credentialName, isOptional);

//         if (uploadSuccess) {
//             // Reset file input to allow re-selection of the same file
//             if (isOptional && optionalFileInputRef.current) {
//                 optionalFileInputRef.current.value = '';
//             } else if (!isOptional && fileInputRef.current) {
//                 fileInputRef.current.value = '';
//             }

//             setFile(null);

//             if (isOptional) {
//                 // Clear the form values for the current optional credential
//                 setOptionalFormValues(prev => ({
//                     ...prev,
//                     [credentialName]: { reference: '', issueDate: '' },
//                 }));

//                 const nextStep = optionalStep + 1;
//                 if (nextStep < selected.length) {
//                     setOptionalStep(nextStep);
//                     // Check if the next step has been submitted
//                     const nextCredential = selected[nextStep];
//                     if (optionalUploadedFiles[nextCredential]) {
//                         // Restore the form values and file for the next step
//                         setOptionalFormValues(prev => ({
//                             ...prev,
//                             [nextCredential]: optionalFormValuesHistory[nextCredential] || { reference: '', issueDate: '' },
//                         }));
//                         setFile(optionalUploadedFiles[nextCredential] || null);
//                     }
//                 } else {
//                     alert("All optional uploads completed!");
//                 }
//             } else {
//                 // Clear the form values for the current mandatory credential
//                 setFormValues(prev => ({
//                     ...prev,
//                     [credentialName]: { reference: '', issueDate: '' },
//                 }));

//                 const nextStep = step + 1;
//                 setStep(nextStep);
//                 // Check if the next step has been submitted
//                 if (nextStep <= credentials.length) {
//                     const nextCredential = credentials[nextStep - 1]?.name;
//                     if (uploadedFiles[nextCredential]) {
//                         // Restore the form values and file for the next step
//                         setFormValues(prev => ({
//                             ...prev,
//                             [nextCredential]: formValuesHistory[nextCredential] || { reference: '', issueDate: '' },
//                         }));
//                         setFile(uploadedFiles[nextCredential] || null);
//                     }
//                 }
//             }
//         }
//     };

//     const handleBackStep = (isOptional = false) => {
//         if (isOptional) {
//             setOptionalStep(optionalStep - 1);
//             const prevCredential = selected[optionalStep - 1];
//             setOptionalFormValues(prev => ({
//                 ...prev,
//                 [prevCredential]: optionalFormValuesHistory[prevCredential] || { reference: '', issueDate: '' },
//             }));
//             setFile(optionalUploadedFiles[prevCredential] || null);
//         } else {
//             setStep(step - 1);
//             const prevCredential = credentials[step - 2]?.name;
//             setFormValues(prev => ({
//                 ...prev,
//                 [prevCredential]: formValuesHistory[prevCredential] || { reference: '', issueDate: '' },
//             }));
//             setFile(uploadedFiles[prevCredential] || null);
//         }
//     };

//     const renderWelcomeScreen = () => (
//         <div style={{ padding: 40, textAlign: 'center' }}>
//             <h4 style={{ marginBottom: 20, color: "#666" }}>
//                 <FaFileUpload size={28} style={{ marginRight: 8 }} />
//                 Trade Credentials
//             </h4>
//             <p style={{ color: "#666" }}>
//                 Before we can proceed you are required to supply the following{' '}
//                 <span style={{ color: 'red' }}>mandatory</span> credentials.
//             </p>
//             <Row className="justify-content-center" style={{ marginTop: 20 }}>
//                 {credentials.map((cred) => (
//                     <Col key={cred.id} md={4} className="mb-3 d-flex justify-content-center">
//                         <div className="credential-card">
//                             <FaCheckCircle color='green' /> {cred.document_type}
//                         </div>
//                     </Col>
//                 ))}
//             </Row>
//             <p style={{ marginTop: 20, color: "#666" }}>
//                 Please press proceed to continue to the credential entry screen
//             </p>
//             <Button onClick={() => setStep(1)} variant="success" className='mt-3'>
//                 Proceed
//             </Button>
//         </div>
//     );

//     const renderUploadStep = (credential, index) => {
//         const currentValues = formValues[credential.name] || {};
//         return (
//             <div style={{ padding: 30 }}>
//                 <h4 style={{ marginBottom: 20, color: "#666" }}>{credential.name}</h4>
//                 <Row className="mb-3">
//                     <Col md={6}>
//                         <Form.Group>
//                             <Form.Label className="mainColor">Enter Reference</Form.Label>
//                             <Form.Control
//                                 placeholder="eg. XXX-12356"
//                                 value={currentValues.reference || ''}
//                                 onChange={(e) => handleInputChange(e, credential.name, 'reference')}
//                             />
//                         </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                         <Form.Group>
//                             <Form.Label className="mainColor">Enter Issue Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 value={currentValues.issueDate || ''}
//                                 onChange={(e) => handleInputChange(e, credential.name, 'issueDate')}
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>

//                 <Form.Group className="mb-3 text-center">
//                     <Form.Label className='mainColor'>Upload Document</Form.Label>
//                     <div
//                         className="border p-4 rounded"
//                         style={{ borderStyle: 'dashed', backgroundColor: '#f8f9fa', cursor: 'pointer' }}
//                         onClick={() => document.getElementById('fileInput').click()}
//                     >
//                         <FaCloudUploadAlt size={40} className="mb-2" />
//                         <div className='mainColor'>Drag and drop or click to select</div>
//                         <Form.Control
//                             type="file"
//                             accept=".pdf,image/*"
//                             id="fileInput"
//                             ref={fileInputRef}
//                             onChange={handleFileChange}
//                             style={{ display: 'none' }}
//                         />
//                     </div>
//                     {file && <div className="mt-2 text-success">Selected: {file.name}</div>}
//                 </Form.Group>

//                 <div style={{ marginTop: 30 }}>
//                     {step > 1 && (
//                         <Button variant="secondary" onClick={() => handleBackStep()} style={{ marginRight: 10 }}>
//                             Back
//                         </Button>
//                     )}
//                     <Button
//                         onClick={() => handleNextStep(credential, index)}
//                         variant={index < credentials.length ? "primary" : "success"}
//                     >
//                         {index < credentials.length ? "Next" : "Review & Submit"}
//                     </Button>
//                     <Button
//                         variant="outline-danger"
//                         style={{ marginLeft: 10 }}
//                         onClick={() => {
//                             localStorage.removeItem('step');
//                             window.location.reload();
//                         }}
//                     >
//                         Cancel & Exit
//                     </Button>
//                 </div>
//             </div>
//         );
//     };

//     const renderReviewScreen = () => (
//         <div style={{ padding: 40, textAlign: 'center' }}>
//             <h4 style={{ marginBottom: 30, fontWeight: '600', color: '#4b4b4b' }}>Credential Summary</h4>
//             {credentials.map((cred) => {
//                 const values = formValuesHistory[cred.document_type] || {};
//                 const file = uploadedFiles[cred.document_type];
//                 return (
//                     <Card key={cred.id} className="mb-3 text-start" style={{ borderRadius: 12 }}>
//                         <Card.Body>
//                             <h6 style={{ fontWeight: 'bold', marginBottom: 10 }}>{cred.document_type}</h6>
//                             <Row className="mb-2">
//                                 <Col xs={4}><div style={{ fontWeight: 500 }}>Reference</div><div>{values.reference || '-'}</div></Col>
//                                 <Col xs={4}><div style={{ fontWeight: 500 }}>Issue Date</div><div>{values.issueDate || '-'}</div></Col>
//                                 <Col xs={4} className="text-center"><FaFilePdf size={32} /></Col>
//                             </Row>
//                             <Row>
//                                 <Col xs={12}><div style={{ fontWeight: 500 }}>File</div><div>{file?.name || '-'}</div></Col>
//                             </Row>
//                         </Card.Body>
//                     </Card>
//                 );
//             })}
//             <div className="mt-4">
//                 <Button variant="secondary" onClick={() => handleBackStep()} style={{ marginRight: 10 }}>Back</Button>
//                 <Button variant="success" onClick={() => setStep(step + 1)}>Upload & Continue</Button>
//             </div>
//         </div>
//     );

//     const renderOptionalScreen = () => (
//         <div style={{ padding: 30 }}>
//             <div className="instruction">
//                 The following credentials are <span className="optional">optional</span>, if you would like to supply them,
//                 please click on the name of every credential that you are willing to supply and then click the 'Add Credentials' button.
//             </div>
//             <div className="credentials-grid">
//                 {credentialsList.map((item, idx) => (
//                     <div
//                         key={idx}
//                         className={`credential-item ${selected.includes(item) ? 'selected' : ''}`}
//                         onClick={() => toggleSelection(item)}
//                     >
//                         <FaCheckCircle className="icon" />
//                         <span>{item}</span>
//                     </div>
//                 ))}
//             </div>
//             <div className="buttons mt-4">
//                 <Button onClick={() => setStep(step + 1)} disabled={selected.length === 0}>Add {selected.length} Credentials</Button>
//                 <Button variant="link" onClick={() => alert("Skipped")}>Skip</Button>
//             </div>
//         </div>
//     );

//     const renderOptionalUploadStep = () => {
//         const name = selected[optionalStep];
//         const currentValues = optionalFormValues[name] || {};
//         return (
//             <div style={{ padding: 30 }}>
//                 <h4>{name}</h4>
//                 <Row className="mb-3">
//                     <Col md={6}>
//                         <Form.Group>
//                             <Form.Label>Reference</Form.Label>
//                             <Form.Control
//                                 placeholder="e.g. REF-456"
//                                 value={currentValues.reference || ''}
//                                 onChange={(e) => handleInputChange(e, name, 'reference', true)}
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group>
//                             <Form.Label>Issue Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 value={currentValues.issueDate || ''}
//                                 onChange={(e) => handleInputChange(e, name, 'issueDate', true)}
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Form.Group className="mb-3 text-center">
//                     <Form.Label>Upload Document</Form.Label>
//                     <div
//                         className="border p-4 rounded"
//                         style={{ borderStyle: 'dashed', backgroundColor: '#f8f9fa', cursor: 'pointer' }}
//                         onClick={() => document.getElementById('optionalFileInput').click()}
//                     >
//                         <FaCloudUploadAlt size={40} className="mb-2" />
//                         <div>Drag and drop or click to select</div>
//                         <Form.Control
//                             type="file"
//                             accept=".pdf,image/*"
//                             id="optionalFileInput"
//                             ref={optionalFileInputRef}
//                             onChange={handleFileChange}
//                             style={{ display: 'none' }}
//                         />
//                     </div>
//                     {file && <div className="mt-2 text-success">Selected: {file.name}</div>}
//                 </Form.Group>
//                 <div className="mt-4">
//                     {optionalStep > 0 && (
//                         <Button variant="secondary" onClick={() => handleBackStep(true)} className="me-2">Back</Button>
//                     )}
//                     <Button
//                         variant="primary"
//                         onClick={() => handleNextStep(null, optionalStep, true)}
//                     >
//                         {optionalStep + 1 < selected.length ? "Next" : "Finish"}
//                     </Button>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div style={{ backgroundColor: '#f0f4f8', display: 'flex', justifyContent: 'center', padding: '20px' }}>
//             <div style={{ backgroundColor: '#fff', maxWidth: '800px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', width: '100%' }}>
//                 <div style={{ padding: '25px 30px', borderBottom: '1px solid #eee' }}>
//                     <img src={logo} alt="Logo" style={{ height: '80px' }} />
//                 </div>
//                 <div style={{ backgroundColor: '#3a3a3a', color: '#fff', padding: '4px 30px', fontWeight: '600' }}>
//                     Contractor Registration
//                 </div>

//                 {step === 0 && renderWelcomeScreen()}
//                 {step > 0 && step <= credentials.length && renderUploadStep(credentials[step - 1], step)}
//                 {step === credentials.length + 1 && renderReviewScreen()}
//                 {step === credentials.length + 2 && renderOptionalScreen()}
//                 {step === credentials.length + 3 && optionalStep < selected.length && renderOptionalUploadStep()}
//             </div>
//         </div>
//     );
// };

// export default InductionsCredentials;

// import React, { useState, useEffect, useRef } from 'react';
// import { Form, Button, Card, Row, Col } from 'react-bootstrap';
// import { FaCloudUploadAlt, FaQuestionCircle, FaFileUpload, FaFilePdf, FaCheckCircle } from 'react-icons/fa';
// import logo from '../../../../assets/logo.png';

// const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const credentialsList = [
//     'Confined Spaces',
//     'Elevated Work Platform (EWP) Licence',
//     'Relevant Trade Qualification',
//     'Annual Influenza Vaccination',
//     'Covid Vax',
//     'High Risk Work Licence',
//     'White Card',
//     'Working At Heights'
// ];

// const InductionsCredentials = () => {
//     const [step, setStep] = useState(0);
//     const [credentials, setCredentials] = useState([]);
//     const [uploadedFiles, setUploadedFiles] = useState({});
//     const [formValues, setFormValues] = useState({});
//     const [formValuesHistory, setFormValuesHistory] = useState({});
//     const [file, setFile] = useState(null);
//     const [selected, setSelected] = useState([]);
//     const [optionalStep, setOptionalStep] = useState(0);
//     const [optionalFormValues, setOptionalFormValues] = useState({});
//     const [optionalFormValuesHistory, setOptionalFormValuesHistory] = useState({});
//     const [optionalUploadedFiles, setOptionalUploadedFiles] = useState({});

//     const fileInputRef = useRef(null);
//     const optionalFileInputRef = useRef(null);

//     useEffect(() => {
//         const handleBeforeUnload = (e) => {
//             e.preventDefault();
//             e.returnValue = 'You cannot refresh the page during credential submission.';
//             return 'You cannot refresh the page during credential submission.';
//         };

//         window.addEventListener('beforeunload', handleBeforeUnload);

//         return () => {
//             window.removeEventListener('beforeunload', handleBeforeUnload);
//         };
//     }, []);

//     useEffect(() => {
//         const savedStep = parseInt(localStorage.getItem('step'));
//         if (!isNaN(savedStep)) {
//             setStep(savedStep);
//         }

//         GetAllTrade();
//     }, []);

//     useEffect(() => {
//         localStorage.setItem('step', step);
//     }, [step]);

//     const toggleSelection = (item) => {
//         setSelected(prev =>
//             prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
//         );
//     };

//     const GetAllTrade = async () => {
//         const trade_type_id = localStorage.getItem('VerificationId');
//         try {
//             const response = await fetch(`${BASE_URL}/api/orginazation/get-all-trade-type-select-documents?trade_type_id=${trade_type_id}`);
//             if (!response.ok) throw new Error('Failed to fetch credentials');
//             const data = await response.json();
//             setCredentials(data?.data?.mandatory);
//         } catch (error) {
//             console.error('Error fetching credentials:', error);
//         }
//     };

//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         setFile(selectedFile);
//     };

//     const handleInputChange = (e, name, field, isOptional = false) => {
//         const updater = isOptional ? setOptionalFormValues : setFormValues;
//         const values = isOptional ? optionalFormValues : formValues;
//         const historyUpdater = isOptional ? setOptionalFormValuesHistory : setFormValuesHistory;
//         const historyValues = isOptional ? optionalFormValuesHistory : formValuesHistory;

//         const updatedValues = {
//             ...values,
//             [name]: {
//                 ...values[name],
//                 [field]: e.target.value,
//             },
//         };

//         updater(updatedValues);
//         historyUpdater({
//             ...historyValues,
//             [name]: updatedValues[name],
//         });
//     };

//     const uploadDocument = async (credentialName, isOptional = false) => {
//         if (!file) {
//             alert('Please select a file to upload.');
//             return false;
//         }

//         const values = isOptional ? optionalFormValues[credentialName] || {} : formValues[credentialName] || {};
//         const formData = new FormData();
//         formData.append('VerificationId', '1');
//         formData.append('issue_date', values.issueDate || '');
//         formData.append('reference_number', values.reference || '');
//         formData.append('trade_type_id', '2');
//         formData.append('police_check', file);

//         try {
//             const response = await fetch('http://localhost:5000/api/orginazation/upload-contractor-documents', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to upload document');
//             }

//             const data = await response.json();
//             console.log('Upload successful:', data);

//             const updater = isOptional ? setOptionalUploadedFiles : setUploadedFiles;
//             const currentFiles = isOptional ? optionalUploadedFiles : uploadedFiles;
//             updater({
//                 ...currentFiles,
//                 [credentialName]: file,
//             });

//             return true;
//         } catch (error) {
//             console.error('Error uploading document:', error);
//             alert('Failed to upload document. Please try again.');
//             return false;
//         }
//     };

//     const handleNextStep = async (credential, index, isOptional = false) => {
//         const credentialName = isOptional ? selected[optionalStep] : credential.document_type;
//         const uploadSuccess = await uploadDocument(credentialName, isOptional);

//         if (uploadSuccess) {
//             if (isOptional && optionalFileInputRef.current) {
//                 optionalFileInputRef.current.value = '';
//             } else if (!isOptional && fileInputRef.current) {
//                 fileInputRef.current.value = '';
//             }

//             setFile(null);

//             if (isOptional) {
//                 setOptionalFormValues(prev => ({
//                     ...prev,
//                     [credentialName]: { reference: '', issueDate: '' },
//                 }));

//                 const nextStep = optionalStep + 1;
//                 if (nextStep < selected.length) {
//                     setOptionalStep(nextStep);
//                     const nextCredential = selected[nextStep];
//                     if (optionalUploadedFiles[nextCredential]) {
//                         setOptionalFormValues(prev => ({
//                             ...prev,
//                             [nextCredential]: optionalFormValuesHistory[nextCredential] || { reference: '', issueDate: '' },
//                         }));
//                         setFile(optionalUploadedFiles[nextCredential] || null);
//                     }
//                 } else {
//                     alert("All optional uploads completed!");
//                 }
//             } else {
//                 setFormValues(prev => ({
//                     ...prev,
//                     [credentialName]: { reference: '', issueDate: '' },
//                 }));

//                 const nextStep = step + 1;
//                 setStep(nextStep);
//                 if (nextStep <= credentials.length) {
//                     const nextCredential = credentials[nextStep - 1]?.document_type;
//                     if (uploadedFiles[nextCredential]) {
//                         setFormValues(prev => ({
//                             ...prev,
//                             [nextCredential]: formValuesHistory[nextCredential] || { reference: '', issueDate: '' },
//                         }));
//                         setFile(uploadedFiles[nextCredential] || null);
//                     }
//                 }
//             }
//         }
//     };

//     const handleBackStep = (isOptional = false) => {
//         if (isOptional) {
//             setOptionalStep(optionalStep - 1);
//             const prevCredential = selected[optionalStep - 1];
//             setOptionalFormValues(prev => ({
//                 ...prev,
//                 [prevCredential]: optionalFormValuesHistory[prevCredential] || { reference: '', issueDate: '' },
//             }));
//             setFile(optionalUploadedFiles[prevCredential] || null);
//         } else {
//             setStep(step - 1);
//             const prevCredential = credentials[step - 2]?.document_type;
//             setFormValues(prev => ({
//                 ...prev,
//                 [prevCredential]: formValuesHistory[prevCredential] || { reference: '', issueDate: '' },
//             }));
//             setFile(uploadedFiles[prevCredential] || null);
//         }
//     };

//     const renderWelcomeScreen = () => (
//         <div style={{ padding: 40, textAlign: 'center' }}>
//             <h4 style={{ marginBottom: 20, color: "#666" }}>
//                 <FaFileUpload size={28} style={{ marginRight: 8 }} />
//                 Trade Credentials
//             </h4>
//             <p style={{ color: "#666" }}>
//                 Before we can proceed you are required to supply the following{' '}
//                 <span style={{ color: 'red' }}>mandatory</span> credentials.
//             </p>
//             <Row className="justify-content-center" style={{ marginTop: 20 }}>
//                 {credentials.map((cred) => (
//                     <Col key={cred.id} md={4} className="mb-3 d-flex justify-content-center">
//                         <div className="credential-card">
//                             <FaCheckCircle color='green' /> {cred.document_type}
//                         </div>
//                     </Col>
//                 ))}
//             </Row>
//             <p style={{ marginTop: 20, color: "#666" }}>
//                 Please press proceed to continue to the credential entry screen
//             </p>
//             <Button onClick={() => setStep(1)} variant="success" className='mt-3'>
//                 Proceed
//             </Button>
//         </div>
//     );

//     const renderUploadStep = (credential, index) => {
//         const currentValues = formValues[credential.document_type] || {};
//         return (
//             <div style={{ padding: 30 }}>
//                 <h4 style={{ marginBottom: 20, color: "#666" }}>{credential.document_type}</h4>
//                 <Row className="mb-3">
//                     <Col md={6}>
//                         <Form.Group>
//                             <Form.Label className="mainColor">Enter Reference</Form.Label>
//                             <Form.Control
//                                 placeholder="eg. XXX-12356"
//                                 value={currentValues.reference || ''}
//                                 onChange={(e) => handleInputChange(e, credential.document_type, 'reference')}
//                             />
//                         </Form.Group>
//                     </Col>

//                     <Col md={6}>
//                         <Form.Group>
//                             <Form.Label className="mainColor">Enter Issue Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 value={currentValues.issueDate || ''}
//                                 onChange={(e) => handleInputChange(e, credential.document_type, 'issueDate')}
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>

//                 <Form.Group className="mb-3 text-center">
//                     <Form.Label className='mainColor'>Upload Document</Form.Label>
//                     <div
//                         className="border p-4 rounded"
//                         style={{ borderStyle: 'dashed', backgroundColor: '#f8f9fa', cursor: 'pointer' }}
//                         onClick={() => document.getElementById('fileInput').click()}
//                     >
//                         <FaCloudUploadAlt size={40} className="mb-2" />
//                         <div className='mainColor'>Drag and drop or click to select</div>
//                         <Form.Control
//                             type="file"
//                             accept=".pdf,image/*"
//                             id="fileInput"
//                             ref={fileInputRef}
//                             onChange={handleFileChange}
//                             style={{ display: 'none' }}
//                         />
//                     </div>
//                     {file && <div className="mt-2 text-success">Selected: {file.name}</div>}
//                 </Form.Group>

//                 <div style={{ marginTop: 30 }}>
//                     {step > 1 && (
//                         <Button variant="secondary" onClick={() => handleBackStep()} style={{ marginRight: 10 }}>
//                             Back
//                         </Button>
//                     )}
//                     <Button
//                         onClick={() => handleNextStep(credential, index)}
//                         variant={index < credentials.length ? "primary" : "success"}
//                     >
//                         {index < credentials.length ? "Next" : "Review & Submit"}
//                     </Button>
//                     <Button
//                         variant="outline-danger"
//                         style={{ marginLeft: 10 }}
//                         onClick={() => {
//                             localStorage.removeItem('step');
//                             window.location.reload();
//                         }}
//                     >
//                         Cancel & Exit
//                     </Button>
//                 </div>
//             </div>
//         );
//     };

//     const renderReviewScreen = () => (
//         <div style={{ padding: 40, textAlign: 'center' }}>
//             <h4 style={{ marginBottom: 30, fontWeight: '600', color: '#4b4b4b' }}>Credential Summary</h4>

//             {/* Mandatory Credentials Section */}
//             {credentials.length > 0 && (
//                 <>
//                     <h5 style={{ marginBottom: 20, color: '#666' }}>Mandatory Credentials</h5>
//                     {credentials.map((cred) => {
//                         const values = formValuesHistory[cred.document_type] || {};
//                         const file = uploadedFiles[cred.document_type];
//                         return (
//                             <Card key={cred.id} className="mb-3 text-start" style={{ borderRadius: 12 }}>
//                                 <Card.Body>
//                                     <h6 style={{ fontWeight: 'bold', marginBottom: 10 }}>{cred.document_type}</h6>
//                                     <Row className="mb-2">
//                                         <Col xs={4}>
//                                             <div style={{ fontWeight: 500 }}>Reference</div>
//                                             <div>{values.reference || '-'}</div>
//                                         </Col>
//                                         <Col xs={4}>
//                                             <div style={{ fontWeight: 500 }}>Issue Date</div>
//                                             <div>{values.issueDate || '-'}</div>
//                                         </Col>
//                                         <Col xs={4} className="text-center">
//                                             <FaFilePdf size={32} />
//                                         </Col>
//                                     </Row>
//                                     <Row>
//                                         <Col xs={12}>
//                                             <div style={{ fontWeight: 500 }}>File</div>
//                                             <div>{file ? file.name : '-'}</div>
//                                         </Col>
//                                     </Row>
//                                 </Card.Body>
//                             </Card>
//                         );
//                     })}
//                 </>
//             )}

//             {/* Optional Credentials Section */}
//             {selected.length > 0 && (
//                 <>
//                     <h5 style={{ marginTop: 40, marginBottom: 20, color: '#666' }}>Optional Credentials</h5>
//                     {selected.map((credName, index) => {
//                         const values = optionalFormValuesHistory[credName] || {};
//                         const file = optionalUploadedFiles[credName];
//                         return (
//                             <Card key={`optional-${index}`} className="mb-3 text-start" style={{ borderRadius: 12 }}>
//                                 <Card.Body>
//                                     <h6 style={{ fontWeight: 'bold', marginBottom: 10 }}>{credName}</h6>
//                                     <Row className="mb-2">
//                                         <Col xs={4}>
//                                             <div style={{ fontWeight: 500 }}>Reference</div>
//                                             <div>{values.reference || '-'}</div>
//                                         </Col>
//                                         <Col xs={4}>
//                                             <div style={{ fontWeight: 500 }}>Issue Date</div>
//                                             <div>{values.issueDate || '-'}</div>
//                                         </Col>
//                                         <Col xs={4} className="text-center">
//                                             <FaFilePdf size={32} />
//                                         </Col>
//                                     </Row>
//                                     <Row>
//                                         <Col xs={12}>
//                                             <div style={{ fontWeight: 500 }}>File</div>
//                                             <div>{file ? file.name : '-'}</div>
//                                         </Col>
//                                     </Row>
//                                 </Card.Body>
//                             </Card>
//                         );
//                     })}
//                 </>
//             )}

//             <div className="mt-4">
//                 <Button variant="secondary" onClick={() => handleBackStep()} style={{ marginRight: 10 }}>Back</Button>
//                 <Button variant="success" onClick={() => setStep(step + 1)}>Upload & Continue</Button>
//             </div>
//         </div>
//     );

//     const renderOptionalScreen = () => (
//         <div style={{ padding: 30 }}>
//             <div className="instruction">
//                 The following credentials are <span className="optional">optional</span>, if you would like to supply them,
//                 please click on the name of every credential that you are willing to supply and then click the 'Add Credentials' button.
//             </div>
//             <div className="credentials-grid">
//                 {credentialsList.map((item, idx) => (
//                     <div
//                         key={idx}
//                         className={`credential-item ${selected.includes(item) ? 'selected' : ''}`}
//                         onClick={() => toggleSelection(item)}
//                     >
//                         <FaCheckCircle className="icon" />
//                         <span>{item}</span>
//                     </div>
//                 ))}
//             </div>
//             <div className="buttons mt-4">
//                 <Button onClick={() => setStep(step + 1)} disabled={selected.length === 0}>Add {selected.length} Credentials</Button>
//                 <Button variant="link" onClick={() => alert("Skipped")}>Skip</Button>
//             </div>
//         </div>
//     );

//     const renderOptionalUploadStep = () => {
//         const name = selected[optionalStep];
//         const currentValues = optionalFormValues[name] || {};
//         return (
//             <div style={{ padding: 30 }}>
//                 <h4>{name}</h4>
//                 <Row className="mb-3">
//                     <Col md={6}>
//                         <Form.Group>
//                             <Form.Label>Reference</Form.Label>
//                             <Form.Control
//                                 placeholder="e.g. REF-456"
//                                 value={currentValues.reference || ''}
//                                 onChange={(e) => handleInputChange(e, name, 'reference', true)}
//                             />
//                         </Form.Group>
//                     </Col>
//                     <Col md={6}>
//                         <Form.Group>
//                             <Form.Label>Issue Date</Form.Label>
//                             <Form.Control
//                                 type="date"
//                                 value={currentValues.issueDate || ''}
//                                 onChange={(e) => handleInputChange(e, name, 'issueDate', true)}
//                             />
//                         </Form.Group>
//                     </Col>
//                 </Row>
//                 <Form.Group className="mb-3 text-center">
//                     <Form.Label>Upload Document</Form.Label>
//                     <div
//                         className="border p-4 rounded"
//                         style={{ borderStyle: 'dashed', backgroundColor: '#f8f9fa', cursor: 'pointer' }}
//                         onClick={() => document.getElementById('optionalFileInput').click()}
//                     >
//                         <FaCloudUploadAlt size={40} className="mb-2" />
//                         <div>Drag and drop or click to select</div>
//                         <Form.Control
//                             type="file"
//                             accept=".pdf,image/*"
//                             id="optionalFileInput"
//                             ref={optionalFileInputRef}
//                             onChange={handleFileChange}
//                             style={{ display: 'none' }}
//                         />
//                     </div>
//                     {file && <div className="mt-2 text-success">Selected: {file.name}</div>}
//                 </Form.Group>
//                 <div className="mt-4">
//                     {optionalStep > 0 && (
//                         <Button variant="secondary" onClick={() => handleBackStep(true)} className="me-2">Back</Button>
//                     )}
//                     <Button
//                         variant="primary"
//                         onClick={() => handleNextStep(null, optionalStep, true)}
//                     >
//                         {optionalStep + 1 < selected.length ? "Next" : "Finish"}
//                     </Button>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div style={{ backgroundColor: '#f0f4f8', display: 'flex', justifyContent: 'center', padding: '20px' }}>
//             <div style={{ backgroundColor: '#fff', maxWidth: '800px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', width: '100%' }}>
//                 <div style={{ padding: '25px 30px', borderBottom: '1px solid #eee' }}>
//                     <img src={logo} alt="Logo" style={{ height: '80px' }} />
//                 </div>
//                 <div style={{ backgroundColor: '#3a3a3a', color: '#fff', padding: '4px 30px', fontWeight: '600' }}>
//                     Contractor Registration
//                 </div>

//                 {step === 0 && renderWelcomeScreen()}
//                 {step > 0 && step <= credentials.length && renderUploadStep(credentials[step - 1], step)}
//                 {step === credentials.length + 1 && renderReviewScreen()}
//                 {step === credentials.length + 2 && renderOptionalScreen()}
//                 {step === credentials.length + 3 && optionalStep < selected.length && renderOptionalUploadStep()}
//             </div>
//         </div>
//     );
// };

// export default InductionsCredentials;

import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Card, Row, Col } from 'react-bootstrap';
import { FaCloudUploadAlt, FaQuestionCircle, FaFileUpload, FaFilePdf, FaCheckCircle } from 'react-icons/fa';
import logo from '../../../../assets/logoRR.png';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const credentialsList = [
    'Confined Spaces',
    'Elevated Work Platform (EWP) Licence',
    'Relevant Trade Qualification',
    'Annual Influenza Vaccination',
    'Covid Vax',
    'High Risk Work Licence',
    'White Card',
    'Working At Heights'
];

const InductionsCredentials = () => {
    const [step, setStep] = useState(0);
    const [credentials, setCredentials] = useState([]);
    const [credentialsoptional, setCredentialsoptional] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [formValues, setFormValues] = useState({});
    const [formValuesHistory, setFormValuesHistory] = useState({});
    const [file, setFile] = useState(null);
    const [selected, setSelected] = useState([]);
    const [optionalStep, setOptionalStep] = useState(0);
    const [optionalFormValues, setOptionalFormValues] = useState({});
    const [optionalFormValuesHistory, setOptionalFormValuesHistory] = useState({});
    const [optionalUploadedFiles, setOptionalUploadedFiles] = useState({});

    const fileInputRef = useRef(null);
    const optionalFileInputRef = useRef(null);
    const navigate = useNavigate();
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            e.returnValue = 'You cannot refresh the page during credential submission.';
            return 'You cannot refresh the page during credential submission.';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const savedStep = parseInt(localStorage.getItem('step'));
        if (!isNaN(savedStep)) {
            setStep(savedStep);
        }
        GetAllTrade();
    }, []);

    useEffect(() => {
        localStorage.setItem('step', step);

    }, [step]);

    // const toggleSelection = (item) => {
    //     setSelected(prev =>
    //         prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    //     );
    // };
    const toggleSelection = (item) => {
        setSelected(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const GetAllTrade = async () => {
        const trade_type_id = localStorage.getItem('VerificationId');
        try {
            const response = await fetch(`${BASE_URL}/api/orginazation/get-all-trade-type-select-documents?trade_type_id=${trade_type_id}`);
            if (!response.ok) throw new Error('Failed to fetch credentials');
            const data = await response.json();
            setCredentials(data?.data?.mandatory);
            setCredentialsoptional(data?.data?.optional);
        } catch (error) {
            console.error('Error fetching credentials:', error);
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleInputChange = (e, name, field, isOptional = false) => {
        const updater = isOptional ? setOptionalFormValues : setFormValues;
        const values = isOptional ? optionalFormValues : formValues;
        const historyUpdater = isOptional ? setOptionalFormValuesHistory : setFormValuesHistory;
        const historyValues = isOptional ? optionalFormValuesHistory : formValuesHistory;

        const updatedValues = {
            ...values,
            [name]: {
                ...values[name],
                [field]: e.target.value,
            },
        };

        updater(updatedValues);
        historyUpdater({
            ...historyValues,
            [name]: updatedValues[name],
        });
    };

    // const uploadDocument = async (credentialName, id, isOptional = false) => {

    //     console.log("%%%%%%%%%%%%****", credentialName, id)

    //     const trade_type_id = localStorage.getItem('VerificationId');

    //     if (!file) {
    //         alert('Please select a file to upload.');
    //         return false;
    //     }

    //     const values = isOptional ? optionalFormValues[credentialName] || {} : formValues[credentialName] || {};
    //     const formData = new FormData();
    //     formData.append('VerificationId', trade_type_id);
    //     formData.append('issue_date', values.issueDate || '');
    //     formData.append('reference_number', values.reference || '');
    //     formData.append('trade_type_id', id);
    //     formData.append('documentfileName', credentialName);
    //     formData.append('police_check', file);

    //     try {
    //         const response = await fetch('http://localhost:5000/api/orginazation/upload-contractor-documents', {
    //             method: 'POST',
    //             body: formData,
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to upload document');
    //         }

    //         const data = await response.json();
    //         console.log('Upload successful:', data);

    //         const updater = isOptional ? setOptionalUploadedFiles : setUploadedFiles;
    //         const currentFiles = isOptional ? optionalUploadedFiles : uploadedFiles;
    //         updater({
    //             ...currentFiles,
    //             [credentialName]: file,
    //         });

    //         return true;
    //     } catch (error) {
    //         console.error('Error uploading document:', error);
    //         alert('Failed to upload document. Please try again.');
    //         return false;
    //     }
    // };


    const uploadDocument = async (credentialName, id, isOptional = false) => {
        const trade_type_id = localStorage.getItem('VerificationId');

        if (!file) {
            alert('Please select a file to upload.');
            return false;
        }

        const values = isOptional ? optionalFormValues[credentialName] || {} : formValues[credentialName] || {};
        const formData = new FormData();

        // Common fields for both mandatory and optional
        formData.append('VerificationId', trade_type_id);
        formData.append('issue_date', values.issueDate || '');
        formData.append('reference_number', values.reference || '');
        formData.append('documentfileName', credentialName);
        formData.append('police_check', file);

        // Handle the trade_type_id differently for optional credentials
        if (isOptional) {
            // For optional credentials, find the matching credential to get its ID
            const optionalCredential = credentialsoptional.find(cred => cred.document_type === credentialName);
            if (optionalCredential) {
                formData.append('trade_type_id', optionalCredential.id);
            } else {
                console.error('Optional credential not found:', credentialName);
                alert('Error: Credential configuration not found');
                return false;
            }
        } else {
            // For mandatory credentials, use the provided id directly
            formData.append('trade_type_id', id);
        }

        try {
            const response = await fetch(`${BASE_URL}/api/orginazation/upload-contractor-documents`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload document');
            }

            const data = await response.json();
            console.log('Upload successful:', data);

            const updater = isOptional ? setOptionalUploadedFiles : setUploadedFiles;
            const currentFiles = isOptional ? optionalUploadedFiles : uploadedFiles;
            updater({
                ...currentFiles,
                [credentialName]: file,
            });

            return true;
        } catch (error) {
            console.error('Error uploading document:', error);
            alert('Failed to upload document. Please try again.');
            return false;
        }
    };


    const uploadDocumentFinal = async (credentialName, isOptional = false) => {
        const trade_type_id = localStorage.getItem('VerificationId');

        console.log("isOptional", isOptional);
        console.log("credentialName", credentialName);

        const formData = new FormData();
        formData.append('VerificationId', trade_type_id);
        formData.append('confirmfinalSubmit', isOptional);
        formData.append('document_type', credentialName);


        try {
            const response = await fetch(`${BASE_URL}/api/orginazation/upload-contractor-documents`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload document');
            }

            const data = await response.json();
            console.log('Upload successful:', data);

            const updater = isOptional ? setOptionalUploadedFiles : setUploadedFiles;
            const currentFiles = isOptional ? optionalUploadedFiles : uploadedFiles;
            updater({
                ...currentFiles,
                [credentialName]: file,
            });

            return true;
        } catch (error) {
            console.error('Error uploading document:', error);
            alert('Failed to upload document. Please try again.');
            return false;
        }
    };

    const handleNextStep = async (credential, index, isOptional = false) => {
        // const credentialName = isOptional ? selected[optionalStep] : credential.document_type;
        // const id = isOptional ? selected[optionalStep] : credential.id;
        let credentialName, id;

        if (isOptional) {
            credentialName = selected[optionalStep];
            // Find the optional credential to get its ID
            const optionalCredential = credentialsoptional.find(cred => cred.document_type === credentialName);
            id = optionalCredential?.id;
        } else {
            credentialName = credential.document_type;
            id = credential.id;
        }

        const uploadSuccess = await uploadDocument(credentialName, id, isOptional);

        if (uploadSuccess) {
            if (isOptional && optionalFileInputRef.current) {
                optionalFileInputRef.current.value = '';
            } else if (!isOptional && fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            setFile(null);

            if (isOptional) {
                setOptionalFormValues(prev => ({
                    ...prev,
                    [credentialName]: { reference: '', issueDate: '' },
                }));

                const nextStep = optionalStep + 1;
                if (nextStep < selected.length) {
                    setOptionalStep(nextStep);
                    const nextCredential = selected[nextStep];
                    if (optionalUploadedFiles[nextCredential]) {
                        setOptionalFormValues(prev => ({
                            ...prev,
                            [nextCredential]: optionalFormValuesHistory[nextCredential] || { reference: '', issueDate: '' },
                        }));
                        setFile(optionalUploadedFiles[nextCredential] || null);
                    }
                } else {
                    // After all optional uploads, go to the "Upload & Review" step
                    setStep(credentials.length + 4);
                }
            } else {
                setFormValues(prev => ({
                    ...prev,
                    [credentialName]: { reference: '', issueDate: '' },
                }));

                const nextStep = step + 1;
                setStep(nextStep);
                if (nextStep <= credentials.length) {
                    const nextCredential = credentials[nextStep - 1]?.document_type;
                    if (uploadedFiles[nextCredential]) {
                        setFormValues(prev => ({
                            ...prev,
                            [nextCredential]: formValuesHistory[nextCredential] || { reference: '', issueDate: '' },
                        }));
                        setFile(uploadedFiles[nextCredential] || null);
                    }
                }
            }
        }
    };

    const handleBackStep = (isOptional = false) => {
        if (isOptional) {
            setOptionalStep(optionalStep - 1);
            const prevCredential = selected[optionalStep - 1];
            setOptionalFormValues(prev => ({
                ...prev,
                [prevCredential]: optionalFormValuesHistory[prevCredential] || { reference: '', issueDate: '' },
            }));
            setFile(optionalUploadedFiles[prevCredential] || null);
        } else {
            setStep(step - 1);
            const prevCredential = credentials[step - 2]?.document_type;
            setFormValues(prev => ({
                ...prev,
                [prevCredential]: formValuesHistory[prevCredential] || { reference: '', issueDate: '' },
            }));
            setFile(uploadedFiles[prevCredential] || null);
        }
    };

    const renderWelcomeScreen = () => (
        <div style={{ padding: 40, textAlign: 'center' }}>
            <h4 style={{ marginBottom: 20, color: "#666" }}>
                <FaFileUpload size={28} style={{ marginRight: 8 }} />
                Trade Credentials
            </h4>
            <p style={{ color: "#666" }}>
                Before we can proceed you are required to supply the following{' '}
                <span style={{ color: 'red' }}>mandatory</span> credentials.
            </p>
            <Row className="justify-content-center" style={{ marginTop: 20 }}>
                {credentials.map((cred) => (
                    <Col key={cred.id} md={6} className="mb-3 d-flex justify-content-center">
                        <div className="credential-card">
                            <FaCheckCircle color='green' /> {cred.document_type}
                        </div>
                    </Col>
                ))}
            </Row>
            <p style={{ marginTop: 20, color: "#666" }}>
                Please press proceed to continue to the credential entry screen
            </p>
            <Button onClick={() => setStep(1)} variant="success" className='mt-3'>
                Proceed
            </Button>
        </div>
    );

    const renderUploadStep = (credential, index) => {
        const currentValues = formValues[credential.document_type] || {};
        return (
            <div style={{ padding: 30 }}>
                <h4 style={{ marginBottom: 20, color: "#666" }}>{credential.document_type}</h4>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label className="mainColor">Enter Reference</Form.Label>
                            <Form.Control
                                placeholder="eg. XXX-12356"
                                value={currentValues.reference || ''}
                                onChange={(e) => handleInputChange(e, credential.document_type, 'reference')}
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group>
                            <Form.Label className="mainColor">Enter Issue Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={currentValues.issueDate || ''}
                                onChange={(e) => handleInputChange(e, credential.document_type, 'issueDate')}
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3 text-center">
                    <Form.Label className='mainColor'>Upload Document</Form.Label>
                    <div
                        className="border p-4 rounded"
                        style={{ borderStyle: 'dashed', backgroundColor: '#f8f9fa', cursor: 'pointer' }}
                        onClick={() => document.getElementById('fileInput').click()}
                    >
                        <FaCloudUploadAlt size={40} className="mb-2" />
                        <div className='mainColor'>Drag and drop or click to select</div>
                        <Form.Control
                            type="file"
                            accept=".pdf,image/*"
                            id="fileInput"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                    {file && <div className="mt-2 text-success">Selected: {file.name}</div>}
                </Form.Group>

                <div style={{ marginTop: 30 }}>
                    {step > 1 && (
                        <Button variant="secondary" onClick={() => handleBackStep()} style={{ marginRight: 10 }}>
                            Back
                        </Button>
                    )}
                    <Button
                        onClick={() => handleNextStep(credential, index)}
                        variant={index < credentials.length ? "primary" : "success"}
                    >
                        {index < credentials.length ? "Next" : "Next & Review"}
                    </Button>
                    <Button
                        variant="outline-danger"
                        style={{ marginLeft: 10 }}
                        onClick={() => {
                            localStorage.removeItem('step');
                            window.location.reload();
                        }}
                    >
                        Cancel & Exit
                    </Button>
                </div>
            </div>
        );
    };

    const renderMandatoryReviewScreen = () => (
        <div style={{ padding: 40, textAlign: 'center' }}>
            <h4 style={{ marginBottom: 30, fontWeight: '600', color: '#4b4b4b' }}> Documents Review</h4>
            {credentials.length > 0 && (
                <>
                    <h5 style={{ marginBottom: 20, color: '#666' }}>Mandatory Credentials</h5>
                    {credentials.map((cred) => {
                        const values = formValuesHistory[cred.document_type] || {};
                        const file = uploadedFiles[cred.document_type];
                        return (
                            <Card key={cred.id} className="mb-3 text-start" style={{ borderRadius: 12 }}>
                                <Card.Body>
                                    <h6 style={{ fontWeight: 'bold', marginBottom: 10 }}>{cred.document_type}</h6>
                                    <Row className="mb-2">
                                        <Col xs={4}>
                                            <div style={{ fontWeight: 500 }}>Reference</div>
                                            <div>{values.reference || '-'}</div>
                                        </Col>
                                        <Col xs={4}>
                                            <div style={{ fontWeight: 500 }}>Issue Date</div>
                                            <div>{values.issueDate || '-'}</div>
                                        </Col>
                                        <Col xs={4} className="text-center">
                                            <FaFilePdf size={32} color='red' />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div style={{ fontWeight: 500 }}>File</div>
                                            <div>{file ? file.name : '-'}</div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </>
            )}
            <div className="mt-4">
                <Button variant="secondary" onClick={() => handleBackStep()} style={{ marginRight: 10 }}>Back</Button>
                {/* <Button variant="success" onClick={() => setStep(credentials.length + 2)}>
                        Upload & Continue
                    </Button> */}
                <Button
                    variant="success"
                    onClick={async () => {
                        try {
                            // Call your uploadDocument function first
                            await uploadDocumentFinal('mandatory', true);

                            // After successful upload, go to the next screen/step
                            setStep(credentials.length + 2);
                        } catch (error) {
                            console.error("Upload failed:", error);
                            alert("Failed to upload document. Please try again.");
                        }
                    }}
                >
                    Upload & Continue
                </Button>

            </div>
        </div>
    );

    const renderReviewScreen = () => (
        <div style={{ padding: 40, textAlign: 'center' }}>
            <h4 style={{ marginBottom: 30, fontWeight: '600', color: '#4b4b4b' }}>Credential Summary</h4>

            {/* Mandatory Credentials Section */}
            {/* {credentials.length > 0 && (
                    <>
                        <h5 style={{ marginBottom: 20, color: '#666' }}>Mandatory Credentials</h5>
                        {credentials.map((cred) => {
                            const values = formValuesHistory[cred.document_type] || {};
                            const file = uploadedFiles[cred.document_type];
                            return (
                                <Card key={cred.id} className="mb-3 text-start" style={{ borderRadius: 12 }}>
                                    <Card.Body>
                                        <h6 style={{ fontWeight: 'bold', marginBottom: 10 }}>{cred.document_type}</h6>
                                        <Row className="mb-2">
                                            <Col xs={4}>
                                                <div style={{ fontWeight: 500 }}>Reference</div>
                                                <div>{values.reference || '-'}</div>
                                            </Col>
                                            <Col xs={4}>
                                                <div style={{ fontWeight: 500 }}>Issue Date</div>
                                                <div>{values.issueDate || '-'}</div>
                                            </Col>
                                            <Col xs={4} className="text-center">
                                                <FaFilePdf size={32} />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12}>
                                                <div style={{ fontWeight: 500 }}>File</div>
                                                <div>{file ? file.name : '-'}</div>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </>
                )} */}

            {/* Optional Credentials Section */}
            {selected.length > 0 && (
                <>
                    <h5 style={{ marginTop: -15, marginBottom: 20, color: '#666' }}>Optional Credentials</h5>
                    {selected.map((credName, index) => {
                        const values = optionalFormValuesHistory[credName] || {};
                        const file = optionalUploadedFiles[credName];
                        return (
                            <Card key={`optional-${index}`} className="mb-3 text-start" style={{ borderRadius: 12 }}>
                                <Card.Body>
                                    <h6 style={{ fontWeight: 'bold', marginBottom: 10 }}>{credName}</h6>
                                    <Row className="mb-2">
                                        <Col xs={4}>
                                            <div style={{ fontWeight: 500 }}>Reference</div>
                                            <div>{values.reference || '-'}</div>
                                        </Col>
                                        <Col xs={4}>
                                            <div style={{ fontWeight: 500 }}>Issue Date</div>
                                            <div>{values.issueDate || '-'}</div>
                                        </Col>
                                        <Col xs={4} className="text-center">
                                            <FaFilePdf size={32} color='red' />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12}>
                                            <div style={{ fontWeight: 500 }}>File</div>
                                            <div>{file ? file.name : '-'}</div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </>
            )}

            <div className="mt-4">
                <Button variant="secondary" onClick={() => handleBackStep()} style={{ marginRight: 10 }}>Back</Button>
                <Button
                    variant="success"
                    onClick={async () => {
                        try {
                            // Call your uploadDocument function first
                            await uploadDocumentFinal('optional', true);

                            // After successful upload, go to the next screen/step
                            setStep(0);
                            setSelected([]);
                            setOptionalStep(0);
                            setFormValues({});
                            setFormValuesHistory({});
                            setUploadedFiles({});
                            setOptionalFormValues({});
                            setOptionalFormValuesHistory({});
                            setOptionalUploadedFiles({});
                            localStorage.removeItem('step');
                            // Navigate to the finish screen
                            navigate('/inductions-start');
                        } catch (error) {
                            console.error("Upload failed:", error);
                            alert("Failed to upload document. Please try again.");
                        }
                    }}

                >
                    Upload & Continue
                </Button>
            </div>
        </div>
    );

    const renderOptionalScreen = () => (
        <div style={{ padding: 30 }}>
            <div className="instruction">
                The following credentials are <span className="optional">optional</span>, if you would like to supply them,
                please click on the name of every credential that you are willing to supply and then click the 'Add Credentials' button.
            </div>
            <div className="credentials-grid">
                {credentialsoptional.map((item, idx) => (
                    <div
                        key={item.id}
                        className={`credential-item ${selected.includes(item.document_type) ? 'selected' : ''}`}
                        onClick={() => toggleSelection(item.document_type)}
                    >
                        <FaCheckCircle className="icon" />
                        <span>{item.document_type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                    </div>
                ))}
            </div>
            <div className="buttons mt-4">
                <Button
                    onClick={() => setStep(step + 1)}
                    disabled={selected.length === 0}
                >
                    Add {selected.length} Credentials
                </Button>
                <Button
                    variant="link"
                    onClick={() => {
                        // Navigate to the finish screen
                        navigate('/inductions-start');
                    }}
                >
                    Skip
                </Button>
            </div>
        </div>
    );

    const renderOptionalUploadStep = () => {
        const name = selected[optionalStep];
        const currentValues = optionalFormValues[name] || {};
        return (
            <div style={{ padding: 30 }}>
                <h4>{name}</h4>
                <Row className="mb-3">
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Reference</Form.Label>
                            <Form.Control
                                placeholder="e.g. REF-456"
                                value={currentValues.reference || ''}
                                onChange={(e) => handleInputChange(e, name, 'reference', true)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group>
                            <Form.Label>Issue Date</Form.Label>
                            <Form.Control
                                type="date"
                                value={currentValues.issueDate || ''}
                                onChange={(e) => handleInputChange(e, name, 'issueDate', true)}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group className="mb-3 text-center">
                    <Form.Label>Upload Document</Form.Label>
                    <div
                        className="border p-4 rounded"
                        style={{ borderStyle: 'dashed', backgroundColor: '#f8f9fa', cursor: 'pointer' }}
                        onClick={() => document.getElementById('optionalFileInput').click()}
                    >
                        <FaCloudUploadAlt size={40} className="mb-2" />
                        <div>Drag and drop or click to select</div>
                        <Form.Control
                            type="file"
                            accept=".pdf,image/*"
                            id="optionalFileInput"
                            ref={optionalFileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                    </div>
                    {file && <div className="mt-2 text-success">Selected: {file.name}</div>}
                </Form.Group>
                <div className="mt-4">
                    {optionalStep > 0 && (
                        <Button variant="secondary" onClick={() => handleBackStep(true)} className="me-2">Back</Button>
                    )}
                    <Button
                        variant="primary"
                        onClick={() => handleNextStep(null, optionalStep, true)}
                    >
                        {optionalStep + 1 < selected.length ? "Next" : "Continue"}
                    </Button>
                </div>
            </div>
        );
    };

    const renderUploadAndReviewScreen = () => (
        <div style={{ padding: 40, textAlign: 'center' }}>
            <h4 style={{ marginBottom: 20, color: "#666" }}>
                <FaFileUpload size={28} style={{ marginRight: 8 }} />
                Optional Credentials Uploaded
            </h4>
            <p style={{ color: "#666" }}>
                You have successfully uploaded all selected optional credentials.
                Click below to review all your submissions.
            </p>
            <Button
                variant="success"
                onClick={() => setStep(credentials.length + 5)} // Go to final Credential Summary
                className="mt-3"
            >
                Upload & Review
            </Button>
        </div>
    );

    return (
        <div style={{ backgroundColor: '#f0f4f8', display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <div style={{ backgroundColor: '#fff', maxWidth: '800px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)', width: '100%' }}>
                <div style={{ padding: '15px 30px', borderBottom: '1px solid #eee', textAlign: "left" }}>
                    <img src={logo} alt="Logo" style={{ height: '70px' }} />
                </div>
                <div style={{ backgroundColor: '#3a3a3a', color: '#fff', padding: '4px 30px', fontWeight: '600', textAlign: "left" }}>
                    Contractor Registration
                </div>

                {step === 0 && renderWelcomeScreen()}
                {step > 0 && step <= credentials.length && renderUploadStep(credentials[step - 1], step)}
                {step === credentials.length + 1 && renderMandatoryReviewScreen()}
                {step === credentials.length + 2 && renderOptionalScreen()}
                {step === credentials.length + 3 && optionalStep < selected.length && renderOptionalUploadStep()}
                {step === credentials.length + 4 && renderReviewScreen()}
                {/* {step === credentials.length + 5 &&  renderUploadAndReviewScreen()} */}
            </div>
        </div>
    );
};

export default InductionsCredentials;