import { standardNodeData } from "Objects/nodes";
import { Node } from "reactflow";
import { randomStringGenerator } from "../Utilities/strings";
import nodeConfigs from "@/Configs/nodeConfig";
import CustomNodeVariant from "Types/nodes/customNodeVariant";

export const checkNodeType = (node: Node, type: string): boolean => {
  return node.type === type;
};

export const createNodeCountLibrary = <T extends Node>(
  arr: Array<T>,
  dataKey: string,
  nodeType: string = nodeConfigs.INITIAL_CUSTOM_NODE_NAME
) => {
  //redo entire library
  const newLibrary: Record<string, number> = {};
  arr.forEach((node) => {
    if (node.type === nodeType) {
      const key = node.data[dataKey];
      if (!newLibrary[key]) {
        newLibrary[key] = 1;
      } else {
        newLibrary[key] += 1;
      }
    }
  });
  return newLibrary;
};

export const addIndexNumberToNodesBasedOnCountLibrary = <T extends Node>(
  arr: Array<T>,
  library: Record<string, number>
) => {
  const cloneLibrary = structuredClone(library);
  arr.forEach((node: Node) => {
    const maxCount = library[node.data.nodeName];
    const remainingCount = cloneLibrary[node.data.nodeName];
    node.data.variantIndex = maxCount - remainingCount + 1;
    cloneLibrary[node.data.nodeName] -= 1;
  });
};

export function getNodeCenter(node: Node) {
  return {
    x: node.positionAbsolute.x + node.width / 2,
    y: node.positionAbsolute.y + node.height / 2,
  };
}

export const nodeIsOfThisVariant = (
  node: Node,
  data: CustomNodeVariant
): boolean => {
  const nodeData = node.data;
  return (
    nodeData.nodeName === data.nodeName &&
    nodeData.color === data.color &&
    JSON.stringify(nodeData.handleTypes) === JSON.stringify(data.handleTypes)
  );
};

export const getComponentNameTextFromNodeData = (node: Node): string => {
  return `${node.data.nodeName} ${node.data.variantIndex}`;
};
