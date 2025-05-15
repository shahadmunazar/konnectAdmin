// ResetPassword.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Optional: Debug token
  useEffect(() => {
    console.log("Reset token from URL:", token);
  }, [token]);

  const validateForm = () => {
    const newErrors = {};
    const passwordRegex = {
      uppercase: /[A-Z]/,
      lowercase: /[a-z]/,
      number: /\d/,
      specialChar: /[@$!%*?&]/,
    };

    if (password.length < 8 || password.length > 16) {
      newErrors.password = "Password must be 8-16 characters long.";
    } else if (!passwordRegex.uppercase.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter.";
    } else if (!passwordRegex.lowercase.test(password)) {
      newErrors.password = "Password must contain at least one lowercase letter.";
    } else if (!passwordRegex.number.test(password)) {
      newErrors.password = "Password must contain at least one number.";
    } else if (!passwordRegex.specialChar.test(password)) {
      newErrors.password = "Password must contain at least one special character.";
    }

    if (confirmPassword !== password) {
      newErrors.confirmPassword = "Confirm password does not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    if (!validateForm()) return;

    setLoading(true);
    axios
      .post(`${BASE_URL}/api/update-password`, {
        token,
        password,
        confirmPassword,
      })
      .then((res) => {
        setMessage("✅ Your password has been updated successfully.");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => navigate("/login"), 3000); // redirect to login after 3s
      })
      .catch((err) => {
        if (err.response?.data?.message) {
          setMessage(`❌ ${err.response.data.message}`);
        } else {
          setMessage("❌ Something went wrong.");
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="auth-container d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <div className="card p-4" style={{ width: "24rem" }}>
        <h3 className="card-title text-center mb-3">Reset Password</h3>
        <p className="text-muted text-center" style={{ fontSize: "14px" }}>
          Enter a new password below. Make sure it’s strong and secure.
        </p>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label>New Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          <div className="mb-3 text-start">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && (
              <div className="text-danger">{errors.confirmPassword}</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
