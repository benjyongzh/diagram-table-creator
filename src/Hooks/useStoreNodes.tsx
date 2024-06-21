import { Node, Edge, getConnectedEdges } from "reactflow";
import { toast } from "sonner";
// redux
import {
  addNode as storeAddNode,
  updateNode as storeUpdateNode,
  removeNodeById as storeRemoveNodeById,
} from "Store/nodeSlice";

// hooks
import { useAppDispatch, useAppSelector } from "Hooks/reduxHooks";
import { useStoreEdges } from "./useStoreEdges";
import { useStoreNodeVariants } from "./useStoreNodeVariants";

// types
import { standardNodeData } from "Types/nodes/node";
import { NodeData, NodeId } from "Types/nodes/node";
import { EdgeId } from "Types/edges/edge";

// services
import { createNodeId } from "Services/nodes";

// config
import nodeConfig from "Configs/nodeConfig";
import { NodeVariant } from "Types/nodes/nodeVariant";

export const useStoreNodes = () => {
  const dispatch = useAppDispatch();
  const { allEdges, removeEdge } = useStoreEdges();
  const { allNodeVariants } = useStoreNodeVariants();
  const allNodes: Node[] = useAppSelector((state) => state.nodes.nodes);

  const addNode = (newNodeData: NodeData) => {
    const id: NodeId = createNodeId();
    const node: Node = { id, data: { ...newNodeData }, ...standardNodeData };
    dispatch(storeAddNode(node));
  };

  const updateNode = (updatedNode: Node) => {
    dispatch(storeUpdateNode(updatedNode));
  };

  const removeNodeById = (nodeId: NodeId) => {
    // delete edges on this node first
    const edgeIdsToDelete: EdgeId[] = getConnectedEdges([], allEdges).map(
      (edge) => edge.id
    );
    for (let i = 0; i < edgeIdsToDelete.length; i++) {
      removeEdge(edgeIdsToDelete[i]);
    }
    dispatch(storeRemoveNodeById(nodeId));
    const thisNode: Node = getNodeFromNodeId(nodeId);
    if (
      // (!options || options.useToast) &&
      nodeConfig.DELETION_CREATES_TOAST_NOTIFICATION
    ) {
      toast.success("Component deleted", {
        description: getNodeName(thisNode),
      });
    }
  };

  const getNodeFromNodeId = (nodeId: NodeId): Node => {
    return allNodes.filter((node) => node.id === nodeId)[0];
  };

  const getNodeVariant = (node: Node): NodeVariant => {
    return allNodeVariants.filter(
      (variant: NodeVariant) => variant.id === node.data.variantId
    );
  };

  const getNodeName = (node: Node): string => {
    const variant: NodeVariant = getNodeVariant(node);
    return variant.nodeName;
  };

  // const editNodesOfVariant = (change: EditVariant) => {
  //   dispatch(editNodesByVariant(change));
  //   if (nodeConfig.EDITING_VARIANT_EDITS_AFFECTED_EDGES) {
  //     editEdgesOfNodeVariant(change);
  //   }
  // };

  return {
    addNode,
    updateNode,
    removeNodeById,
    getNodeFromNodeId,
    getNodeVariant,
    getNodeName /*editNodesOfVariant*/,
  };
};
