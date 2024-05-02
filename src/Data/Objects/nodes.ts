import nodeConfigs from "Configs/nodeConfig";
import { Node } from "reactflow";

const standardNodeData = {
  type: nodeConfigs.INITIAL_CUSTOM_NODE_NAME,
  position: { x: nodeConfigs.STARTING_X_POS, y: nodeConfigs.STARTING_Y_POS },
  isConnectable: true,
  style: { background: "#555" },
};

export const createNodeFromData = <T>(data: T): Node => {
  const newNodeId: string = "hello"; //implement random generator here

  return { id: newNodeId, data, ...standardNodeData };
};
