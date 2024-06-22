import { Node } from "reactflow";
//redux
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import {
  addNodeVariant as storeAddNodeVariant,
  updateNodeVariant as storeUpdateNodeVariant,
  removeNodeVariantById as storeRemoveNodeVariantById,
} from "@/Store/nodeVariantSlice";

// types
import { NodeVariant, NodeVariantId } from "Types/nodes/nodeVariant";

// hooks
import { useStoreNodes } from "./useStoreNodes";
import featureFlags from "@/Configs/featureFlags";
import { HandleVariant } from "Types/handles/handleVariant";

export const useStoreNodeVariants = () => {
  const dispatch = useAppDispatch();
  const allNodeVariants = useAppSelector(
    (state) => state.nodeVariants.nodeVariants
  );

  const { allNodes, updateNode, removeNodeById } = useStoreNodes();

  const addNodeVariant = (newVariant: NodeVariant) => {
    // check to make sure there are no other variants of this name
    const nodesWithSameName: NodeVariant[] = allNodeVariants.filter(
      (node: NodeVariant) => node.nodeName === newVariant.nodeName
    );
    if (nodesWithSameName.length > 0)
      throw `"${newVariant.nodeName}" already exists.`;

    dispatch(storeAddNodeVariant(newVariant));
  };

  const updateNodeVariant = (variant: NodeVariant) => {
    dispatch(storeUpdateNodeVariant(variant));
    if (featureFlags.EDITING_VARIANTS_CHANGES_EXISTING_NODES) {
      //! update nodes of this variant
      // const nodesToUpdate: Node[] = getNodesOfVariantId(variant.id);
      // for (let i = 0; i < nodesToUpdate.length; i++) {
      // updateNode
      // }
    }
  };

  const removeNodeVariantById = (id: NodeVariantId) => {
    const nodesToDelete: Node[] = getNodesOfVariantId(id);
    for (let i = 0; i < nodesToDelete.length; i++) {
      removeNodeById(nodesToDelete[i].id);
    }
    dispatch(storeRemoveNodeVariantById(id));
  };

  const getNodesOfVariantId = (id: NodeVariantId): Node[] => {
    return allNodes.filter((node: Node) => node.data.variantId === id);
  };

  const getNodeVariantFromId = (id: NodeVariantId): NodeVariant => {
    return allNodeVariants.filter(
      (variant: NodeVariant) => variant.id === id
    )[0];
  };

  return {
    allNodeVariants,
    addNodeVariant,
    updateNodeVariant,
    removeNodeVariantById,
    getNodesOfVariantId,
    getNodeVariantFromId,
  };
};
