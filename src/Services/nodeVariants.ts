import { randomStringGenerator } from "Utilities/strings";
import nodeConfig from "Configs/nodeConfig";

export const createNodeVariantId = (): string => {
  return randomStringGenerator(nodeConfig.NODE_VARIANT_ID_LENGTH);
};
