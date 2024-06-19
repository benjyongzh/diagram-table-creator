import { EdgeVariant } from "Types/edges/edgeVariant";
import {
  HandleVariant,
  HandleVariantData,
  HandleVariantId,
} from "Types/handles/handleVariant";

export const addHandleVariant = (
  newVariant: HandleVariantData
): HandleVariant => {};

export const updateHandleVariant = (
  updatedVariant: HandleVariant
): HandleVariant => {
  return updatedVariant;
};
export const removeHandleVariant = (id: HandleVariantId): HandleVariant => {};

export const getEdgeVariantOfHandleVariant = (
  id: HandleVariantId
): EdgeVariant => {};
