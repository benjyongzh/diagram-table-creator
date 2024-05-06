import { standardNodeData } from "Objects/nodes";
import { Node } from "reactflow";
import { randomStringGenerator } from "./strings";
import nodeConfigs from "Configs/nodeConfig";

export const createNodeFromData = <T>(data: T): Node => {
  const newNodeId: string = randomStringGenerator(nodeConfigs.ID_LENGTH);
  // const variantIndex: number = 0;
  // const newData = { ...data, variantIndex };
  // return { id: newNodeId, data: newData, ...standardNodeData };
  return { id: newNodeId, data, ...standardNodeData };
};

export const checkNodeType = (node: Node, type: string): boolean => {
  return node.type === type;
};

export const createCountLibrary = <T extends Node>(
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
