import React, { useState } from "react";
import "./index.css";

export const InputOtp = ({ otpValue, setOtpValue }) => {
  return (
    <input
      className="otp-input"
      placeholder=""
      type="text"
      value={otpValue}
      maxLength="1"
      onChange={(e) => setOtpValue(e.target.value)}
    />
  );
};
