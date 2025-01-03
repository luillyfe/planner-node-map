"use client";

import React, { useState, useCallback, useEffect, MouseEvent, FC } from "react";
import ReactFlow, {
  Node,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";

import { CustomNode } from "./CustomNode";
import { NodeDrawer } from "./NodeDrawer";
import { DEFAULT_EDGE_OPTIONS, PLAN_DATA } from "./constants";
import { createGraph } from "./utils";
import { Step } from "./types";

const nodeTypes = {
  custom: CustomNode,
};

const InteractiveNodeGraph: FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Step | null>(null);

  const onInit = useCallback((reactFlowInstance: ReactFlowInstance) => {
    console.log("flow loaded:", reactFlowInstance);
  }, []);

  useEffect(() => {
    const graph = createGraph(PLAN_DATA);
    setNodes(graph.nodes);
    setEdges(graph.edges);
  }, [setNodes, setEdges]);

  const onNodeClick = useCallback((event: MouseEvent, node: Node) => {
    setSelectedNode(node.data as Step);
  }, []);

  return (
    <div className="w-full h-[900px] bg-gradient-to-br from-slate-50 via-white to-slate-100 p-8 rounded-2xl">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onInit={onInit}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={DEFAULT_EDGE_OPTIONS}
        fitView
        className="shadow-inner rounded-xl"
      >
        <Background color="#94a3b8" gap={24} size={1} className="bg-white/50" />
        <Controls className="bg-white/80 backdrop-blur-sm shadow-lg rounded-xl border border-gray-200" />
      </ReactFlow>

      <NodeDrawer
        selectedNode={selectedNode}
        onClose={() => setSelectedNode(null)}
      />
    </div>
  );
};

export { InteractiveNodeGraph };
