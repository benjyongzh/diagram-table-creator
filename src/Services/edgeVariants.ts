import {
  EdgeVariant,
  EdgeVariantData,
  EdgeVariantId,
} from "Types/edges/edgeVariant";
import { Edge } from "reactflow";
import { randomStringGenerator } from "Utilities/strings";
import edgeConfig from "Configs/edgeConfig";

export const addEdgeVariant = (newVariant: EdgeVariantData): EdgeVariant => {};

export const updateEdgeVariant = (updatedVariant: EdgeVariant): EdgeVariant => {
  return updatedVariant;
};
export const removeEdgeVariant = (id: EdgeVariantId): EdgeVariant => {};

export const getEdges = (id: EdgeVariantId): Edge[] => {};

export const createEdgeVariantId = (): string => {
  return randomStringGenerator(edgeConfig.EDGE_VARIANT_ID_LENGTH);
};
