"use client";
import { Input } from "../src/input";
import React, { useState, useRef, useEffect, useCallback } from "react";

interface OTPInputProps {
  slots: number;
  onComplete: (otp: string) => void;
  separator?: string;
  inputType?: "text" | "password" | "tel";
}

export const OtpInput: React.FC<OTPInputProps> = ({
  onComplete,
  slots,
  separator = "",
  inputType = "tel",
}) => {
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
    const isNumber = /^\d+$/.test(val);

    if (inputType === "tel" || !inputType) {
      if (isNumber) {
        setOtp(otp + val);
        focusNext(inputs.current.indexOf(e.target));
      }
    } else if (inputType === "text" || inputType === "password") {
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

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text/plain");

      if (inputType === "tel" || !inputType) {
        const sanitizedData = pastedData.slice(0, slots).replace(/\D/g, "");
        setOtp(sanitizedData);

        const values = sanitizedData.split("");
        inputs.current.forEach((input: { value: string; }, idx: any) => {
          input.value = values[idx] || "";
        });

        if (sanitizedData.length === slots) {
          onComplete(sanitizedData);
        } else {
          const nextFocus = Math.min(
            inputs.current.length - 1,
            sanitizedData.length
          );
          inputs.current[nextFocus].focus();
        }
      } else if (inputType === "text" || inputType === "password") {
        const sanitizedData = pastedData.slice(0, slots);
        setOtp(sanitizedData);

        const values = sanitizedData.split("");
        inputs.current.forEach((input: { value: string; }, idx:any) => {
          input.value = values[idx] || "";
        });

        if (sanitizedData.length === slots) {
          onComplete(sanitizedData);
        } else {
          const nextFocus = Math.min(
            inputs.current.length - 1,
            sanitizedData.length
          );
          inputs.current[nextFocus].focus();
        }
      }
    },
    [slots, onComplete, inputType]
  );

  return (
    <div className="flex items-center gap-x-4">
      {Array(slots)
        .fill(0)
        .map((_, idx) => (
          <React.Fragment key={idx}>
            <Input
              ref={(el) => (inputs.current[idx] = el!)}
              className="lg:w-20 w-14 lg:h-20 h-14 text-center text-3xl shadow"
              type={inputType}
              maxLength={1}
              value={otp[idx] ?? ""}
              onChange={handleChange}
              onKeyUp={handleKeyUp}
              onPaste={handlePaste}
            />
            {idx < slots - 1 && separator && <span>{separator}</span>}
          </React.Fragment>
        ))}
    </div>
  );
};