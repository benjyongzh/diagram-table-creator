import { EdgeIdentifier } from "Types/edges/edgeIdentifier";
import { EdgeVariant } from "Types/edges/edgeVariant";
import { useAppSelector } from "Hooks/reduxHooks";

export const useGetEdgeVariantFromEdgeIdentifier = () => {
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
  return getEdgeVariantFromEdgeIdentifier;
};
