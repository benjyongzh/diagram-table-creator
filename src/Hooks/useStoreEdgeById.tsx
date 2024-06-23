import { EdgeVariant, EdgeVariantId } from "Types/edges/edgeVariant";
import { Edge } from "reactflow";

// hooks
import { useMemo, useCallback } from "react";
// import { useAppDispatch } from "Hooks/reduxHooks";
import { useStoreEdges } from "./useStoreEdges";
import { useStoreEdgeVariants } from "./useStoreEdgeVariants";

import { EdgeId } from "Types/edges/edge";

export const useStoreEdgeById = (edgeId: string) => {
  // const dispatch = useAppDispatch();
  const { allEdges, removeEdge } = useStoreEdges();
  const { getEdgeVariantFromId, getEdgesOfVariantId } = useStoreEdgeVariants();

  const thisEdge: Edge = useMemo(
    () => allEdges.filter((edge) => edge.id === edgeId)[0],
    [edgeId]
  );

  const deleteEdgeById = useCallback(() => {
    if (edgeId) {
      removeEdge(edgeId);
    }
  }, [edgeId]);

  const edgeVariant: EdgeVariant = useMemo(() => {
    console.log(`use ${edgeId}`);
    const variantId: EdgeVariantId = thisEdge.data.variantId;
    return getEdgeVariantFromId(variantId);
  }, [edgeId]);

  const variantIndex: number = useMemo(() => {
    const edges: EdgeId[] = getEdgesOfVariantId(edgeVariant.id).map(
      (edge) => edge.id
    );
    return edges.indexOf(edgeId);
  }, [edgeVariant]);

  const mainLabel: string = useMemo(() => {}, [edgeVariant]);

  const startLabel: string = useMemo(() => {}, [edgeVariant]);

  const endLabel: string = useMemo(() => {}, [edgeVariant]);

  return {
    thisEdge,
    deleteEdgeById,
    edgeVariant,
    variantIndex,
    mainLabel,
    startLabel,
    endLabel,
  };
};
