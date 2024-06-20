import { NodeVariantId } from "./nodeVariant";
import nodeConfig from "Configs/nodeConfig";
import { z } from "zod";
import { nodeStyle } from "Styles/node";

export type NodeData = {
  variantId: NodeVariantId;
  variantIndex: number;
  isHovered: boolean;
};

const nodeIdSchema = z.string().length(nodeConfig.NODE_ID_LENGTH);

export type NodeId = z.infer<typeof nodeIdSchema>;

export const standardNodeData = {
  type: nodeConfig.INITIAL_CUSTOM_NODE_NAME,
  position: { x: nodeConfig.STARTING_X_POS, y: nodeConfig.STARTING_Y_POS },
  isConnectable: true,
  style: nodeStyle,
};
