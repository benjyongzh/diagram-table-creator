import { memo } from "react";
import { Handle, Position } from "reactflow";
import CustomNodeVariant from "Types/customNodeVariant";

const CustomComponentNode = (data: CustomNodeVariant) => {
  return (
    <>
      <div>CustomComponentNode {data.nodeName}</div>
      {Array.from({ length: data.handleCount }).map((_item, index) => (
        <Handle
          id={`${data.nodeName} port ${index.toString()}`}
          type="source"
          position={Position.Right} //position should depend on value of handleCount
        />
      ))}
    </>
  );
};

export default memo(CustomComponentNode);
