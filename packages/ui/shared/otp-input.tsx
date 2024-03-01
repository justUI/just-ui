"use client";
import { Input } from "../src/input";

import React, { useState, useRef, useEffect } from "react";

interface OTPInputProps {
  slots: number;
  onComplete: (otp: string) => void;
}

export const OtpInput: React.FC<OTPInputProps> = ({ onComplete,slots }) => {
  const inputs = useRef<any>([]);
  const [otp, setOtp] = useState<string>("");

  useEffect(() => {
    if (inputs.current.length > 0) {
      inputs.current[0].focus();
    }
  }, []);

  const focusNext = (index: number) => {
    if (index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  const focusPrev = (index: number) => {
    if (index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d+$/.test(val)) {
      setOtp(otp + val);
      focusNext(inputs.current.indexOf(e.target));
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const nextOtpValue = otp.slice(0, -1);
      setOtp(nextOtpValue);

      focusPrev(inputs.current.indexOf(e.currentTarget));
    } else {
      if (otp.length === slots) {
        onComplete(otp);
      }
    }
  };

  return (
    <div className="flex items-center gap-x-4">
      {Array(slots)
        .fill(0)
        .map((_, idx) => (
          <Input
            key={idx}
            ref={(el) => (inputs.current[idx] = el!)}
            className="w-14 h-14 text-center text-3xl shadow"
            type="text"
            maxLength={1}
            value={otp[idx] ?? ""}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
          />
        ))}
    </div>
  );
};
