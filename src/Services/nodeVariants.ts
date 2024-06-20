import {
  NodeVariant,
  NodeVariantData,
  NodeVariantId,
} from "Types/nodes/nodeVariant";
import { HandleVariant } from "Types/handles/handleVariant";
import { Node } from "reactflow";
import { randomStringGenerator } from "Utilities/strings";
import nodeConfig from "Configs/nodeConfig";

export const addNodeVariant = (newVariant: NodeVariantData): NodeVariant => {};

export const updateNodeVariant = (updatedVariant: NodeVariant): NodeVariant => {
  return updatedVariant;
};
export const removeNodeVariant = (id: NodeVariantId): NodeVariant => {};

export const getHandleVariantsOfNodeVariant = (
  id: NodeVariantId
): HandleVariant => {};

export const getNodes = (id: NodeVariantId): Node[] => {};

export const createNodeVariantId = (): string => {
  return randomStringGenerator(nodeConfig.NODE_VARIANT_ID_LENGTH);
};
