import nodeConfigs from "Configs/nodeConfig";
import CustomNodeVariant from "Types/customNodeVariant";
import { NodeProps } from "reactflow";

// const standardNodeData = {
//   id: "hello",
//   type: nodeConfigs.INITIAL_CUSTOM_NODE_NAME,
//   xPos: nodeConfigs.STARTING_X_POS,
//   yPos: nodeConfigs.STARTING_Y_POS,
// };

export const newNode = (data: CustomNodeVariant): NodeProps => {
  const newNodeId: string = "hello";
  const standardNodeData = {
    id: newNodeId,
    type: nodeConfigs.INITIAL_CUSTOM_NODE_NAME,
    position: { x: nodeConfigs.STARTING_X_POS, y: nodeConfigs.STARTING_Y_POS },
  };
  return { ...standardNodeData, data };
};
