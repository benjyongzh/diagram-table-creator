import { Edge } from "reactflow";
import { EdgeLabels } from "Types/edges/edge";
import { EdgeIdentifier } from "Types/edges/edgeIdentifier";
import { EdgeVariant } from "Types/edges/edgeVariant";
import { useGetEdgeVariant } from "./useGetEdgeVariant";
import { useGetEdgeVariantIndex } from "./useGetEdgeVariantIndex";

import { getEdgeLabels as getEdgeLabelsService } from "Services/edges";

export const useGetEdgeLabels = () => {
  const getEdgeVariant = useGetEdgeVariant();
  const getVariantIndex = useGetEdgeVariantIndex();
  const getEdgeLabels = (edge: Edge): EdgeLabels => {
    const variant: EdgeVariant = getEdgeVariant(edge);
    const identifier: EdgeIdentifier = variant.edgeIdentifier;
    const variantIndex: number = getVariantIndex(edge);
    return getEdgeLabelsService({
      edge,
      edgeIdentifier: identifier,
      variantIndex,
    });
  };
  return getEdgeLabels;
};
