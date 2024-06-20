// hooks
import { EdgeVariant, EdgeVariantId } from "Types/edges/edgeVariant";
import { useAppSelector } from "./reduxHooks";
import { EdgeIdentifier } from "Types/edges/edgeIdentifier";

export const useStoreEdgeVariants = () => {
  const allEdgeVariants: EdgeVariant[] = useAppSelector(
    (state) => state.edgeVariants.edgeVariants
  );

  const getEdgeVariantFromEdgeIdentifier = (
    edgeIdentifier: EdgeIdentifier
  ): EdgeVariant => {
    return allEdgeVariants.filter(
      (variant) => variant.edgeIdentifier === edgeIdentifier
    )[0];
  };

  return { getEdgeVariantFromEdgeIdentifier };
};
