import Image from "next/image";
import { Card } from "@repo/ui/card";
import { Code } from "@repo/ui/code";
import { Button } from "@repo/ui/button";

export default function Page(): JSX.Element {
  return (
    <main>
      <Button  className="">
        Click me!
      </Button>
      <h1 className="text-3xl">Helo</h1>
    </main>
  );
}
