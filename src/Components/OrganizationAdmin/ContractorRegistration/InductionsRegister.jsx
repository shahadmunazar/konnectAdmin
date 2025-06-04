import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';
import { FaLock } from 'react-icons/fa';
import logo from '../../../assets/logoRR.png';
import { useNavigate } from 'react-router-dom';
import PhotoUploadComponent from './PhotoUploadComponent';
import PlaceSearch from '../ContractorForm/PlaceSearch';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const InductionsRegister = () => {
    const [mobile, setMobile] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState(new Array(6).fill(""));
    const [mobiles, setMobiles] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [file, setFile] = useState(null);
    const [orgName, setOrgName] = useState('');
    const [tradeType, setTradeType] = useState('');
    const [password, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [unit, setUnit] = useState('');
    const [tradeTypes, setTradeTypes] = useState([]);
    const [countrySearch, setCountrySearch] = useState("");
    const [countryOptions, setCountryOptions] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [showOptions, setShowOptions] = useState(false);
     const [photo, setPhoto] = useState(null);
    const [errors, setErrors] = useState({});
    const [selectedTradeTypeIds, setSelectedTradeTypeIds] = useState([]);


    const navigate = useNavigate();

    const emails = localStorage.getItem('email');

    console.log("address from address:", address?.fullAddress); // Log the email for debugging

    const handleAddressSelect = (address) => {
        setAddress(address);
        setErrors((prev) => ({ ...prev, address: null })); // clear error if any
    };

    const handleConfirm = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/orginazation/verify-mobile-and-email`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ otpcode: otp.join(''), mobile_no: mobile }),
            });
            console.log("Response:", response); // Log the response for debugging
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("OTP verification response:", data); // Log the response for debugging
            if (data.status == 200) {
                localStorage.setItem('VerificationId', data?.data?.id);
                setStep(3); // Step 2: Redirect to another page
            } else {
                alert("Invalid OTP. Please try again.");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("An error occurred while verifying the OTP. Please try again.");
        }
        // navigate('/inductions-register'); // Step 2: Redirect to another page
    };

    const handleNext = async () => {
        if (!mobile) {
            alert('Please enter mobile number.');
            return;
        }

        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);

        try {
            const response = await fetch(`${BASE_URL}/api/orginazation/register-with-induction-contractor`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: emails,
                    first_name: firstName,
                    last_name: lastName,
                    mobile_no: mobile
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            if (data.status == 200) {
                setStep(2);
            } else {
                alert("Invalid OTP. Please try again.");
            }

        } catch (error) {
            console.error('Error:', error);
        }
        // Simulate sending OTP logic here if needed
        console.log('Sending OTP to:', email, mobile);
        // Show OTP screen
    };

    const handleOtpChange = (element, index) => {
        if (isNaN(element.value)) return;
        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);
        if (element.nextSibling && element.value !== "") {
            element.nextSibling.focus();
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const clearOtp = () => setOtp(new Array(6).fill(""));

    const handleSubmitFinal = async () => {
        const newErrors = {};

           const verificationId = localStorage.getItem('VerificationId');
        if (!orgName) newErrors.orgName = 'Organization name is required';
        if (!address) newErrors.address = 'Address is required';
        if (!selectedTradeTypeIds) newErrors.selectedTradeTypeIds = 'Trade type is required';
        if (!countryOptions) newErrors.countryOptions = 'Country is required';
        if (!unit) newErrors.unit = 'Unit is required';
        if (!password) newErrors.password = 'Password is required';
        // if (!file) newErrors.file = 'Profile photo is required';
         if (!photo) {
            newErrors.photo = 'Photo is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        const formData = new FormData();
        formData.append('VerificationId', verificationId);
        formData.append('userEmail', emails);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('mobile_no', mobiles);
        formData.append('organization_name', orgName);
        formData.append('address', address?.fullAddress);
        formData.append('trade_Types', selectedTradeTypeIds);
        formData.append('password', password);
        formData.append('contractor_image', photo);
        if (file) {
            formData.append('profile_photo', file);
        }

        try {
            const response = await fetch(`${BASE_URL}/api/orginazation/contractor-registration-uploading    `, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            if (result.status == 200) {
                
                navigate('/inductions-credentials'); // Replace with your desired redirect
            } else {
                alert("Submission failed.");
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert("An error occurred while submitting. Please try again.");
        }
    };


    const GetTreadeType = async () => {
        try {
            const response = await fetch(`${BASE_URL}/api/orginazation/get-all-trade-types`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTradeTypes(data.data || []);
        } catch (error) {
            console.error('Error fetching trade types:', error);
        }
    };



    useEffect(() => {
         localStorage.removeItem('step');
        GetTreadeType(); // Call the function
    }, []);



    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            fetch(`${BASE_URL}/api/get-all-countrys?search=${countrySearch}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.success) {
                        setCountryOptions(data.data);
                    }
                })
                .catch((err) => console.error("Country fetch error:", err));
        }, 300); // debounce input

        return () => clearTimeout(delayDebounce);
    }, [countrySearch]);

  const backHandle = () =>{
    navigate('/inductions-login'); 
  }

    return (
        <>
            <div style={{
                backgroundColor: '#f0f4f8',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
            }}>
                <div style={{
                    backgroundColor: '#fff',
                    width: '100%',
                    maxWidth: '800px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    overflow: 'hidden',
                    fontFamily: 'Segoe UI, sans-serif'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '15px 30px',
                        borderBottom: '1px solid #eee',
                        backgroundColor: '#ffffff'
                    }}>
                        <img src={logo} alt="Logo" style={{ height: '70px' }} />
                    </div>
                    {/* Banner */}
                    <div style={{
                        backgroundColor: '#3a3a3a',
                        color: '#fff',
                        padding: '2px 30px',
                        fontSize: '15px',
                        fontWeight: '600',
                        textAlign: 'left'
                    }}>
                        Contractor Registration
                    </div>
                    {/* Conditional Content */}
                    {step === 1 && (
                        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#fff' }}>
                            <div style={{ maxWidth: '600px', width: '100%', padding: '30px' }}>
                                <h5 style={{ marginBottom: '25px', fontWeight: '600' }}>Please enter your details</h5>
                                <Form>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ fontSize: '14px' }}>
                                            First Name
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="please enter your first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ fontSize: '14px' }}>
                                            Last Name
                                        </Form.Label>
                                        <Form.Control type="text" placeholder="please enter your last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label style={{ fontSize: '14px' }}>
                                            E-mail Address <FaLock style={{ color: '#777', marginLeft: '5px' }} />
                                        </Form.Label>
                                        <Form.Control type="email" value={emails} readOnly />
                                    </Form.Group>

                                    <Form.Group className="mb-4">
                                        <Form.Label style={{ fontSize: '14px' }}>Mobile</Form.Label>
                                        <PhoneInput
                                            country={'au'}
                                            value={mobile}
                                            onChange={setMobile}
                                            inputStyle={{
                                                width: '100%',
                                                height: '38px',
                                                borderRadius: '4px',
                                                fontSize: '14px'
                                            }}
                                            searchStyle={{
                                                fontSize: '14px'
                                            }}
                                            dropdownStyle={{
                                                fontSize: '14px'
                                            }}
                                            placeholder="Mobile"
                                            enableSearch={true}
                                        />
                                    </Form.Group>

                                    <div className="text-center mb-3">
                                        <Button
                                            style={{
                                                backgroundColor: '#50bcbc',
                                                border: 'none',
                                                padding: '8px 24px',
                                                borderRadius: '6px',
                                                fontWeight: '500'
                                            }}
                                            onClick={handleNext}
                                        >
                                            Next &rsaquo;
                                        </Button>
                                    </div>

                                    <div className="text-center">
                                        <Button
                                            variant="outline-info"
                                            style={{
                                                borderRadius: '6px',
                                                backgroundColor: '#50bcbc',
                                                color: '#fff',
                                                fontWeight: '500',
                                                padding: '8px 20px'
                                            }}
                                            onClick={backHandle}
                                        >
                                            Want to exit? Click here
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="p-4">
                            <h5 style={{ fontWeight: '600', marginBottom: '10px' }}>Enter Verification Code</h5>
                            <p style={{ fontSize: '16px', color: '#555', marginBottom: '10px', textAlign: "left" }}>
                                A code has been sent to <b>+{mobile}</b> (code expires in 30 minutes)
                                              
                            </p>

                            <div style={{
                                backgroundColor: '#eaf4fd',
                                padding: '10px 15px',
                                borderRadius: '6px',
                                marginBottom: '20px',
                                fontSize: '14px',
                                color: '#005b96'
                            }}>
                                If you do not receive this mobile, please check your sms folder.
                            </div>

                            {/* OTP Input Fields */}
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '25px' }}>
                                {otp.map((digit, idx) => (
                                    <input
                                        key={idx}
                                        type="text"
                                        maxLength="1"
                                        value={digit}
                                        onChange={e => handleOtpChange(e.target, idx)}
                                        onFocus={e => e.target.select()}
                                        style={{
                                            width: '45px',
                                            height: '55px',
                                            textAlign: 'center',
                                            fontSize: '20px',
                                            border: '1px solid #ccc',
                                            borderRadius: '8px',
                                            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Action Buttons */}
                            <div className="d-flex justify-content-center gap-3">
                                <Button variant="outline-secondary" onClick={() => setStep(1)}>Back</Button>
                                <Button variant="outline-danger" onClick={clearOtp}>Clear</Button>
                                <Button style={{ backgroundColor: '#50bcbc', border: 'none' }} onClick={handleConfirm}>Confirm</Button>
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#fff' }}>
                            <div style={{ maxWidth: '800px', width: '100%', padding: '30px' }}>
                                <h5 className="mb-4" style={{ fontWeight: '600' }}>Please enter your details</h5>
                                <Form>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>First Name</Form.Label>
                                        <Col md={6}><Form.Label>First Name</Form.Label><Form.Control type="text" value={firstName} readOnly /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>Last Name</Form.Label>
                                        <Col md={6}><Form.Label>Last Name</Form.Label><Form.Control type="text" value={lastName} readOnly /></Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>E-mail Address <FaLock style={{ color: '#777' }} required /></Form.Label>
                                        <Col sm={9}><Form.Control type="email" value={emails} readOnly /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3} >Mobile</Form.Label>
                                        <Col sm={9}><PhoneInput country={'in'} value={mobile} onChange={setMobiles} inputStyle={{ width: '100%' }} enableSearch /></Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3}>Organization Name</Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="text" placeholder="Organization Name" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
                                            {errors.orgName && <small className="text-danger">{errors.orgName}</small>}
                                        </Col>
                                    </Form.Group>
                                    <Form.Group controlId="formAddress" required >
                                        <Row className="mb-2">
                                            <Col md={3} className="mb-2">
                                                <Form.Label>Address</Form.Label>
                                            </Col>
                                            <Col md={4}>
                                                <div className="mb-3 position-relative">

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={selectedCountry ? selectedCountry.name : countrySearch}
                                                        placeholder="Search or Select Country"
                                                        onChange={(e) => {
                                                            setSelectedCountry(null);
                                                            setCountrySearch(e.target.value);
                                                            setShowOptions(true);
                                                        }}
                                                        onFocus={() => {
                                                            setShowOptions(true);
                                                        }}
                                                        onBlur={() => {
                                                            // Delay hiding to allow click selection
                                                            setTimeout(() => setShowOptions(false), 150);
                                                        }}
                                                    />

                                                    {showOptions && countryOptions.length > 0 && (
                                                        <ul
                                                            className="list-group position-absolute w-100 zindex-dropdown bg-white border"
                                                            style={{ maxHeight: 200, overflowY: "auto" }}
                                                        >
                                                            {countryOptions.map((country) => (
                                                                <li
                                                                    key={country.id}
                                                                    className="list-group-item list-group-item-action"
                                                                    style={{ cursor: "pointer" }}
                                                                    onMouseDown={() => {
                                                                        setSelectedCountry(country);
                                                                        setCountrySearch(country.name);
                                                                        setShowOptions(false);
                                                                    }}
                                                                >
                                                                    {country.name}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>


                                                {errors.country && <small className="text-danger">{errors.country}</small>}
                                            </Col>

                                            <Col md={5}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Optional unit floor etc..."
                                                    value={unit}
                                                    onChange={(e) => setUnit(e.target.value)}
                                                />
                                                {errors.unit && <small className="text-danger">{errors.unit}</small>}
                                            </Col>
                                        </Row>

                                        <Row className="mb-2">
                                            <Col md={3} className="mb-2"> <Form.Label></Form.Label></Col>
                                            <Col md={9}>
                                                <PlaceSearch onAddressSelect={handleAddressSelect} type="induction" />
                                            </Col>
                                        </Row>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3">
                                        <Form.Label column sm={3} >Trade Type</Form.Label>
                                        <Col sm={9}>
                                            <div className="mb-3">
                                                <select
                                                    className="form-select"
                                                    onChange={(e) => {
                                                        const selectedId = parseInt(e.target.value);
                                                        if (!selectedTradeTypeIds.includes(selectedId)) {
                                                            setSelectedTradeTypeIds([...selectedTradeTypeIds, selectedId]);
                                                        }
                                                        e.target.value = ""; // reset dropdown
                                                    }}
                                                >
                                                    <option value="">-- Select Trade Type --</option>
                                                    {tradeTypes.map((type) => (
                                                        <option key={type.id} value={type.id}>
                                                            {type.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                {/* Display selected items with cross icons */}
                                                <div className="mt-2 d-flex flex-wrap gap-2">
                                                    {selectedTradeTypeIds.map((id) => {
                                                        const trade = tradeTypes.find((t) => t.id === id);
                                                        return (
                                                            <span key={id} className="badge bg-primary d-flex align-items-center">
                                                                {trade?.name}
                                                                <button
                                                                    type="button"
                                                                    className="btn-close btn-close-white btn-sm ms-2"
                                                                    aria-label="Remove"
                                                                    onClick={() =>
                                                                        setSelectedTradeTypeIds(selectedTradeTypeIds.filter((i) => i !== id))
                                                                    }
                                                                ></button>
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            {errors.tradeType && <small className="text-danger">{errors.tradeType}</small>}
                                        </Col>
                                    </Form.Group>
                                    <PhotoUploadComponent value={photo}
                                        onChange={setPhoto}
                                        error={errors.photo} />
                                    <Form.Group as={Row} className="mb-4">
                                        <Form.Label column sm={3}>Password</Form.Label>
                                        <Col sm={9}>
                                            <InputGroup>
                                                <Form.Control
                                                    type={passwordVisible ? 'text' : 'password'}
                                                    placeholder="Enter a password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                {errors.password && <small className="text-danger">{errors.password}</small>}
                                                <Button variant="outline-secondary" onClick={() => setPasswordVisible(!passwordVisible)}>
                                                    {passwordVisible ? 'HIDE' : 'SHOW'}
                                                </Button>
                                            </InputGroup>
                                        </Col>
                                    </Form.Group>
                                    <div className="text-center mb-3 ">
                                        <Button style={{ backgroundColor: '#50bcbc', border: 'none', padding: '8px 24px', borderRadius: '6px', fontWeight: '500' }} onClick={handleSubmitFinal}>
                                            Continue &rsaquo;
                                        </Button>
                                         <div className="text-center mt-3">
                                        <Button
                                            variant="outline-info"
                                            style={{
                                                borderRadius: '6px',
                                                backgroundColor: '#50bcbc',
                                                color: '#fff',
                                                fontWeight: '500',
                                                padding: '8px 20px'
                                            }}
                                            onClick={backHandle}
                                        >
                                            Want to exit? Click here
                                        </Button>
                                    </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    )}
                </div>
            </div></>
    );
};

export default InductionsRegister;
