import { FC } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Step } from "./types";
import { getToolIcon } from "./utils";

interface NodeDrawerProps {
  selectedNode: Step | null;
  onClose: () => void;
}

export const NodeDrawer: FC<NodeDrawerProps> = ({ selectedNode, onClose }) => {
  return (
    <Drawer open={!!selectedNode} onClose={onClose}>
      <DrawerContent className="bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            {selectedNode && getToolIcon(selectedNode.tool)}
            <span>{selectedNode?.tool}</span>
          </DrawerTitle>
          <DrawerDescription className="text-gray-600">
            {selectedNode?.description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Parameters:
          </h3>
          <pre className="bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-gray-200 shadow-inner overflow-auto">
            {JSON.stringify(selectedNode?.parameters, null, 2)}
          </pre>
        </div>
        <DrawerFooter>
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg"
          >
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
