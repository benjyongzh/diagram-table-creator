import { Edge } from "reactflow";
import { EdgeId } from "Types/edges/edge";
import { EdgeVariant } from "Types/edges/edgeVariant";

import { useGetEdgeVariant } from "./useGetEdgeVariant";

export const useGetEdgeVariantIndex = () => {
  const getEdgeVariant = useGetEdgeVariant();
  const getEdgeVariantIndex = (edge: Edge): number => {
    const variant: EdgeVariant = getEdgeVariant(edge);
    const edgeIds: EdgeId[] = getEdgesOfVariantId(variant.id).map(
      (edge) => edge.id
    );
    return edgeIds.indexOf(edge.id);
  };
  return getEdgeVariantIndex;
};
