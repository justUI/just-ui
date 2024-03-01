"use client";
import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import { Button } from "@repo/ui/button";
import { OtpInput } from "@repo/ui/otpInput";

export default function Page(): JSX.Element {
  return (
    <main>
      <Button className="">Click me!</Button>
      <h1 className="text-3xl">Helo</h1>
      <OtpInput
        onComplete={(code) => {
          console.log(code);
        }}
        slots={3}
      />
    </main>
  );
}
