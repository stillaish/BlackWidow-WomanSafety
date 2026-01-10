import React, { useState } from "react";
import { auth } from "../../utils/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = ({ onCodeSent }) => {
  const [phone, setPhone] = useState("");

  const sendOtp = async () => {
    if (!phone.startsWith("+91")) {
      alert("Enter number like +91XXXXXXXXXX");
      return;
    }

    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }

    const confirmation = await signInWithPhoneNumber(
      auth,
      phone,
      window.recaptchaVerifier
    );

    window.confirmationResult = confirmation;
    onCodeSent();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-card p-6 rounded-xl w-80 border">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          className="w-full p-2 border rounded mb-3"
          placeholder="+91XXXXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button
          onClick={sendOtp}
          className="w-full bg-red-600 text-white p-2 rounded"
        >
          Send OTP
        </button>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Login;
