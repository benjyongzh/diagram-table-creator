import { EdgeVariant, EdgeVariantId } from "Types/edges/edgeVariant";
import { Edge } from "reactflow";

// types
import { EdgeId, EdgeLabels } from "Types/edges/edge";

// hooks
import { useMemo, useCallback } from "react";
// import { useAppDispatch } from "Hooks/reduxHooks";
import { useStoreEdges } from "./useStoreEdges";
import { useAppSelector } from "../reduxHooks";
import { useGetEdgeVariant } from "./useGetEdgeVariant";
import { useGetEdgeVariantIndex } from "./useGetEdgeVariantIndex";
import { useGetEdgeLabels } from "./useGetEdgeLabels";

export const useStoreEdgeById = (edgeId: string) => {
  const allEdges: Edge[] = useAppSelector((state) => state.edges.edges);
  const allEdgeVariants: EdgeVariant[] = useAppSelector(
    (state) => state.edgeVariants.edgeVariants
  );
  const { removeEdge } = useStoreEdges();
  const getEdgeVariant = useGetEdgeVariant();
  const getVariantIndex = useGetEdgeVariantIndex();
  const getEdgeLabels = useGetEdgeLabels();

  const thisEdge: Edge = useMemo(
    () => allEdges.filter((edge) => edge.id === edgeId)[0],
    [edgeId]
  );

  const deleteEdgeById = useCallback(() => {
    if (edgeId) {
      removeEdge(edgeId);
    }
  }, [edgeId]);

  const edgeVariant: EdgeVariant = useMemo(
    () => getEdgeVariant(thisEdge),
    [thisEdge.data.variantId]
  );

  const variantIndex: number = useMemo(
    () => getVariantIndex(thisEdge),
    [allEdgeVariants, thisEdge.data.variantId]
  );

  const edgeLabels: EdgeLabels = useMemo(
    () => getEdgeLabels(thisEdge),
    [thisEdge.sourceHandle, thisEdge.targetHandle, edgeVariant, variantIndex]
  );

  return {
    // thisEdge,
    deleteEdgeById,
    // edgeVariant,
    // variantIndex,
    edgeLabels,
  };
};
