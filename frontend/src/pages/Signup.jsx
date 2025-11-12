// src/pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("form");
  const [countdown, setCountdown] = useState(0);

  const baseUrl = "/user-service/users";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // LOGIN
      try {
        const res = await axios.post(`${baseUrl}/login`, { email, password });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role || "user");
        navigate("/");
      } catch (err) {
        alert("Login failed: " + (err.response?.data?.message || err.message));
      }
    } else {
      // SIGNUP
      if (password !== confirmPassword) return alert("Passwords do not match!");
      try {
        await axios.post(`${baseUrl}/register`, { email, password });
        setStep("verify");
      } catch (err) {
        alert("Signup failed: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleResendOtp = async () => {
    try {
      await axios.post(`${baseUrl}/resend-otp`, { email });
      setCountdown(300);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      alert("Failed to resend OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post(`${baseUrl}/verify-otp`, { email, otp });
      alert("Account verified! You can now login.");
      setIsLogin(true);
      setStep("form");
    } catch (err) {
      alert("OTP verification failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#f0f7ff] px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          {isLogin ? "Login" : step === "verify" ? "Verify OTP" : "Signup"}
        </h2>

        {step === "verify" ? (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Verify OTP
            </button>
            <div className="flex justify-between items-center mt-4 text-sm">
              <button
                onClick={handleResendOtp}
                disabled={countdown > 0}
                className={`${
                  countdown > 0 ? "text-gray-400" : "text-blue-600 hover:underline"
                }`}
              >
                {countdown > 0
                  ? `Resend OTP in ${Math.floor(countdown / 60)}:${String(
                      countdown % 60
                    ).padStart(2, "0")}`
                  : "Resend OTP"}
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              />
            )}

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isLogin ? "Login" : "Signup"}
            </button>
          </form>
        )}

        <p className="text-center text-sm mt-4">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => {
                  setIsLogin(false);
                  setStep("form");
                }}
                className="text-blue-600 hover:underline"
              >
                Signup here
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => {
                  setIsLogin(true);
                  setStep("form");
                }}
                className="text-blue-600 hover:underline"
              >
                Login here
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
