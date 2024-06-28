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
import { useStoreEdges } from "../useStoreEdges";
import { useGetNodeFromNodeId } from "./useGetNodeFromNodeId";
import { useGetNodeVariant } from "./useGetNodeVariant";

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
  const getNodeFromNodeId = useGetNodeFromNodeId();
  const getNodeVariant = useGetNodeVariant();
  const allNodes: Node[] = useAppSelector((state) => state.nodes.nodes);
  const allEdges: Edge[] = useAppSelector((state) => state.edges.edges);

  const { removeEdge } = useStoreEdges();

  const addNode = (nodeVariant: NodeVariant) => {
    const id: NodeId = createNodeId();
    const newNodeData: NodeData = {
      variantId: nodeVariant.id,
      isHovered: false,
    };
    const node: Node = { id, data: newNodeData, ...standardNodeData };
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
    const thisNode: Node = getNodeFromNodeId(nodeId);
    const thisVariant: NodeVariant = getNodeVariant(thisNode);
    dispatch(storeRemoveNodeById(nodeId));
    if (
      // (!options || options.useToast) &&
      nodeConfig.DELETION_CREATES_TOAST_NOTIFICATION
    ) {
      toast.success("Component deleted", {
        description: thisVariant.nodeName,
      });
    }

    // update nodeVariant Indexes for other nodes of this variant
    refreshVariantIndexesOfNodes(thisVariant);
  };

  const refreshVariantIndexesOfNodes = (variant: NodeVariant) => {
    const nodesToUpdate: Node[] = allNodes.filter(
      (node) => node.data.variantId === variant.id
    );
    for (let i = 0; i < nodesToUpdate.length; i++) {
      const newNode: Node = {
        ...nodesToUpdate[i],
        data: { ...nodesToUpdate[i].data, variantIndex: i + 1 },
      };
      updateNode(newNode);
    }
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
    removeNodeById /*editNodesOfVariant*/,
  };
};
