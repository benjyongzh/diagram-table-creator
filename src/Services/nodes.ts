import { Node } from "reactflow";
import { NodeId } from "Types/nodes/node";
import { NodeVariant } from "Types/nodes/nodeVariant";
import nodeConfig from "Configs/nodeConfig";
import { randomStringGenerator } from "Utilities/strings";

export const addNode = (newNode: Node) => {};

export const updateNode = (updatedNode: Node) => {};

export const removeNode = (nodeId: NodeId) => {};

export const getNodeVariant = (nodeId: NodeId): NodeVariant => {};

export const getNodeName = (nodeId: NodeId): string => {};

export const createNodeId = (): string => {
  return randomStringGenerator(nodeConfig.NODE_ID_LENGTH);
};
