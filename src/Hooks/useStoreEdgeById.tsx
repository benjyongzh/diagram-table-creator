// hooks
import { useMemo, useCallback } from "react";
// import { useAppDispatch } from "Hooks/reduxHooks";
import { useStoreEdges } from "./useStoreEdges";

export const useStoreEdgeById = (edgeId: string) => {
  // const dispatch = useAppDispatch();
  const { deleteEdge } = useStoreEdges();

  const deleteEdgeById = useCallback(() => {
    if (edgeId) {
      deleteEdge(edgeId);
    }
  }, [edgeId]);

  const getEdgeVariant = (): EdgeVariant => {
    console.log(`use ${edgeId}`);
  };

  return { deleteEdgeById, getEdgeVariant };
};
