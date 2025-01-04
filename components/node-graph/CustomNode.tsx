import { FC } from "react";
import { NodeProps, Handle, Position } from "reactflow";
import { getNodeStyle } from "./styles";
import { getToolIcon } from "./utils";

export const CustomNode: FC<NodeProps> = ({ data }) => {
  return (
    <div className={getNodeStyle(data.tool)}>
      <div className="flex flex-col">
        <div className="flex items-center gap-4">
          <div className="rounded-xl w-14 h-14 flex items-center justify-center bg-white shadow-inner border border-gray-100">
            {getToolIcon(data.tool)}
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold text-gray-800 leading-tight">
              {data.tool}
            </div>
            <div className="text-sm text-gray-600 mt-1 line-clamp-2">
              {data.description}
            </div>
          </div>
        </div>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        className="w-20 !bg-gray-400/30 hover:!bg-gray-400 !rounded-full"
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-20 !bg-gray-400/30 hover:!bg-gray-400 !rounded-full"
      />
    </div>
  );
};
