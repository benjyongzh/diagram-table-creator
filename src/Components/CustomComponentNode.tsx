import { memo } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import CustomNodeVariant from "Types/customNodeVariant";
const CustomComponentNode = (props: NodeProps<CustomNodeVariant>) => {
  const { data } = props;

  return (
    <div>
      CustomComponentNode {data.nodeName}
      {Array.from({ length: data.handleCount }).map((_item, index) => (
        <Handle
          id={`${data.nodeName} port ${index.toString()}`}
          type="source"
          position={Position.Right} //position should depend on value of handleCount
        />
      ))}
    </div>
  );
};

export default memo(CustomComponentNode);
