import { Node, Edge } from "reactflow";
import { PlanData } from "./types";
import { TOOL_ICONS } from "./constants";

export const createGraph = (data: PlanData) => {
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
    step.dependencies?.forEach((dep) => {
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
      if (step.dependencies?.length > 0) {
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

export const getToolIcon = (tool: string) => {
  return TOOL_ICONS[tool as keyof typeof TOOL_ICONS];
};
