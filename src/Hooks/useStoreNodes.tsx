import { Node } from "reactflow";
// redux
import {
  addNode as storeAddNode,
  updateNode as storeUpdateNode,
  removeNodeById,
} from "Store/nodeSlice";

// hooks
import { useAppDispatch } from "Hooks/reduxHooks";

// types
import { standardNodeData } from "Types/nodes/node";
import { NodeData, NodeId } from "Types/nodes/node";

// services
import { createNodeId } from "Services/nodes";

export const useStoreNodes = () => {
  const dispatch = useAppDispatch();
  // const { editEdgesOfNodeVariant } = useStoreEdges();

  const addNode = (newNodeData: NodeData) => {
    const id: NodeId = createNodeId();
    const node: Node = { id, data: { ...newNodeData }, ...standardNodeData };
    dispatch(storeAddNode(node));
  };

  const updateNode = (updatedNode: Node) => {
    dispatch(storeUpdateNode(updatedNode));
  };

  const removeNode = (nodeId: NodeId) => {
    dispatch(removeNodeById(nodeId));
  };

  // const editNodesOfVariant = (change: EditVariant) => {
  //   dispatch(editNodesByVariant(change));
  //   if (nodeConfig.EDITING_VARIANT_EDITS_AFFECTED_EDGES) {
  //     editEdgesOfNodeVariant(change);
  //   }
  // };

  return { addNode, updateNode, removeNode /*editNodesOfVariant*/ };
};
