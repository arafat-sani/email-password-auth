// src/pages/ForgetPassword.jsx
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebase.init";

export const ForgetPassword = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const prefilledEmail = params.get("email") || "";

  const [email, setEmail] = useState(prefilledEmail);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) return setError("Please enter your email.");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Redirecting to Gmail...");
      setTimeout(() => {
        window.open("https://mail.google.com", "_blank");
      }, 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold mb-4">Forgot Password</h1>
            <form onSubmit={handleReset}>
              <label className="label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="Enter your email"
                required
              />
              <button className="btn btn-neutral mt-4 w-full">Reset Password</button>
            </form>

            {message && <p className="text-green-500 mt-2">{message}</p>}
            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
