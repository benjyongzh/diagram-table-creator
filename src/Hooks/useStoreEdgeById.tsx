//redux
import { useMemo, useCallback } from "react";
import { toast } from "sonner";
import { useAppDispatch } from "Hooks/reduxHooks";
import { removeEdge } from "Features/reactFlowSlice";

import { getEdgeLabelTextFromId } from "Utilities/reactFlowEdges";
import edgeConfig from "Configs/edgeConfig";

export const useStoreEdgeById = (edgeId: string) => {
  const dispatch = useAppDispatch();

  const deleteEdgeById = () =>
    useCallback(() => {
      if (edgeId) {
        dispatch(removeEdge(edgeId));
        if (edgeConfig.DELETION_CREATES_TOAST_NOTIFICATION) {
          toast.success("Connection deleted", {
            description: getLabelIdFromEdgeId,
          });
        }
      }
    }, [edgeId]);

  const edgeLabelText = useMemo(() => getEdgeLabelTextFromId(edgeId), [edgeId]);

  return { edgeLabelText, deleteEdgeById };
};
