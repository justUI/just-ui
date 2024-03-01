import { useState } from "react";

interface TabsProps {
  code: string;
  preview: React.ReactNode;
}

export function CodePreviewTabs({ code, preview }: TabsProps) {
  const [activeTab, setActiveTab] = useState("code");

  return (
    <div>
      <div className="border-b">
        <button
          className={`px-4 py-2 ${
            activeTab === "code"
              ? "text-blue-500 border-blue-500 border-b-2"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("code")}
        >
          Code
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "preview"
              ? "text-blue-500 border-blue-500 border-b-2"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </button>
      </div>

      {activeTab === "code" && (
        <pre className="p-4">
          <code>{code}</code>
        </pre>
      )}

      {activeTab === "preview" && <div className="p-4 border">{preview}</div>}
    </div>
  );
}
