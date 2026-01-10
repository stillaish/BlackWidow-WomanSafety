import React, { useState } from "react";

const VerifyOtp = ({ onSuccess }) => {
  const [code, setCode] = useState("");

  const verify = async () => {
    try {
      await window.confirmationResult.confirm(code);
      onSuccess();
    } catch {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-card p-6 rounded-xl w-80 border">
        <h1 className="text-xl font-bold mb-4">Verify OTP</h1>

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="Enter OTP"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <button
          onClick={verify}
          className="w-full bg-red-600 text-white p-2 rounded"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
