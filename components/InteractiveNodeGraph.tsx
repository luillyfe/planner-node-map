"use client";

import React, { useState, useCallback } from "react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  NodeProps,
  Handle,
  Position,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";

interface StepParameters {
  start_date?: string;
  end_date?: string;
  duration?: string;
  origin?: string;
  destination?: string;
  date?: string;
  flights?: unknown;
  preferences?: object;
  departure_airport?: string;
  arrival_airport?: string;
  passenger_details?: object;
  num_guests?: number;
  room_type?: string;
  max_price?: number;
  refundable_only?: boolean;
  hotel_options?: unknown;
  personal_preferences?: object;
  action?: string;
  booking_data?: object;
  template_path?: string;
  to_email?: string;
  from_email?: string;
  from_name?: string;
  reply_to_email?: string;
  reply_to_name?: string;
}

interface Step {
  description: string;
  tool: string;
  parameters: StepParameters;
  dependencies: string[];
}

interface PlanData {
  goal: string;
  steps: Step[];
}

const planData: PlanData = {
  goal: "Book a flight and hotel for a trip to Paris",
  steps: [
    {
      description: "Check calendar availability for the trip",
      tool: "TravelDatesTool",
      parameters: {
        start_date: "2024-01-01T00:00:00",
        end_date: "2024-03-31T00:00:00",
        duration: "3 days, 0:00:00",
      },
      dependencies: [],
    },
    {
      description: "Search for available flights to Paris",
      tool: "FlightSearchTool",
      parameters: {
        origin: "CUC",
        destination: "CDG",
        date: "{TravelDatesTool.available_slots[0]}",
      },
      dependencies: ["TravelDatesTool"],
    },
    {
      description: "Compare and rank flight options",
      tool: "FlightComparatorTool",
      parameters: {
        flights: "{FlightSearchTool.flights}",
        preferences: {
          scoring_weights: {
            price: 0.5,
            duration: 0.3,
            comfort: 0.2,
          },
          constraints: {
            max_budget: 1000,
            max_duration: 8,
            preferred_carriers: ["AF"],
          },
        },
      },
      dependencies: ["FlightSearchTool"],
    },
    {
      description: "Book the selected flight",
      tool: "FlightBookingTool",
      parameters: {
        departure_airport: "CUC",
        arrival_airport: "CDG",
        start_date:
          "{FlightComparatorTool.comparison_results[0].departure.time}",
        passenger_details: {
          first_name: "Fermin",
          last_name: "Blanco",
          type: "ADULT",
        },
      },
      dependencies: ["FlightComparatorTool"],
    },
    {
      description: "Search for available hotels in Paris",
      tool: "HotelSearchTool",
      parameters: {
        num_guests: 1,
        room_type: "SNG",
        max_price: 200.0,
        refundable_only: true,
      },
      dependencies: [],
    },
    {
      description: "Compare and rank hotel options",
      tool: "HotelComparatorTool",
      parameters: {
        hotel_options: "{HotelSearchTool.hotel_options}",
        personal_preferences: {
          preferred_activities: ["sightseeing", "dining"],
        },
      },
      dependencies: ["HotelSearchTool"],
    },
    {
      description: "Book the selected hotel",
      tool: "HotelBookingTool",
      parameters: {
        action: "get_booking_details",
        booking_data: {
          hotel_name: "{HotelComparatorTool.comparison_results[0].hotel.name}",
          check_in_date: "{TravelDatesTool.available_slots[0]}",
          check_out_date: "{TravelDatesTool.available_slots[2]}",
          room_type: "SNG",
          total_price:
            "{HotelComparatorTool.comparison_results[0].price.total}",
          currency: "EUR",
        },
      },
      dependencies: ["HotelComparatorTool", "TravelDatesTool"],
    },
    {
      description: "Send email confirmation for the flight booking",
      tool: "EmailConfirmationTool",
      parameters: {
        booking_data: {
          customer_name: "Fermin Blanco",
          booking_id: "{FlightBookingTool.booking_id}",
          hotel_name: "{HotelBookingTool.booking_data.hotel_name}",
          check_in_date: "{HotelBookingTool.booking_data.check_in_date}",
          check_out_date: "{HotelBookingTool.booking_data.check_out_date}",
          total_price: "{HotelBookingTool.booking_data.total_price}",
        },
        template_path: "flight_booking_template.html",
        to_email: "fermin.blanco@example.com",
        from_email: "bookings@travel.com",
        from_name: "Travel Bookings",
        reply_to_email: "support@travel.com",
        reply_to_name: "Travel Support",
      },
      dependencies: ["FlightBookingTool", "HotelBookingTool"],
    },
  ],
};

const CustomNode: React.FC<NodeProps> = ({ data }) => {
  return (
    <div className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400">
      <div className="flex flex-col">
        <div className="flex items-center">
          <div className="rounded-full w-12 h-12 flex items-center justify-center bg-stone-100">
            {data.icon}
          </div>
          <div className="ml-2">
            <div className="text-lg font-bold">{data.tool}</div>
            <div className="text-gray-500">{data.description}</div>
          </div>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-16 !bg-teal-500"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500"
      />
    </div>
  );
};

const nodeTypes = {
  custom: CustomNode,
};

const InteractiveNodeGraph: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Step | null>(null);

  const onInit = useCallback((reactFlowInstance: ReactFlowInstance) => {
    console.log("flow loaded:", reactFlowInstance);
  }, []);

  React.useEffect(() => {
    const graph = createGraph(planData);
    setNodes(graph.nodes);
    setEdges(graph.edges);
  }, [setNodes, setEdges]);

  const createGraph = (data: PlanData) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const nodePositions: { [key: string]: { x: number; y: number } } = {};

    // Create nodes
    data.steps.forEach((step, index) => {
      const node: Node = {
        id: step.tool,
        type: "custom",
        position: { x: 0, y: index * 100 },
        data: { ...step, icon: "🔧" },
      };
      nodes.push(node);
      nodePositions[step.tool] = { x: 0, y: index * 100 };
    });

    // Create edges
    data.steps.forEach((step) => {
      step.dependencies.forEach((dep) => {
        edges.push({
          id: `${dep}-${step.tool}`,
          source: dep,
          target: step.tool,
          type: "smoothstep",
          animated: true,
        });
      });
    });

    // Adjust node positions based on dependencies
    const adjustNodePositions = () => {
      data.steps.forEach((step) => {
        if (step.dependencies.length > 0) {
          const avgX =
            step.dependencies.reduce(
              (sum, dep) => sum + nodePositions[dep].x,
              0
            ) / step.dependencies.length;
          nodePositions[step.tool].x = avgX + 250;
        }
      });

      nodes.forEach((node) => {
        node.position = nodePositions[node.id];
      });
    };

    // Run position adjustment multiple times for better layout
    for (let i = 0; i < 3; i++) {
      adjustNodePositions();
    }

    return { nodes, edges };
  };

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node.data as Step);
  }, []);

  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onInit={onInit}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
      <Drawer open={!!selectedNode} onClose={() => setSelectedNode(null)}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{selectedNode?.tool}</DrawerTitle>
            <DrawerDescription>{selectedNode?.description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Parameters:</h3>
            <pre className="bg-gray-100 p-2 rounded">
              {JSON.stringify(selectedNode?.parameters, null, 2)}
            </pre>
          </div>
          <DrawerFooter>
            <Button onClick={() => setSelectedNode(null)}>Close</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default InteractiveNodeGraph;
