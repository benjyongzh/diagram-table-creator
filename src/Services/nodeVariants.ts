import {
  NodeVariant,
  NodeVariantData,
  NodeVariantId,
} from "Types/nodes/nodeVariant";
import { HandleVariant } from "Types/handles/handleVariant";
import { Node } from "reactflow";

export const addNodeVariant = (newVariant: NodeVariantData): NodeVariant => {};

export const updateNodeVariant = (updatedVariant: NodeVariant): NodeVariant => {
  return updatedVariant;
};
export const removeNodeVariant = (id: NodeVariantId): NodeVariant => {};

export const getHandleVariantsOfNodeVariant = (
  id: NodeVariantId
): HandleVariant => {};

export const getNodes = (id: NodeVariantId): Node[] => {};
