import {
  EdgeVariant,
  EdgeVariantData,
  EdgeVariantId,
} from "Types/edges/edgeVariant";
import { Edge } from "reactflow";

export const addEdgeVariant = (newVariant: EdgeVariantData): EdgeVariant => {};

export const updateEdgeVariant = (updatedVariant: EdgeVariant): EdgeVariant => {
  return updatedVariant;
};
export const removeEdgeVariant = (id: EdgeVariantId): EdgeVariant => {};

export const getEdges = (id: EdgeVariantId): Edge[] => {};
