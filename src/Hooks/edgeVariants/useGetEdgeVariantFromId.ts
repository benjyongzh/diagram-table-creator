import { EdgeVariant, EdgeVariantId } from "Types/edges/edgeVariant";
import { useAppSelector } from "Hooks/reduxHooks";

export const useGetEdgeVariantFromId = () => {
  const allEdgeVariants: EdgeVariant[] = useAppSelector(
    (state) => state.edgeVariants.edgeVariants
  );
  const getEdgeVariantFromId = (id: EdgeVariantId) =>
    allEdgeVariants.filter((variant) => variant.id === id)[0];
  return getEdgeVariantFromId;
};
