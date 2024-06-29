import { HandleVariant, HandleVariantId } from "Types/handles/handleVariant";
import { NodeVariant } from "Types/nodes/nodeVariant";

import { useStoreHandleVariants } from "./useStoreHandleVariants";
import { useAppSelector } from "Hooks/reduxHooks";

export const useRemoveUnusedHandleVariants = () => {
  const { removeHandleVariantById } = useStoreHandleVariants();
  const allHandleVariants: HandleVariant[] = useAppSelector(
    (state) => state.handleVariants.handleVariants
  );
  const allNodeVariants: NodeVariant[] = useAppSelector(
    (state) => state.nodeVariants.nodeVariants
  );

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
  return removeUnusedHandleVariants;
};
