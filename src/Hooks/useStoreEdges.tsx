//redux
import { useMemo, useCallback } from "react";
import { toast } from "sonner";
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import { removeEdge } from "Features/reactFlowSlice";

import { getEdgeLabelTextFromId } from "Utilities/reactFlowEdges";
import edgeConfig from "Configs/edgeConfig";

export const useStoreEdges = (edgeId?: string) => {
  const dispatch = useAppDispatch();
  // const allNodes: Node[] = useAppSelector(
  //   (state) => state.reactFlowObjects.nodes
  // );

  // const addNode = (newNode: CustomNodeVariant) => {
  //   const node = createNodeFromData(newNode);
  //   dispatch(addNewNode(node));
  // };

  // const editNodesOfVariant = (change: EditVariant) => {
  //   dispatch(editNodesByVariant(change));
  // };

  const deleteEdgeById = useCallback(() => {
    if (edgeId) {
      dispatch(removeEdge(edgeId));
      if (edgeConfig.DELETION_CREATES_TOAST_NOTIFICATION) {
        toast.success("Connection deleted", {
          description: getLabelIdFromEdgeId,
        });
      }
    }
  }, [edgeId]);

  const getLabelIdFromEdgeId: string = useMemo(() => {
    return edgeId ? getEdgeLabelTextFromId(edgeId) : "";
  }, [edgeId]);

  return { getLabelIdFromEdgeId, deleteEdgeById };
};
