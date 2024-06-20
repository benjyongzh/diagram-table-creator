import { EdgeVariant } from "Types/edges/edgeVariant";
import {
  HandleVariant,
  HandleVariantData,
  HandleVariantId,
} from "Types/handles/handleVariant";
import handleConfig from "Configs/handleConfig";
import { randomStringGenerator } from "Utilities/strings";

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

export const createHandleVariantId = (): string => {
  return randomStringGenerator(handleConfig.HANDLE_VARIANT_ID_LENGTH);
};
