"use client"
import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { OtpInput } from "@repo/ui/otpInput";

export default function Page(): JSX.Element {
  return (
    <main className="w-full">
      <Button className="">cool</Button>
      <Input type="email" placeholder="Email" />
      <OtpInput onComplete={()=>{}}/>
    </main>
  );
}
