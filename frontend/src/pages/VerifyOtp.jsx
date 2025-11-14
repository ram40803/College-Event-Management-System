import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function VerifyOtp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Auto-fill email from signup
  useEffect(() => {
    const storedEmail = localStorage.getItem("signupEmail");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await api.post("/user-service/users/verify-otp", { email, otp });
      setSuccessMsg("✅ Email verified successfully! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error("OTP Verification Error:", error);
      setErrorMsg("❌ Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      await api.post("/user-service/users/resend-otp", { email });
      setSuccessMsg("📩 OTP resent successfully to your email.");
      setTimer(300); // 5-minute timer
    } catch (error) {
      console.error("Resend OTP Error:", error);
      setErrorMsg("⚠️ Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f7ff] px-4">
      <form
        onSubmit={handleVerify}
        className="bg-white p-8 shadow-lg rounded-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          Verify Your Email
        </h2>

        {/* Error / Success Messages */}
        {errorMsg && (
          <div className="bg-red-100 text-red-700 border border-red-300 p-2 rounded-md text-sm mb-3 text-center">
            {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="bg-green-100 text-green-700 border border-green-300 p-2 rounded-md text-sm mb-3 text-center">
            {successMsg}
          </div>
        )}

        {/* Email (Auto-filled, Non-editable) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700">
            Registered Email
          </label>
          <input
            type="email"
            value={email}
            readOnly
            className="border w-full p-2 mt-1 rounded-md bg-gray-100 text-gray-600 cursor-not-allowed"
          />
        </div>

        {/* OTP Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-slate-700">
            Enter OTP
          </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value.trim())}
            placeholder="Enter the 6-digit OTP"
            required
            className="border w-full p-2 mt-1 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Verify OTP Button */}
        <button
          type="submit"
          disabled={loading || !otp}
          className={`w-full py-2 rounded-md text-white font-medium transition-colors duration-200 ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* Resend OTP Button */}
        <button
          type="button"
          onClick={handleResendOtp}
          disabled={timer > 0 || loading}
          className={`w-full mt-3 py-2 rounded-md text-white font-medium transition-colors duration-200 ${
            timer > 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {timer > 0
            ? `Resend OTP in ${Math.floor(timer / 60)}:${(timer % 60)
                .toString()
                .padStart(2, "0")}`
            : "Resend OTP"}
        </button>
      </form>
    </div>
  );
}
