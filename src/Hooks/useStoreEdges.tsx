import { Node, Edge } from "reactflow";
import { toast } from "sonner";

//redux
import { removeEdge } from "Features/reactFlowSlice";

// hooks
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";

// config
import edgeConfig from "Configs/edgeConfig";

// utils
import { getEdgeLabelTextFromId } from "Utilities/reactFlowEdges";

export const useStoreEdges = () => {
  const dispatch = useAppDispatch();
  const allEdges: Edge[] = useAppSelector(
    (state) => state.reactFlowObjects.edges
  );

  const deleteEdgesOfNode = (node: Node) => {
    const nodeId: string = node.id;
    const edgesToDelete = allEdges.filter(
      (edge) => edge.source === nodeId || edge.target === nodeId
    );
    for (let i = 0; i < edgesToDelete.length; i++) {
      //delete by id
      deleteEdge(edgesToDelete[i].id);
    }
  };

  // also used by useStoreEdgeById
  const deleteEdge = (edgeId: string) => {
    dispatch(removeEdge(edgeId));
    if (edgeConfig.DELETION_CREATES_TOAST_NOTIFICATION) {
      toast.success("Connection deleted", {
        description: getEdgeLabelTextFromId(edgeId),
      });
    }
  };

  return { deleteEdgesOfNode, deleteEdge };
};
