//redux
import { Node, Edge } from "reactflow";
import { useAppSelector } from "Hooks/reduxHooks";
import { useStoreEdgeById } from "./useStoreEdgeById";

export const useStoreEdges = () => {
  const allEdges: Edge[] = useAppSelector(
    (state) => state.reactFlowObjects.edges
  );

  const deleteEdgesOfNode = (node: Node) => {
    const nodeId: string = node.id;
    console.log("nodeId", nodeId);
    //! allEdges is not being updated enough to detect the edge to delete
    console.log(allEdges);
    const edgesToDelete = allEdges.filter(
      (edge) => edge.source === nodeId || edge.target === nodeId
    );
    console.log(edgesToDelete);
    for (let i = 0; i < edgesToDelete.length; i++) {
      //delete by id
      useStoreEdgeById(edgesToDelete[i].id).deleteEdgeById();
    }
  };

  return { deleteEdgesOfNode };
};
