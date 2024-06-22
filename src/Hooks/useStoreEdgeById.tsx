import { EdgeVariant, EdgeVariantId } from "Types/edges/edgeVariant";
import { Edge } from "reactflow";

// hooks
import { useMemo, useCallback } from "react";
// import { useAppDispatch } from "Hooks/reduxHooks";
import { useStoreEdges } from "./useStoreEdges";
import { useStoreEdgeVariants } from "./useStoreEdgeVariants";

export const useStoreEdgeById = (edgeId: string) => {
  // const dispatch = useAppDispatch();
  const { allEdges, removeEdge } = useStoreEdges();
  const { getEdgeVariantFromId } = useStoreEdgeVariants();

  const thisEdge: Edge = useMemo(
    () => allEdges.filter((edge) => edge.id === edgeId)[0],
    [edgeId]
  );

  const deleteEdgeById = useCallback(() => {
    if (edgeId) {
      removeEdge(edgeId);
    }
  }, [edgeId]);

  const getEdgeVariant = (): EdgeVariant => {
    console.log(`use ${edgeId}`);
    const variantId: EdgeVariantId = thisEdge.data.variantId;
    return getEdgeVariantFromId(variantId);
  };

  return { thisEdge, deleteEdgeById, getEdgeVariant };
};
