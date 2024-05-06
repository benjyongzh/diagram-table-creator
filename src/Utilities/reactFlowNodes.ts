import { standardNodeData } from "Objects/nodes";
import { Node } from "reactflow";
import { randomStringGenerator } from "./strings";
import nodeConfigs from "Configs/nodeConfig";

export const createNodeFromData = <T>(data: T): Node => {
  const newNodeId: string = randomStringGenerator(nodeConfigs.ID_LENGTH);
  const variantIndex: number = 0;
  const newData = { ...data, variantIndex };
  return { id: newNodeId, data: newData, ...standardNodeData };
};

export const checkNodeType = (node: Node, type: string): boolean => {
  return node.type === type;
};
