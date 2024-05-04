import { standardNodeData } from "Objects/nodes";
import { Node } from "reactflow";
import { randomStringGenerator } from "./strings";
import nodeConfigs from "Configs/nodeConfig";

export const createNodeFromData = <T>(data: T): Node => {
  const newNodeId: string = randomStringGenerator(nodeConfigs.ID_LENGTH);
  return { id: newNodeId, data, ...standardNodeData };
};
