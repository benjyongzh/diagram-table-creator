import nodeConfig from "Configs/nodeConfig";
import { randomStringGenerator } from "Utilities/strings";

export const createNodeId = (): string => {
  return randomStringGenerator(nodeConfig.NODE_ID_LENGTH);
};
