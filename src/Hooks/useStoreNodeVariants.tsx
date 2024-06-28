import { Node } from "reactflow";
//redux
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import {
  addNodeVariant as storeAddNodeVariant,
  updateNodeVariant as storeUpdateNodeVariant,
  removeNodeVariantById as storeRemoveNodeVariantById,
} from "@/Store/nodeVariantSlice";

// types
import {
  NodeVariantData,
  NodeVariant,
  NodeVariantId,
} from "Types/nodes/nodeVariant";
import { HandleVariantId, HandleVariant } from "Types/handles/handleVariant";
import {} from "Types/handles/handleVariant";

// hooks
import { useStoreNodes } from "./nodes/useStoreNodes";
import { useStoreHandleVariants } from "./useStoreHandleVariants";

// configs
import featureFlags from "@/Configs/featureFlags";
import { createNodeVariantId } from "Services/nodeVariants";

export const useStoreNodeVariants = () => {
  const dispatch = useAppDispatch();
  const allNodes: Node[] = useAppSelector((state) => state.nodes.nodes);
  const allNodeVariants: NodeVariant[] = useAppSelector(
    (state) => state.nodeVariants.nodeVariants
  );
  const allHandleVariants: HandleVariant[] = useAppSelector(
    (state) => state.handleVariants.handleVariants
  );

  const { updateNode, removeNodeById } = useStoreNodes();
  const { removeHandleVariantById } = useStoreHandleVariants();

  const addNodeVariant = (newVariantData: NodeVariantData) => {
    // check to make sure there are no other variants of this name
    const nodesWithSameName: NodeVariant[] = allNodeVariants.filter(
      (node: NodeVariant) => node.nodeName === newVariantData.nodeName
    );
    if (nodesWithSameName.length > 0)
      throw `"${newVariantData.nodeName}" already exists.`;

    const id: NodeVariantId = createNodeVariantId();
    const newVariant: NodeVariant = { id, ...newVariantData };

    dispatch(storeAddNodeVariant(newVariant));
  };

  const updateNodeVariant = (variant: NodeVariant) => {
    dispatch(storeUpdateNodeVariant(variant));
    if (featureFlags.EDITING_VARIANTS_CHANGES_EXISTING_NODES) {
      //! update nodes of this variant. variantIndex?
      // const nodesToUpdate: Node[] = getNodesOfVariantId(variant.id);
      // for (let i = 0; i < nodesToUpdate.length; i++) {
      // updateNode
      // }
    }
  };

  const removeNodeVariantById = (id: NodeVariantId) => {
    // delete nodes of this variant
    const nodesToDelete: Node[] = getNodesOfVariantId(id);
    for (let i = 0; i < nodesToDelete.length; i++) {
      removeNodeById(nodesToDelete[i].id);
    }

    // delete handleVariants of this nodeVariant
    const handlesToDelete: HandleVariant[] = getHandleVariantsFromId(id);
    for (let i = 0; i < handlesToDelete.length; i++) {
      removeHandleVariantById(handlesToDelete[i].id);
    }

    // delete this nodeVariant
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

  const getHandleVariantsFromId = (id: NodeVariantId): HandleVariant[] => {
    const variantIds: HandleVariantId[] = getNodeVariantFromId(id).handleTypes;
    return allHandleVariants.filter((variant) =>
      variantIds.includes(variant.id)
    );
  };

  return {
    addNodeVariant,
    updateNodeVariant,
    removeNodeVariantById,
    getNodesOfVariantId,
    getNodeVariantFromId,
    getHandleVariantsFromId,
  };
};
