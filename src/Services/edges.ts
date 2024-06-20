import { Edge } from "reactflow";
import { EdgeId } from "Types/edges/edge";
import { EdgeVariant } from "Types/edges/edgeVariant";
import { randomStringGenerator } from "Utilities/strings";
import edgeConfig from "Configs/edgeConfig";

export const addEdge = (newEdge: Edge) => {};

export const updateEdge = (updatedEdge: Edge) => {};

export const removeEdge = (edgeId: EdgeId) => {};

export const getEdgeVariant = (edgeId: EdgeId): EdgeVariant => {};

export const createEdgeId = (): string => {
  return randomStringGenerator(edgeConfig.EDGE_ID_LENGTH);
};
