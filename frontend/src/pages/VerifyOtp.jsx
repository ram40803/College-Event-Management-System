// src/pages/VerifyOtp.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

export default function VerifyOtp() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      await api.post("/user-service/users/verify-otp", { email, otp });
      alert("Email verified successfully!");
      navigate("/login");
    } catch {
      alert("Invalid OTP");
    }
  };

  const handleResendOtp = async () => {
    try {
      await api.post("/user-service/users/resend-otp", { email });
      alert("OTP resent successfully!");
      setTimer(300);
    } catch {
      alert("Failed to resend OTP");
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f7ff]">
      <form
        onSubmit={handleVerify}
        className="bg-white p-8 shadow-lg rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Verify OTP</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border w-full p-2 mb-4 rounded-md"
          required
        />

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="border w-full p-2 mb-4 rounded-md"
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mb-3">
          Verify OTP
        </button>

        <button
          type="button"
          onClick={handleResendOtp}
          disabled={timer > 0}
          className={`w-full ${
            timer > 0 ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          } text-white py-2 rounded-md transition`}
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
