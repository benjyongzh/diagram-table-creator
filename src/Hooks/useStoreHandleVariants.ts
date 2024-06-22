// redux
import { useAppSelector, useAppDispatch } from "./reduxHooks";
import {
  addHandleVariant as storeAddHandleVariant,
  updateHandleVariant as storeUpdateHandleVariant,
  removeHandleVariantById as storeRemoveHandleVariantById,
} from "Store/handleVariantSlice";

// types
import { HandleVariant, HandleVariantId } from "Types/handles/handleVariant";
import { NodeVariant } from "Types/nodes/nodeVariant";

// hooks
import { useStoreNodeVariants } from "./useStoreNodeVariants";

export const useStoreHandleVariants = () => {
  const dispatch = useAppDispatch();
  const { allNodeVariants } = useStoreNodeVariants();

  const allHandleVariants: HandleVariant[] = useAppSelector(
    (state) => state.handleVariants.handleVariants
  );

  const addHandleVariant = (variant: HandleVariant) => {
    dispatch(storeAddHandleVariant(variant));
  };

  const updateHandleVariant = (variant: HandleVariant) => {
    dispatch(storeUpdateHandleVariant(variant));
  };
  const removeHandleVariantById = (id: HandleVariantId) => {
    dispatch(storeRemoveHandleVariantById(id));
  };

  const removeUnusedHandleVariants = () => {
    const usedVariantIds: HandleVariantId[] = allNodeVariants
      .map((nodeVariant: NodeVariant) => nodeVariant.handleTypes)
      .flat();

    const handleidsToDelete: HandleVariantId[] = [];

    for (let i = 0; i < allHandleVariants.length; i++) {
      if (!usedVariantIds.includes(allHandleVariants[i].id)) {
        handleidsToDelete.push(allHandleVariants[i].id);
      }
    }
    for (let i = 0; i < handleidsToDelete.length; i++) {
      removeHandleVariantById(handleidsToDelete[i]);
    }
  };

  const getHandleVariantFromId = (id: HandleVariantId) =>
    allHandleVariants.filter((variant) => variant.id === id)[0];

  return {
    allHandleVariants,
    addHandleVariant,
    updateHandleVariant,
    removeHandleVariantById,
    removeUnusedHandleVariants,
    getHandleVariantFromId,
  };
};
