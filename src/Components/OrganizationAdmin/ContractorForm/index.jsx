import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Image } from "react-bootstrap";
import { useParams, useSearchParams } from "react-router-dom";
import logo from "../../../assets/logo.png";
import CompanyDetails from "./CompanyDetails";
import Insurance from "./Insurance";
import PublicLiability from "./PublicLiability";
import ProfessionalIndemnity from "./ProfessionalIndemnity";
import WHSForm from "./WHSForm";
import SubmissionReady from "./SubmissionReady";
import { styles } from "./styles";
import "./styles.css";
import ContractorDetailList from "../ContractorDetailList";
import { AiOutlineClose } from 'react-icons/ai';
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Validation rules for form fields
const validationRules = {
    abn: (value) => !value ? "ABN is required" : value.length !== 11 ? "ABN must be 11 digits" : "",
    companyName: (value) => !value ? "Company name is required" : "",
    tradingName: (value) => !value ? "Trading name is required" : "",
    companyStructure: (value) => !value ? "Company structure is required" : "",
    firstName: (value) => !value ? "First name is required" : "",
    lastName: (value) => !value ? "Last name is required" : "",
    position: (value) => !value ? "Position is required" : "",
    address: (value) => !value ? "Address is required" : "",
    street: (value) => !value ? "Street is required" : "",
    suburb: (value) => !value ? "Suburb is required" : "",
    state: (value) => !value ? "State is required" : "",
    postal_code: (value) => {
        if (!value) return "postal_code is required";
        if (!/^\d{4}$/.test(value)) return "postal_code must be 4 digits";
        return "";
    },
    phone: (value) => {
        if (!value) return "Phone number is required";
        if (!/^\d{10}$/.test(value)) return "Phone number must be 10 digits";
        return "";
    },
    services: (value) => !value ? "Services description is required" : "",
    employsOthers: (value) => !value ? "Please select Yes or No" : "",
    compensationFile: (value, formData) => {
        if (formData.employsOthers === "Yes" && !value) {
            return "Workers compensation insurance certificate is required";
        }
        return "";
    },
    publicLiabilityFile: (value) => !value ? "Public liability insurance certificate is required" : "",
    coverageAmount: (value) => {
        if (!value) return "Coverage amount is required";
        if (!/^\d+$/.test(value)) return "Coverage amount must be a number";
        if (parseInt(value) < 1000) return "Coverage amount must be at least $1000";
        return "";
    },
    professionalIndemnity: (value) => !value ? "Professional indemnity insurance selection is required" : "",
    work_health_safety_management_system: (value) => !value ? "Work health and safety management system is required" : "",
    is_staff_member_nominated: (value) => !value ? "Staff member nomination is required" : "",
    are_employees_provided_with_health_safety: (value) => !value ? "Employee health and safety training is required" : "",
    are_employees_appropriately_licensed_qualified_safety: (value) => !value ? "Employee licensing and qualification is required" : "",
    are_employees_confirmed_as_competent_to_undertake_work: (value) => !value ? "Employee competence confirmation is required" : "",
    do_you_all_sub_contractor_qualified_to_work: (value) => !value ? "Sub-contractor qualification is required" : "",
    do_you_all_sub_contractor_required_insurance_public_liability: (value) => !value ? "Sub-contractor insurance is required" : "",
    have_you_identified_all_health_safety_legislation: (value) => !value ? "Health and safety legislation identification is required" : "",
    do_you_have_emergency_response: (value) => !value ? "Emergency response arrangements is required" : "",
    do_you_have_procedures_to_notify_the_applicable: (value) => !value ? "Procedures for notifying regulator is required" : "",
    do_you_have_SWMS_JSAS_or_safe_work: (value) => !value ? "SWMS, JSAs or Safe Work Procedures is required" : "",
    provide_name_position_mobile_no: (value, formData) => {
        if (formData.is_staff_member_nominated === "Yes" && !value) {
            return "Please provide name, position and mobile number";
        }
        return "";
    },
    q21File: (value, formData) => {
        if (formData.work_health_safety_management_system === "Yes" && !value) {
            return "Please upload your organisation's safety policy";
        }
        return "";
    }
};

const ContractorForm = () => {
    const { token } = useParams();
    const [reviewing, setReviewing] = useState(false);
    const [searchParams] = useSearchParams();
    const employsOthersParam = searchParams.get('employsOthers');
    const id = localStorage.getItem("id");
    const invited_organization_by = localStorage.getItem("invited_organization_by");
    const contractor_invitation_id = localStorage.getItem("contractor_invitation_id");

    console.log("ID:", id);
    console.log("Invited Organization By:", invited_organization_by);
    console.log("Contractor Invitation ID:", contractor_invitation_id);

    // Get initial step and form data from localStorage or use defaults
    const [currentStep, setCurrentStep] = useState(() => {
        const savedStep = localStorage.getItem('contractorFormStep');
        return savedStep ? parseInt(savedStep) : 1;
    });

    const [formData, setFormData] = useState(() => {
        const savedFormData = localStorage.getItem('contractorFormData');
        return savedFormData ? JSON.parse(savedFormData) : {
            // Company Details (Step 1)
            abn: "",
            companyName: "",
            tradingName: "",
            companyStructure: "",
            firstName: "",
            lastName: "",
            position: "",
            address: "",
            street: "",
            suburb: "",
            state: "",
            postal_code: "",
            phone: "",
            services: "",
            // Insurance Details (Step 2)
            employsOthers: employsOthersParam || "",
            compensationFile: null,
            // Public Liability Insurance (Step 3)
            publicLiabilityFile: null,
            coverageAmount: "",
            // Professional Indemnity (Step 4)
            professionalIndemnity: "",
            // WHS Form Data (Step 5)
            work_health_safety_management_system: "",
            is_staff_member_nominated: "",
            are_employees_provided_with_health_safety: "",
            are_employees_appropriately_licensed_qualified_safety: "",
            are_employees_confirmed_as_competent_to_undertake_work: "",
            do_you_all_sub_contractor_qualified_to_work: "",
            do_you_all_sub_contractor_required_insurance_public_liability: "",
            have_you_identified_all_health_safety_legislation: "",
            do_you_have_emergency_response: "",
            do_you_have_procedures_to_notify_the_applicable: "",
            do_you_have_SWMS_JSAS_or_safe_work: "",
            // Additional fields
            contractor_invitation_id: contractor_invitation_id,
            // id: id,
            invited_organization_by: invited_organization_by
        };
    });

    const [touched, setTouched] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [copyCompanyName, setCopyCompanyName] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [endDate, setEndDate] = useState(null);
    const [uploadedFileName, setUploadedFileName] = useState("");
    const [uploadedFileSize, setUploadedFileSize] = useState("");
    const [liabilityEndDate, setLiabilityEndDate] = useState(null);
    const [liabilityFileName, setLiabilityFileName] = useState("");
    const [liabilityFileSize, setLiabilityFileSize] = useState("");
    const [showLiabilityUploadModal, setShowLiabilityUploadModal] = useState(false);
    const [whsFormData, setWhsFormData] = useState({
        work_health_safety_management_system: "",
        is_staff_member_nominated: "",
        are_employees_provided_with_health_safety: "",
        are_employees_appropriately_licensed_qualified_safety: "",
        are_employees_confirmed_as_competent_to_undertake_work: "",
        do_you_all_sub_contractor_qualified_to_work: "",
        do_you_all_sub_contractor_required_insurance_public_liability: "",
        have_you_identified_all_health_safety_legislation: "",
        do_you_have_emergency_response: "",
        do_you_have_procedures_to_notify_the_applicable: "",
        do_you_have_SWMS_JSAS_or_safe_work: "",
        provide_name_position_mobile_no: "",
        q21File: null
    });
    // Add state to track if submission is finalized
    const [isFinalSubmitted, setIsFinalSubmitted] = useState(false);
    // Add state for PDF URL if returned by API
    const [pdfUrl, setPdfUrl] = useState("");
    // Persist showZeroStep in localStorage
    const [showZeroStep, setShowZeroStep] = useState(() => {
        const stored = localStorage.getItem('showZeroStep');
        return stored === null ? true : stored === 'true';
    });

    // Save current step to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('contractorFormStep', currentStep.toString());
    }, [currentStep]);

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        const formDataToSave = { ...formData };
        if (formDataToSave.compensationFile) {
            formDataToSave.compensationFileName = formData.compensationFile.name;
            delete formDataToSave.compensationFile;
        }
        if (formDataToSave.publicLiabilityFile) {
            formDataToSave.publicLiabilityFileName = formData.publicLiabilityFile.name;
            delete formDataToSave.publicLiabilityFile;
        }
        localStorage.setItem('contractorFormData', JSON.stringify(formDataToSave));
    }, [formData]);

    // Update form data when URL parameter changes
    useEffect(() => {
        if (employsOthersParam) {
            setFormData(prev => ({
                ...prev,
                employsOthers: employsOthersParam
            }));
        }
    }, [employsOthersParam]);

    // Add the styles to the document
    useEffect(() => {
        const styleElement = document.createElement('style');
        styleElement.innerHTML = styles;
        document.head.appendChild(styleElement);
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    // Clear localStorage when form is submitted successfully
    const clearStoredData = () => {
        localStorage.removeItem('contractorFormStep');
        localStorage.removeItem('contractorFormData');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
    };

    const handleCopyCompanyName = () => {
        if (!copyCompanyName) {
            setFormData(prev => ({ ...prev, tradingName: prev.companyName }));
        } else {
            setFormData(prev => ({ ...prev, tradingName: "" }));
        }
        setCopyCompanyName(!copyCompanyName);
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                setError("Please upload a PDF, JPEG, or PNG file");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError("File size should be less than 5MB");
                return;
            }
            setFormData(prev => ({ ...prev, compensationFile: file }));
            setUploadedFileName(file.name);
            setUploadedFileSize(Math.round(file.size / 1024) + " KB");
            setError("");
        }
    };

    const handleRemoveFile = () => {
        setFormData(prev => ({ ...prev, compensationFile: null }));
        setUploadedFileName("");
        setUploadedFileSize("");
    };

    const handleViewFile = () => {
        if (formData.compensationFile) {
            // Create a copy of the file to avoid any reference issues
            const fileBlob = new Blob([formData.compensationFile], { type: formData.compensationFile.type });
            const fileUrl = URL.createObjectURL(fileBlob);
            window.open(fileUrl, '_blank');
            // Clean up the URL object after opening
            setTimeout(() => URL.revokeObjectURL(fileUrl), 100);
        }
    };

    const handleUploadModalSubmit = async (data = null) => {
        // If data is provided, it means it's coming from "No" selection
        if (data && data.employsOthers === "No") {
            setCurrentStep(3);
            return;
        }
        // Original logic for "Yes" case with file upload
        if (!formData.compensationFile || !endDate) {
            setError("Please select both a file and expiry date");
            return false;
        }

        try {
            setLoading(true);
            setError("");

            const formDataToSend = new FormData();
            formDataToSend.append('contractor_insurance', formData.compensationFile);
            formDataToSend.append('contractor_id', id);
            formDataToSend.append('end_date', endDate.toISOString().split('T')[0]);
            formDataToSend.append('employs_others', 'Yes');

            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/api/orginazation/upload-insurace-contractor`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formDataToSend
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }

            const data = await response.json();
            if (data.status === 200) {
                setSuccess("Insurance details saved successfully!");
                setShowUploadModal(false);
                setCurrentStep(3);
                return true;
            } else {
                throw new Error(data.message || 'Failed to save insurance details');
            }
        } catch (error) {
            setError(error.message || "Error uploading insurance");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const shouldShowError = (fieldName) => {
        if (!validationRules[fieldName]) return false;
        return (touched[fieldName] || isSubmitted) ? validationRules[fieldName](formData[fieldName], formData) : "";
    };

    const handleSaveAsDraft = () => {
        setSuccess("Form progress saved as draft");
    };

    const handleMainMenu = () => {
        setShowZeroStep(true);
        localStorage.setItem('showZeroStep', 'true');
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFinalSubmit = async () => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${BASE_URL}/api/orginazation/create-registration-contractor`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id,
                    submission_status: 'confirm_submit',
                    invited_organization_by: invited_organization_by,
                    contractor_invitation_id: contractor_invitation_id
                })
            });
            const data = await response.json();
            if (response.ok && data.status === 200) {
                setSuccess("Your submission has been confirmed! You will receive a PDF copy via email.");
                 setShowZeroStep(true);
            localStorage.setItem('showZeroStep', 'true');
                clearStoredData();
                setIsFinalSubmitted(true);
                // If API returns a PDF URL, save it
                if (data.pdf_url) setPdfUrl(data.pdf_url);
            } else {
                console.log("Final submission error@@@@:", data.message);
                throw new Error(data.message || 'Submission failed');

            }
        } catch (error) {
            console.log("Final submission error@@@@@@:", error);
            setError(error.message || "Error submitting form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Prevent going back after final submit
    const handleReview = () => {
        setReviewing(true);
    };

    // Save and exit handler
    const handleSaveAndExit = () => {
        setTimeout(() => {
            setShowZeroStep(true);
            localStorage.setItem('showZeroStep', 'true');
        }, 500);
    };

    // Handler to start a new form or continue existing form
    const handleStartNewForm = (formParams = {}) => {
        setShowZeroStep(false);
        localStorage.setItem('showZeroStep', 'false');
        console.log("Form Params:222", formParams);

        if (formParams.isNewForm) {
            // Clear form data and step from localStorage for new form
            localStorage.removeItem('contractorFormStep');
            localStorage.removeItem('contractorFormData');
            // Reset all relevant state for a blank form
            setCurrentStep(1);
            setFormData({
                new_start: true, // Set new_start to true for new form
                abn: "",
                companyName: "",
                tradingName: "",
                companyStructure: "",
                firstName: "",
                lastName: "",
                position: "",
                address: "",
                street: "",
                suburb: "",
                state: "",
                postal_code: "",
                phone: "",
                services: "",
                employsOthers: "",
                compensationFile: null,
                publicLiabilityFile: null,
                coverageAmount: "",
                professionalIndemnity: "",
                work_health_safety_management_system: "",
                is_staff_member_nominated: "",
                are_employees_provided_with_health_safety: "",
                are_employees_appropriately_licensed_qualified_safety: "",
                are_employees_confirmed_as_competent_to_undertake_work: "",
                do_you_all_sub_contractor_qualified_to_work: "",
                do_you_all_sub_contractor_required_insurance_public_liability: "",
                have_you_identified_all_health_safety_legislation: "",
                do_you_have_emergency_response: "",
                do_you_have_procedures_to_notify_the_applicable: "",
                do_you_have_SWMS_JSAS_or_safe_work: "",
                contractor_invitation_id: contractor_invitation_id,
                invited_organization_by: invited_organization_by
            });
            setTouched({});
            setIsSubmitted(false);
            setCopyCompanyName(false);
        } else {
            // Continue existing form
            const { contractorId, incompletePage, contractorData } = formParams;
            console.log("Form Params2222222:", contractorData);
            // Set the current step to the incomplete page
            setCurrentStep(incompletePage);
            localStorage.setItem('contractorFormStep', incompletePage.toString());

            // Update form data with existing contractor data
            setFormData(prev => ({
                ...prev,
                new_start: false, // Set new_start to false for existing form
                id: contractorData.id || "",
                abn: contractorData.abn_number || "",
                companyName: contractorData.contractor_company_name || "",
                tradingName: contractorData.contractor_trading_name || "",
                companyStructure: contractorData.company_structure || "",
                firstName: contractorData.company_representative_first_name || "",
                lastName: contractorData.company_representative_last_name || "",
                position: contractorData.position_at_company || "",
                address: contractorData.address || "",
                street: contractorData.street || "",
                suburb: contractorData.suburb || "",
                state: contractorData.state || "",
                postal_code: contractorData.postal_code || "",
                phone: contractorData.contractor_phone_number || "",
                services: contractorData.service_to_be_provided || "",
                employsOthers: contractorData.employs_others || "",
                coverageAmount: contractorData.covered_amount || "",
                professionalIndemnity: contractorData.have_professional_indemnity_insurance || "",
                work_health_safety_management_system: contractorData.work_health_safety_management_system || "",
                is_staff_member_nominated: contractorData.is_staff_member_nominated || "",
                are_employees_provided_with_health_safety: contractorData.are_employees_provided_with_health_safety || "",
                are_employees_appropriately_licensed_qualified_safety: contractorData.are_employees_appropriately_licensed_qualified_safety || "",
                are_employees_confirmed_as_competent_to_undertake_work: contractorData.are_employees_confirmed_as_competent_to_undertake_work || "",
                do_you_all_sub_contractor_qualified_to_work: contractorData.do_you_all_sub_contractor_qualified_to_work || "",
                do_you_all_sub_contractor_required_insurance_public_liability: contractorData.do_you_all_sub_contractor_required_insurance_public_liability || "",
                have_you_identified_all_health_safety_legislation: contractorData.have_you_identified_all_health_safety_legislation || "",
                do_you_have_emergency_response: contractorData.do_you_have_emergency_response || "",
                do_you_have_procedures_to_notify_the_applicable: contractorData.do_you_have_procedures_to_notify_the_applicable || "",
                do_you_have_SWMS_JSAS_or_safe_work: contractorData.do_you_have_SWMS_JSAS_or_safe_work || "",
                contractor_invitation_id: contractorData.contractor_invitation_id || contractor_invitation_id,
                invited_organization_by: contractorData.invited_organization_by || invited_organization_by
            }));

            // Store the contractor ID for future API calls
            localStorage.setItem('current_contractor_id', contractorId);
        }
    };

    const handleNext = async () => {
        setIsSubmitted(true);

        // Validate current step
        let hasErrors = false;
        const fieldsToValidate = {
            1: ['abn', 'companyName', 'tradingName', 'companyStructure', 'firstName', 'lastName',
                'position', 'address', 'street', 'suburb', 'state', 'postal_code', 'phone', 'services'],
            2: ['employsOthers'],
            3: ['publicLiabilityFile', 'coverageAmount'],
            4: ['professionalIndemnity'],
            5: [
                'work_health_safety_management_system',
                'is_staff_member_nominated',
                'are_employees_provided_with_health_safety',
                'are_employees_appropriately_licensed_qualified_safety',
                'are_employees_confirmed_as_competent_to_undertake_work',
                'do_you_all_sub_contractor_qualified_to_work',
                'do_you_all_sub_contractor_required_insurance_public_liability',
                'have_you_identified_all_health_safety_legislation',
                'do_you_have_emergency_response',
                'do_you_have_procedures_to_notify_the_applicable',
                'do_you_have_SWMS_JSAS_or_safe_work',
                'provide_name_position_mobile_no',
                'q21File'
            ]
        };

        // Check for errors in the current step's fields
        fieldsToValidate[currentStep].forEach(field => {
            const error = validationRules[field](currentStep === 5 ? whsFormData[field] : formData[field], currentStep === 5 ? whsFormData : formData);
            if (error) {
                hasErrors = true;
                setTouched(prev => ({ ...prev, [field]: true }));
            }
        });

        if (hasErrors) {
            setError("Please fill in all required fields before proceeding.");
            return;
        }

        // Clear any previous errors
        setError("");

        try {
            setLoading(true);

            // Different endpoints for different steps
            const endpoints = {
                1: '/api/orginazation/create-registration-contractor',
                2: '/api/orginazation/upload-insurace-contractor',
                3: '/api/orginazation/upload-public-liability',
                4: '/api/orginazation/create-registration-contractor',
                5: '/api/orginazation/create-registration-contractor'
            };

            // Get the auth token from localStorage
            const token = localStorage.getItem('token');
            console.log("Auth token:", token);

            let requestBody;
            let headers = {
                'Authorization': `Bearer ${token}`
            };

            if (currentStep === 1) {
                // Company details payload
                requestBody = {
                    abn_number: formData.abn,
                    contractor_company_name: formData.companyName,
                    contractor_trading_name: formData.tradingName,
                    company_structure: formData.companyStructure,
                    company_representative_first_name: formData.firstName,
                    company_representative_last_name: formData.lastName,
                    position_at_company: formData.position,
                    address: formData.address,
                    street: formData.street,
                    suburb: formData.suburb,
                    postal_code: formData.postal_code,
                    state: formData.state,
                    contractor_phone_number: formData.phone,
                    service_to_be_provided: formData.services,
                    contractor_invitation_id: contractor_invitation_id,
                    invited_organization_by: invited_organization_by,
                    new_start: formData.new_start,
                    id: formData.id
                };
                headers['Content-Type'] = 'application/json';
            } else if (currentStep === 2) {
                console.log("Employs others:", formData.employsOthers);
                // Insurance step
                if (formData.employsOthers === "No") {
                    setCurrentStep(3);
                    return;
                }
                requestBody = new FormData();
                requestBody.append('contractor_insurance', formData.compensationFile || new File([""], "empty.txt", { type: "text/plain" }));
                requestBody.append('end_date', endDate ? endDate.toISOString().split('T')[0] : '');
                requestBody.append('contractor_id', id);
                requestBody.append('employs_others', formData.employsOthers);
            } else if (currentStep === 3) {
                // Public liability step
                requestBody = new FormData();
                requestBody.append('contractor_liability', formData.publicLiabilityFile);
                requestBody.append('end_date', liabilityEndDate ? liabilityEndDate.toISOString().split('T')[0] : '');
                requestBody.append('contractor_id', id);
                requestBody.append('covered_amount', formData.coverageAmount);
            } else if (currentStep === 4) {
                // Professional Indemnity step
                let value = null;
                if (formData.professionalIndemnity === "Yes") value = 'Yes';
                else if (formData.professionalIndemnity === "No") value = 'No';
                else if (formData.professionalIndemnity === "N/A") value = "N/A";

                requestBody = {
                    have_professional_indemnity_insurance: value,
                    contractor_invitation_id: contractor_invitation_id,
                    id: id,
                    invited_organization_by: invited_organization_by
                };
                headers['Content-Type'] = 'application/json';
            } else if (currentStep === 5) {
                // WHS step
                requestBody = {
                    work_health_safety_management_system: whsFormData.work_health_safety_management_system,
                    is_staff_member_nominated: whsFormData.is_staff_member_nominated,
                    are_employees_provided_with_health_safety: whsFormData.are_employees_provided_with_health_safety,
                    are_employees_appropriately_licensed_qualified_safety: whsFormData.are_employees_appropriately_licensed_qualified_safety,
                    are_employees_confirmed_as_competent_to_undertake_work: whsFormData.are_employees_confirmed_as_competent_to_undertake_work,
                    do_you_all_sub_contractor_qualified_to_work: whsFormData.do_you_all_sub_contractor_qualified_to_work,
                    do_you_all_sub_contractor_required_insurance_public_liability: whsFormData.do_you_all_sub_contractor_required_insurance_public_liability,
                    have_you_identified_all_health_safety_legislation: whsFormData.have_you_identified_all_health_safety_legislation,
                    do_you_have_emergency_response: whsFormData.do_you_have_emergency_response,
                    do_you_have_procedures_to_notify_the_applicable: whsFormData.do_you_have_procedures_to_notify_the_applicable,
                    do_you_have_SWMS_JSAS_or_safe_work: whsFormData.do_you_have_SWMS_JSAS_or_safe_work,
                    provide_name_position_mobile_no: whsFormData.provide_name_position_mobile_no,
                    q21File: whsFormData.q21File,
                    contractor_invitation_id: contractor_invitation_id,
                    id: id,
                    invited_organization_by: invited_organization_by
                };
                headers['Content-Type'] = 'application/json';
            }

            console.log("Request body:", requestBody instanceof FormData ? Object.fromEntries(requestBody.entries()) : requestBody);

            const response = await fetch(`${BASE_URL}${endpoints[currentStep]}`, {
                method: 'POST',
                headers: headers,
                body: headers['Content-Type'] === 'application/json' ? JSON.stringify(requestBody) : requestBody
            });

            console.log("API Response status:", response.status);
            const data = await response.json();
            if (currentStep === 1) {
                localStorage.setItem("id", data.data.id);
            }

            console.log("API Response data:", data.data.id);

            if (response.ok && data.status === 200) {
                if (currentStep < 5) {
                    // Move to next step
                    setCurrentStep(currentStep + 1);
                    setSuccess("Progress saved successfully!");
                    setTimeout(() => {
                        setSuccess(""); // Clear success message after 3 seconds
                    }, 3000);
                } else if (currentStep === 5) {
                    // After WHSForm, go to SubmissionReady step
                    setCurrentStep(6);
                    setSuccess("");
                } else {
                    // Final step submission successful
                    setSuccess("Form submitted successfully!");
                    clearStoredData(); // Clear localStorage
                }
            } else {
                console.error("Submission error:", data.message);
                throw new Error(data.message || 'Submission failed');
            }
        } catch (error) {
            console.error("Submission error:", error.message);
            setError(error.message || "Error submitting form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleLiabilityFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];
            if (!validTypes.includes(file.type)) {
                setError("Please upload a PDF, JPEG, or PNG file");
                return;
            }
            if (file.size > 5 * 1024 * 1024) {
                setError("File size should be less than 5MB");
                return;
            }
            setFormData(prev => ({ ...prev, publicLiabilityFile: file }));
            setLiabilityFileName(file.name);
            setLiabilityFileSize(Math.round(file.size / 1024) + " KB");
            setError("");
        }
    };

    const handleLiabilityRemoveFile = () => {
        setFormData(prev => ({ ...prev, publicLiabilityFile: null }));
        setLiabilityFileName("");
        setLiabilityFileSize("");
        setLiabilityEndDate(null);
    };

    const handleLiabilityViewFile = () => {
        if (formData.publicLiabilityFile) {
            const fileBlob = new Blob([formData.publicLiabilityFile], { type: formData.publicLiabilityFile.type });
            const fileUrl = URL.createObjectURL(fileBlob);
            window.open(fileUrl, '_blank');
            setTimeout(() => URL.revokeObjectURL(fileUrl), 100);
        }
    };

    const renderStepIndicator = () => {
        return (
            <div className="d-flex justify-content-center align-items-center mb-4">
                <div className="d-flex align-items-center">
                    <div className={`rounded-circle d-flex align-items-center justify-content-center ${currentStep >= 1 ? 'bg-primary' : 'bg-secondary'}`}
                        style={{ width: '30px', height: '30px', color: 'white' }}>
                        1
                    </div>
                    <div className="mx-2" style={{ height: '2px', width: '50px', backgroundColor: currentStep >= 2 ? '#00a7b5' : '#dee2e6' }}></div>
                    <div className={`rounded-circle d-flex align-items-center justify-content-center ${currentStep >= 2 ? 'bg-primary' : 'bg-secondary'}`}
                        style={{ width: '30px', height: '30px', color: 'white' }}>
                        2
                    </div>
                    <div className="mx-2" style={{ height: '2px', width: '50px', backgroundColor: currentStep >= 3 ? '#00a7b5' : '#dee2e6' }}></div>
                    <div className={`rounded-circle d-flex align-items-center justify-content-center ${currentStep >= 3 ? 'bg-primary' : 'bg-secondary'}`}
                        style={{ width: '30px', height: '30px', color: 'white' }}>
                        3
                    </div>
                    <div className="mx-2" style={{ height: '2px', width: '50px', backgroundColor: currentStep >= 4 ? '#00a7b5' : '#dee2e6' }}></div>
                    <div className={`rounded-circle d-flex align-items-center justify-content-center ${currentStep >= 4 ? 'bg-primary' : 'bg-secondary'}`}
                        style={{ width: '30px', height: '30px', color: 'white' }}>
                        4
                    </div>
                    <div className="mx-2" style={{ height: '2px', width: '50px', backgroundColor: currentStep >= 5 ? '#00a7b5' : '#dee2e6' }}></div>
                    <div className={`rounded-circle d-flex align-items-center justify-content-center ${currentStep >= 5 ? 'bg-primary' : 'bg-secondary'}`}
                        style={{ width: '30px', height: '30px', color: 'white' }}>
                        5
                    </div>
                    <div className="mx-2" style={{ height: '2px', width: '50px', backgroundColor: currentStep >= 6 ? '#00a7b5' : '#dee2e6' }}></div>
                    <div className={`rounded-circle d-flex align-items-center justify-content-center ${currentStep >= 6 ? 'bg-primary' : 'bg-secondary'}`}
                        style={{ width: '30px', height: '30px', color: 'white' }}>
                        6
                    </div>
                </div>
            </div>
        );
    };

    if (showZeroStep) {
        return <ContractorDetailList onStartNewForm={handleStartNewForm} />;
    }

    return (
        <div style={{ backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "2rem 0" }}>
            <Container>
                <div className="bg-white p-5 rounded-3 shadow-sm">
                    <Row className="align-items-center mb-4">
                        <Col md={8} className="text-md-start">
                            <h3 className="fw-medium text-secondary">
                                Contractor Pre-qualification Questionnaire
                            </h3>
                        </Col>
                        <Col md={4} className="text-md-end text-center mt-3 mt-md-0">
                            <img
                                src={logo}
                                alt="Logo"
                                className="img-fluid"
                                style={{ maxHeight: "150px", maxWidth: "150px" }}
                            />
                        </Col>
                    </Row>
                    <hr />
                    {renderStepIndicator()}
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    <Form noValidate>
                        <div style={{
                            backgroundColor: '#fff',
                            border: '1px solid #e0e0e0',
                            borderRadius: '8px',
                            padding: '2rem',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
                        }}>
                            {currentStep === 1 && (
                                <CompanyDetails
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    handleBlur={handleBlur}
                                    shouldShowError={shouldShowError}
                                    copyCompanyName={copyCompanyName}
                                    handleCopyCompanyName={handleCopyCompanyName}
                                />
                            )}

                            {currentStep === 2 && (
                                <Insurance
                                    formData={formData}
                                    setFormData={setFormData}
                                    shouldShowError={shouldShowError}
                                    setTouched={setTouched}
                                    showUploadModal={showUploadModal}
                                    setShowUploadModal={setShowUploadModal}
                                    endDate={endDate}
                                    setEndDate={setEndDate}
                                    handleFileUpload={handleFileUpload}
                                    handleUploadModalSubmit={handleUploadModalSubmit}
                                    loading={loading}
                                    uploadedFileName={uploadedFileName}
                                    uploadedFileSize={uploadedFileSize}
                                    handleViewFile={handleViewFile}
                                    handleRemoveFile={handleRemoveFile}
                                    setCurrentStep={setCurrentStep}
                                />
                            )}

                            {currentStep === 3 && (
                                <PublicLiability
                                    formData={formData}
                                    setFormData={setFormData}
                                    shouldShowError={shouldShowError}
                                    setTouched={setTouched}
                                    handleFileUpload={handleLiabilityFileUpload}
                                    uploadedFileName={liabilityFileName}
                                    uploadedFileSize={liabilityFileSize}
                                    handleViewFile={handleLiabilityViewFile}
                                    handleRemoveFile={handleLiabilityRemoveFile}
                                    showUploadModal={showLiabilityUploadModal}
                                    setShowUploadModal={setShowLiabilityUploadModal}
                                    liabilityEndDate={liabilityEndDate}
                                    setLiabilityEndDate={setLiabilityEndDate}
                                    loading={loading}
                                />
                            )}

                            {currentStep === 4 && (
                                <ProfessionalIndemnity
                                    value={formData.professionalIndemnity}
                                    setValue={(value) => setFormData(prev => ({ ...prev, professionalIndemnity: value }))}
                                    error={shouldShowError('professionalIndemnity')}
                                />
                            )}

                            {currentStep === 5 && (
                                <WHSForm
                                    formData={whsFormData}
                                    setFormData={setWhsFormData}
                                    handleBack={handleBack}
                                    handleNext={handleNext}
                                    handleSaveAsDraft={handleSaveAsDraft}
                                    handleMainMenu={handleMainMenu}
                                />
                            )}
                            {currentStep === 6 && (
                                <>
                                    {/* Show a summary of answers before final submit */}
                                    {reviewing && (
                                        <div style={{ marginBottom: 32, position: 'relative' }}>
                                            <AiOutlineClose
                                                onClick={() => setReviewing(false)}
                                                style={{
                                                    position: 'absolute',
                                                    top: 10,
                                                    right: 10,
                                                    cursor: 'pointer',
                                                    fontSize: 30,
                                                    color: '#dc3545',
                                                }}
                                            />
                                            <h4 style={{ color: '#4ecdc4', fontWeight: 600 }}>Summary of Your Answers</h4>
                                            <div style={{ background: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: 8, padding: 24, margin: '16px 0' }}>
                                                <pre style={{ fontSize: 15, color: '#444', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{JSON.stringify({ ...formData, ...whsFormData }, null, 2)}</pre>
                                            </div>
                                        </div>
                                    )}

                                    <SubmissionReady
                                        userName={formData.companyName}
                                        onSubmit={handleFinalSubmit}
                                        onReview={handleReview}
                                        onSave={handleSaveAndExit}
                                        disableSubmit={loading || isFinalSubmitted}
                                    />
                                    {/* Show PDF download link if available */}
                                    {pdfUrl && (
                                        <div className="mt-3 text-center">
                                            <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline-success">Download PDF Copy</a>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* Navigation Buttons: Hide on step 6 or after final submit */}
                            {currentStep !== 6 && !isFinalSubmitted && (
                                <div className="navigation-buttons">
                                    <div className="left-buttons">
                                        {currentStep === 1 ? "" : <button type="button" className="btn-draft" disabled={loading || currentStep === 1} onClick={handleSaveAsDraft}>Save as Draft</button>}
                                        <button type="button" className="btn-next" onClick={handleMainMenu}>Main Menu</button>
                                    </div>
                                    <div className="right-buttons">
                                        {currentStep === 1 ? "" :
                                            <button
                                                type="button"
                                                className="btn-back"
                                                onClick={handleBack}
                                                disabled={loading || currentStep === 1}
                                            >
                                                Back
                                            </button>}
                                        <button
                                            type="button"
                                            className="btn-next"
                                            onClick={handleNext}
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Loading...
                                                </>
                                            ) : "Next"}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Completion Message: Hide on step 6 */}
                            {currentStep === 5 && success && success.includes("submitted successfully") && (
                                <div className="mt-4 text-center">
                                    <div className="alert alert-success">
                                        <h4 className="alert-heading">Thank you!</h4>
                                        <p>Your contractor pre-qualification questionnaire has been submitted successfully.</p>
                                        <hr />
                                        <p className="mb-0">You will receive an email confirmation shortly.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Form>
                </div>
            </Container>
        </div>
    );
};

export default ContractorForm;