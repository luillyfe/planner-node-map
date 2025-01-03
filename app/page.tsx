import { InteractiveNodeGraph } from "@/components/node-graph";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">
        Book a flight and hotel for a trip to Paris
      </h1>
      <InteractiveNodeGraph />
    </main>
  );
}
