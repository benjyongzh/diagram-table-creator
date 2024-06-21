import { Node } from "reactflow";
import { NodeId } from "Types/nodes/node";
import { NodeVariant } from "Types/nodes/nodeVariant";
import nodeConfig from "Configs/nodeConfig";
import { randomStringGenerator } from "Utilities/strings";

export const getNodeVariant = (nodeId: NodeId): NodeVariant => {};

export const getNodeName = (nodeId: NodeId): string => {};

export const createNodeId = (): string => {
  return randomStringGenerator(nodeConfig.NODE_ID_LENGTH);
};
