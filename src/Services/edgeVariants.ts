import {
  EdgeVariant,
  EdgeVariantData,
  EdgeVariantId,
} from "Types/edges/edgeVariant";
import { Edge } from "reactflow";
import { randomStringGenerator } from "Utilities/strings";
import edgeConfig from "Configs/edgeConfig";

export const createEdgeVariantId = (): string => {
  return randomStringGenerator(edgeConfig.EDGE_VARIANT_ID_LENGTH);
};
