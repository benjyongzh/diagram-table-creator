import { Node, Edge, Connection, updateEdge } from "reactflow";
import { toast } from "sonner";

//redux
import { removeEdge } from "Features/reactFlowSlice";

// hooks
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";

// config
import edgeConfig from "Configs/edgeConfig";

// utils
import { EditVariant } from "Types/customNodeVariant";
import { nodeIsOfThisVariant } from "Utilities/reactFlowNodes";

export const useStoreEdges = () => {
  const dispatch = useAppDispatch();
  const allNodes: Node[] = useAppSelector(
    (state) => state.reactFlowObjects.nodes
  );
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

  const editEdgesOfNodeVariant = (change: EditVariant) => {
    // narrow down all nodes of this variant
    const nodesToCheck: Node[] = allNodes.filter((node) =>
      nodeIsOfThisVariant(node, change.old)
    );

    //* narrow down all edges of these nodes
    const nodeIds: string[] = nodesToCheck.map((node) => node.id);
    const edgesToCheck: Edge[] = allEdges.filter(
      (edge) => nodeIds.includes(edge.source) || nodeIds.includes(edge.target)
    );

    //* check through each property between change.old and change.new. handleTypes
    if (
      JSON.stringify(change.new.handleTypes) !==
      JSON.stringify(change.old.handleTypes)
    ) {
      //* apply these edges
    }
  };

  // also used by useStoreEdgeById
  const deleteEdge = (edgeId: string) => {
    dispatch(removeEdge(edgeId));
    if (edgeConfig.DELETION_CREATES_TOAST_NOTIFICATION) {
      const edgeToDelete: Edge = allEdges.filter(
        (edge) => edge.id === edgeId
      )[0];
      toast.success("Connection deleted", {
        description: edgeToDelete.data.mainLabel,
      });
    }
  };

  return { editEdgesOfNodeVariant, deleteEdgesOfNode, deleteEdge };
};
