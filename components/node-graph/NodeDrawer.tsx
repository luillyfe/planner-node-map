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
        <DrawerHeader className="border-b border-gray-200">
          <DrawerTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white shadow-inner">
              {selectedNode && getToolIcon(selectedNode.tool)}
            </div>
            <span className="text-xl">{selectedNode?.tool}</span>
          </DrawerTitle>
          <DrawerDescription className="text-gray-600 mt-2">
            {selectedNode?.description}
          </DrawerDescription>
        </DrawerHeader>
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2">
            <span>Parameters</span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </h3>
          <pre className="bg-white p-6 rounded-xl border border-gray-200 shadow-inner overflow-auto text-sm">
            {JSON.stringify(selectedNode?.parameters, null, 2)}
          </pre>
        </div>
        <DrawerFooter className="border-t border-gray-200">
          <Button
            onClick={onClose}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg px-8 rounded-xl"
          >
            Close
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
