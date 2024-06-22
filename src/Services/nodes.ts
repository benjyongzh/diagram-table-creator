import nodeConfig from "Configs/nodeConfig";
import { randomStringGenerator } from "Utilities/strings";
import { Node } from "reactflow";
import { NodeVariant } from "Types/nodes/nodeVariant";

export const checkNodeType = (node: Node, type: string): boolean => {
  return node.type === type;
};

export const createNodeId = (): string => {
  return randomStringGenerator(nodeConfig.NODE_ID_LENGTH);
};

export function getNodeCenter(node: Node) {
  return {
    x: node.positionAbsolute.x + node.width / 2,
    y: node.positionAbsolute.y + node.height / 2,
  };
}

export const nodeIsOfThisVariant = (node: Node, data: NodeVariant): boolean => {
  const nodeData = node.data;
  return (
    nodeData.nodeName === data.nodeName &&
    nodeData.color === data.color &&
    JSON.stringify(nodeData.handleTypes) === JSON.stringify(data.handleTypes)
  );
};
