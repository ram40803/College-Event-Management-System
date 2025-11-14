import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); // Inline error message
  const [successMsg, setSuccessMsg] = useState(""); // Inline success message
  const [showOtpModal, setShowOtpModal] = useState(false); // Translucent OTP box trigger

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trimStart(),
    });
    setErrorMsg(""); // Clear error when user types again
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!formData.name || !formData.email || !formData.password) {
      setErrorMsg("⚠️ Please fill in all required fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("⚠️ Passwords do not match.");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMsg("⚠️ Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await api.post(
        "/user-service/users/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const message =
        response.data?.message || "Registered successfully, OTP sent to email.";

      setSuccessMsg(message);
      localStorage.setItem("signupEmail", formData.email);

      // Show translucent OTP modal
      setShowOtpModal(true);
    } catch (error) {
      console.error("Signup Error:", error);

      let errMsg = "Something went wrong. Please try again.";

      if (error.response) {
        errMsg =
          error.response.data?.message ||
          `Signup failed: ${error.response.statusText}`;
      } else if (error.request) {
        errMsg =
          "No response from server. Please ensure your backend is running.";
      }

      setErrorMsg(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f0f7ff] relative">
      {/* Signup Form Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md relative z-10">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Create Your Account
        </h2>

        {/* Inline Error */}
        {errorMsg && (
          <div className="text-red-600 bg-red-100 border border-red-300 p-2 rounded-lg text-sm mb-3 text-center">
            {errorMsg}
          </div>
        )}

        {/* Inline Success */}
        {successMsg && (
          <div className="text-green-600 bg-green-100 border border-green-300 p-2 rounded-lg text-sm mb-3 text-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoComplete="name"
              className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="new-password"
              minLength={6}
              className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Enter password"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              autoComplete="new-password"
              minLength={6}
              className="w-full mt-1 p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Confirm password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium text-white transition-colors duration-200 ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 font-medium cursor-pointer hover:underline"
            onClick={() => !loading && navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
          <div className="bg-white bg-opacity-90 backdrop-blur-lg p-6 rounded-xl shadow-xl w-80 text-center">
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              OTP Sent Successfully
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              An OTP has been sent to your registered email:{" "}
              <span className="font-medium text-blue-600">
                {formData.email}
              </span>
            </p>
            <button
              onClick={() => navigate("/verify-otp")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
            >
              Proceed to Verify
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
