import { EdgeVariantId } from "Types/edges/edgeVariant";
import { HandleVariant } from "Types/handles/handleVariant";
import { useAppSelector } from "Hooks/reduxHooks";
import { useStoreHandleVariants } from "./useStoreHandleVariants";

export const useSetEdgeVariantIdOfHandleVariant = () => {
  const { updateHandleVariant } = useStoreHandleVariants();
  const allHandleVariants: HandleVariant[] = useAppSelector(
    (state) => state.handleVariants.handleVariants
  );
  const setEdgeVariantIdOfHandleVariant = (args: {
    initialEdgeVariantId: EdgeVariantId;
    finalEdgeVariantId: EdgeVariantId;
  }) => {
    const handlesToUpdate: HandleVariant[] = allHandleVariants.filter(
      (variant) => variant.edgeVariantId === args.initialEdgeVariantId
    );
    for (let i = 0; i < handlesToUpdate.length; i++) {
      const updatedVariant: HandleVariant = {
        ...handlesToUpdate[i],
        edgeVariantId: args.finalEdgeVariantId,
      };
      updateHandleVariant(updatedVariant);
    }
  };
  return setEdgeVariantIdOfHandleVariant;
};
