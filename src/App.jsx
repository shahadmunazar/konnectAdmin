import React from "react";
import "./App.css"
import Login from "./Components/SuperAdmin/Login/Login";
import ForgotPassword from "./Components/SuperAdmin/Login/ForgotPassword";
import VerifyOtp from "./Components/SuperAdmin/Login/VerifyOtp";
import SuperAdminDashboard from "./Components/SuperAdminDashboard";
import OrganizationList from "./Components/SuperAdmin/OrganizationList";
import ManageOrganization from "./Components/SuperAdmin/ManageOrganization";
import SubscriptionManagement from "./Components/SuperAdmin/SubscriptionManagement";
import ViewSubscribers from "./Components/SuperAdmin/ViewSubscribers";
import EnquiryManagement from "./Components/SuperAdmin/EnquiryManagement";
import ManageCmsContents from "./Components/SuperAdmin/ManageCmsContents";
import SubAdminManagement from "./Components/SuperAdmin/SubAdminManagement";
import AccountSetting from "./Components/SuperAdmin/AccountSetting";
import ResetPassword from "../src/Components/SuperAdmin/Login/ResetPassword";
import OrganizationDashboard from "./Components/OrganizationAdmin/OrganizationDashboard";
import InviteUser from "./Components/OrganizationAdmin/InviteUser";
import ContractorPre from "./Components/OrganizationAdmin/ContractorPre";
import ContractorDetailList from "./Components/OrganizationAdmin/ContractorDetailList";
import InviteHistory from "./Components/OrganizationAdmin/InviteHistory";
import InductionInfo from "./Components/OrganizationAdmin/ContractorRegistration/InductionInfo";
import InductionsLogin from "./Components/OrganizationAdmin/ContractorRegistration/InductionsLogin";
import InductionsRegister from "./Components/OrganizationAdmin/ContractorRegistration/InductionsRegister";
import InductionsCredentials from "./Components/OrganizationAdmin/ContractorRegistration/Induction/InductionsCredentials";
import WelcomeStart from "./Components/OrganizationAdmin/ContractorRegistration/Induction/WelcomeStart";
import InductionsCoursePage from "./Components/OrganizationAdmin/ContractorRegistration/Induction/InductionsCoursePage";
import FinishInduction from "./Components/OrganizationAdmin/ContractorRegistration/Induction/FinishInduction";
import SendInduction from "./Components/OrganizationAdmin/OrgSendInduction/SendInduction";
import InductionSearch from "./Components/OrganizationAdmin/OrgSendInduction/InductionSearch";

import { Routes, Route } from "react-router-dom";
import ContractorForm from "./Components/OrganizationAdmin/ContractorForm/index";

// import axios from "axios";

// axios.defaults.baseURL = "http://localhost:8000";
// axios.defaults.baseURL = "https://api.visionlanguageexperts.in";
// axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.post["Accept"] = "application/json";

// axios.defaults.headers.get["Content-Type"] = "application/json";
// axios.defaults.headers.get["Accept"] = "application/json";

// axios.defaults.withCredentials = true;

// axios.interceptors.request.use(function (config) {
//   const token = localStorage.getItem("auth_token");
//   config.headers.Authorization = token ? `Bearer ${token}` : "";
//   // config.headers.common["X-CSRF-Token"] = token;
//   return config;
// });

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/:orgName/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/:orgName/dashboard" element={<SuperAdminDashboard />} />
        {/* <Route path="/dashboard" element={<SuperAdminDashboard />} /> */}
        <Route path="/create-org" element={<OrganizationList />} />
        <Route path="/manage-org" element={<ManageOrganization />} />
        <Route path="/manage-subs" element={<SubscriptionManagement />} />
        <Route path="/view-subscribers" element={<ViewSubscribers />} />
        <Route path="/manage-enquire" element={<EnquiryManagement />} />
        <Route path="/manage-cms" element={<ManageCmsContents />} />
        <Route path="/sub-admin-management" element={<SubAdminManagement />} />
        <Route path="/account-setting" element={<AccountSetting />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/organization-dashboard" element={<OrganizationDashboard />} />
        <Route path="/invite-user" element={<InviteUser />} />
        <Route path="/contractor/register/:token" element={<ContractorPre />} />
        <Route path="/contractor/prequalification/:token" element={<ContractorForm/>} />
        <Route path="/contractor/prequalification/:token" element={<ContractorDetailList/>} />
        <Route path="/invite-history" element={<InviteHistory/>} />
        <Route path="/induction-info/:token" element={<InductionInfo/>} />
        <Route path="/inductions-login/:token" element={<InductionsLogin/>} />
        <Route path="/inductions-register" element={<InductionsRegister/>} />
        <Route path="/inductions-credentials" element={<InductionsCredentials/>} />
        <Route path="/inductions-start" element={<WelcomeStart/>} />
        <Route path="/inductions-course-page" element={<InductionsCoursePage/>} />
        <Route path="/inductions-finish" element={<FinishInduction/>} />
        <Route path="/inductions-link" element={<SendInduction/>} />
        <Route path="/inductions-search" element={<InductionSearch/>} />
      </Routes>
    </div>
  );
}

export default App;
