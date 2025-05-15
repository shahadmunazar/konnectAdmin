// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import swal from "sweetalert2";
// import axios from "axios";

// export default function Login() {
//     const navigate = useNavigate();
//     const [loginInput, setLoginInput] = useState(""); // username or email
//     const [password, setPassword] = useState("");
//     const [remember, setRemember] = useState(false);
//     const [errors, setErrors] = useState({});
//     const [message, setMessage] = useState("");
//     const [loading, setLoading] = useState(false);

//     // ✅ Smart validation based on input type (email or username)
//     const validate = () => {
//         const newErrors = {};
//         const isEmail = loginInput.includes("@");

//         const emailRegex = /^\S+@\S+\.\S+$/;
//         const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;
//         const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

//         if (!loginInput) {
//             newErrors.login = ["Username or email is required."];
//         } else if (isEmail && !emailRegex.test(loginInput)) {
//             newErrors.login = ["Please enter a valid email address."];
//         } else if (!isEmail && !usernameRegex.test(loginInput)) {
//             newErrors.login = ["Username must be at least 3 characters and alphanumeric."];
//         }

//         if (!passwordRegex.test(password)) {
//             newErrors.password = [
//                 "Password must be at least 8 characters, include one number and one special character.",
//             ];
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const makeRequest = async (e) => {
//         e.preventDefault();
//         setErrors({});
//         setMessage("");

//         if (!validate()) return;

//         try {
//             setLoading(true);
//             await axios.get("/sanctum/csrf-cookie");

//             const payload = {
//                 email: loginInput, // backend should accept email or username
//                 password,
//                 remember,
//             };

//             localStorage.setItem("email", loginInput);

//             const response = await axios.post(`${BASE_URL}/api/login`, payload, {
//                 headers: { Accept: "application/json" },
//             });

//             if (response.data.status === 200) {
//                 swal.fire("Login Successful", "Please verify the OTP sent to your email.", "success");
//                 navigate("/verify-otp");
//             }
//         } catch (error) {
//             setErrors(error.response?.data?.errors || {});
//             setMessage(error.response?.data?.message || "Invalid credentials or server error.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container d-flex align-items-center justify-content-center min-vh-100">
//             <div className="card shadow w-100" style={{ maxWidth: 500 }}>
//                 <div className="card-body">
//                     <h3 className="card-title text-center mb-4">Super Admin Login</h3>

//                     {message && <div className="alert alert-danger">{message}</div>}

//                     <form onSubmit={makeRequest} noValidate>
//                         <div className="mb-3">
//                             <label className="form-label">Username or Email Address</label>
//                             <input
//                                 type="text"
//                                 className={`form-control ${errors.login ? "is-invalid" : ""}`}
//                                 value={loginInput}
//                                 onChange={(e) => setLoginInput(e.target.value)}
//                                 required
//                             />
//                             {errors.login && <div className="invalid-feedback">{errors.login[0]}</div>}
//                         </div>

//                         <div className="mb-3">
//                             <label className="form-label">Password</label>
//                             <input
//                                 type="password"
//                                 className={`form-control ${errors.password ? "is-invalid" : ""}`}
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 required
//                             />
//                             {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
//                         </div>

//                         <div className="form-check mb-3">
//                             <input
//                                 type="checkbox"
//                                 className="form-check-input"
//                                 checked={remember}
//                                 onChange={(e) => setRemember(e.target.checked)}
//                             />
//                             <label className="form-check-label">Remember me</label>
//                         </div>

//                         <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//                             {loading ? (
//                                 <>
//                                     <span className="spinner-border spinner-border-sm me-2" role="status" />
//                                     Logging in...
//                                 </>
//                             ) : (
//                                 "Login"
//                             )}
//                         </button>

//                         <div className="text-end mt-2">
//                             <button
//                                 type="button"
//                                 className="btn btn-link p-0"
//                                 onClick={() => navigate("/forgot-password")}
//                             >
//                                 Forgot Password?
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "../../../assets/KonnectBlack.png";
import VerifyOtp from "./VerifyOtp";
import ForgotPassword from "./ForgotPassword";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
    const navigate = useNavigate();
    const [loginInput, setLoginInput] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [signIn, setSignIn] = useState(false);
    const [forgot, setForgot] = useState(false);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

   console.log("BASE_URL",BASE_URL);

    const validate = () => {
        const newErrors = {};
        const isEmail = loginInput.includes("@");

        const emailRegex = /^\S+@\S+\.\S+$/;
        const usernameRegex = /^[a-zA-Z0-9._-]{3,}$/;
        // const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (!loginInput) {
            newErrors.login = ["Username or email is required."];
        } else if (isEmail && !emailRegex.test(loginInput)) {
            newErrors.login = ["Please enter a valid email address."];
        } else if (!isEmail && !usernameRegex.test(loginInput)) {
            newErrors.login = ["Username must be at least 3 characters and alphanumeric."];
        }

        // if (!passwordRegex.test(password)) {
        //     newErrors.password = [
        //         "Password must be at least 8 characters, include one number and one special character.",
        //     ];
        // }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const makeRequest = async (e) => {
        e.preventDefault();
        setErrors({});
        setMessage("");

        if (!validate()) return;

        try {
            setLoading(true);
            await axios.get("/sanctum/csrf-cookie");

            const payload = {
                email: loginInput,
                password,
                remember,
            };

            localStorage.setItem("email", loginInput);

            const response = await axios.post(`${BASE_URL}/api/login`, payload, {
                headers: { Accept: "application/json" },
            });

            if (response.data.status === 200) {
                setSignIn(true);
            }
        } catch (error) {
            setErrors(error.response?.data?.errors || {});
            setMessage(error.response?.data?.message || "Invalid credentials or server error.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center bg-danger">
            <div className="row flex-grow-1 w-100">
                <div className="col-md-6 text-white d-flex flex-column justify-content-center px-5">
                    <h1 className="display-4 fw-bold">Unlock the Future of Global Asset Management</h1>
                    <p className="mt-4 fs-5">
                        Welcome to KONNECT, your gateway to simplified global employment management.  Let's begin this Heroic journey together!
                    </p>
                </div>

                <div className="col-md-6 d-flex justify-content-center align-items-center">
                    {forgot ? (
                        <ForgotPassword />
                    ) : signIn ? (
                        <VerifyOtp />
                    ) : (
                        <div className="bg-white p-4 shadow rounded-4 w-100" style={{ maxWidth: "520px", height: "500px" }}>
                            <div className="text-center mb-0">
                                <img src={logo} alt="Konnect Logo" width={90} className="mb-3" />
                                <p className=" fw-bold" style={{ color: "#3f4254", fontSize: "30px" }}>Welcome Back</p>
                                <p className="text-muted small">
                                    To keep connected with us please login with your personal information by email address & password
                                </p>
                            </div>

                            {message && <div className="alert alert-danger">{message}</div>}

                            <form onSubmit={makeRequest} noValidate>
                                <div className="mb-3">
                                    <label className="form-label" style={{ color: "#3f4254" }}>Email Address</label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.login ? "is-invalid" : ""}`}
                                        placeholder="Your email address"
                                        value={loginInput}
                                        onChange={(e) => setLoginInput(e.target.value)}
                                    />
                                    {errors.login && <div className="invalid-feedback">{errors.login[0]}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label" style={{ color: "#3f4254" }}>Password</label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                        placeholder="Your Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
                                    <div className="text-end mt-1">
                                        <span className="fs-8 text-danger " style={{ cursor: "pointer", fontWeight: "500" }} onClick={() => setForgot(true)}>
                                            Forgot Password?
                                        </span>
                                    </div>
                                </div>

                                <div className="form-check mb-3" style={{ textAlign: "left" }} >
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={remember}
                                        onChange={(e) => setRemember(e.target.checked)}
                                    />
                                    <label className="form-check-label" style={{ color: "#3f4254" }}>Remember Me</label>
                                </div>

                                <button type="submit" className="btn btn-danger w-100 fw-bold" disabled={loading} style={{ borderRadius: "999px" }}>
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status" />
                                            Logging in...
                                        </>
                                    ) : (
                                        "Login Now"
                                    )}
                                </button>

                                <div className="text-center mt-4">
                                    <a href="#" className="text-muted mx-2">Help</a>
                                    <a href="#" className="text-muted mx-2">Contact</a>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
