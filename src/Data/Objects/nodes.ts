import nodeConfigs from "@/Configs/nodeConfig";
import { nodeStyle } from "Styles/node";

export const standardNodeData = {
  type: nodeConfigs.INITIAL_CUSTOM_NODE_NAME,
  position: { x: nodeConfigs.STARTING_X_POS, y: nodeConfigs.STARTING_Y_POS },
  isConnectable: true,
  style: nodeStyle,
};
