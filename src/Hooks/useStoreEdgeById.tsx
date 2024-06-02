// hooks
import { useMemo, useCallback } from "react";
// import { useAppDispatch } from "Hooks/reduxHooks";
import { useStoreEdges } from "./useStoreEdges";

import { getEdgeLabelTextFromId } from "Utilities/reactFlowEdges";

export const useStoreEdgeById = (edgeId: string) => {
  // const dispatch = useAppDispatch();
  const { deleteEdge } = useStoreEdges();

  const deleteEdgeById = useCallback(() => {
    if (edgeId) {
      deleteEdge(edgeId);
    }
  }, [edgeId]);

  const edgeLabelText = useMemo(() => getEdgeLabelTextFromId(edgeId), [edgeId]);

  return { edgeLabelText, deleteEdgeById };
};
