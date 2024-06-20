import { Node } from "reactflow";
import { NodeId } from "Types/nodes/node";
import { NodeVariant } from "Types/nodes/nodeVariant";

export const addNode = (newNode: Node) => {};

export const updateNode = (updatedNode: Node) => {};

export const removeNode = (nodeId: NodeId) => {};

export const getNodeVariant = (nodeId: NodeId): NodeVariant => {};

export const getNodeName = (nodeId: NodeId): string => {};
