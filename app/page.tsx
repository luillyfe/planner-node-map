"use client";

import { useState } from "react";
import { InteractiveNodeGraph } from "@/components/node-graph";
import defaultPlanData from "@/data/planData.json";
import { FileUploader } from "@/components/file-uploader";

export default function Home() {
  const [planData, setPlanData] = useState(defaultPlanData);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        setPlanData(json);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        alert("Invalid JSON file. Please try again.");
      }
    };
    reader.readAsText(file);
  };
  return (
    <>
      <meta
        property="og:image"
        content="https://planner-node-map.vercel.app/api/og"
      ></meta>
      <meta
        property="twitter:image"
        content="https://planner-node-map.vercel.app/api/og"
      ></meta>
      <meta
        property="twitter:card"
        content="https://planner-node-map.vercel.app/api/og"
      ></meta>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="w-full max-w-7xl flex justify-between items-start mb-8">
          <h1 className="text-4xl font-bold max-w-3xl">
            Book a flight and hotel for a trip to Paris
          </h1>
          <FileUploader onFileUpload={handleFileUpload} />
        </div>
        <InteractiveNodeGraph {...planData} />
      </main>
    </>
  );
}
