import React, { useState } from "react";
import "./index.css";

export const InputNumber = ({ inputNumber, setInputNumber }) => {
  return (
    <input
      className="input-number"
      type="text"
      maxLength="10"
      value={inputNumber}
      onChange={(e) => setInputNumber(e.target.value)}
    />
  );
};
