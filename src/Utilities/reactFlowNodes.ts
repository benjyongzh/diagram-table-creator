import { standardNodeData } from "Objects/nodes";
import { Node } from "reactflow";

export const createNodeFromData = <T>(data: T): Node => {
  const newNodeId: string = "hello"; //implement random generator here

  return { id: newNodeId, data, ...standardNodeData };
};
