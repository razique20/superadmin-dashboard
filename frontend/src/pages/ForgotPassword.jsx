import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = () => {
    const generatedOtp = "123456"; // simulate OTP
    localStorage.setItem("otp", generatedOtp);
    setStep(2);
  };

  const handleVerifyOtp = () => {
    if (otp === localStorage.getItem("otp")) {
      setStep(3);
    } else {
      alert("Invalid OTP");
    }
  };

  const handleResetPassword = () => {
    // Here, you'd update the password in backend/db
    alert("Password updated! You can now log in.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 rounded-xl p-8 w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold mb-4">Password Recovery</h2>

        {step === 1 && (
          <>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleSendOtp} className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700">
              Send OTP
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-700"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleVerifyOtp} className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700">
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <input
              type="password"
              className="w-full p-2 rounded bg-gray-700"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleResetPassword} className="w-full bg-green-600 py-2 rounded hover:bg-green-700">
              Reset Password
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
