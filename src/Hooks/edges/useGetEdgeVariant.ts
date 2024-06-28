import { Edge } from "reactflow";
import { EdgeVariant } from "Types/edges/edgeVariant";
import { useAppSelector } from "Hooks/reduxHooks";

export const useGetEdgeVariant = () => {
  const allEdgeVariants: EdgeVariant[] = useAppSelector(
    (state) => state.edgeVariants.edgeVariants
  );
  const getEdgeVariant = (edge: Edge): EdgeVariant =>
    allEdgeVariants.filter((variant) => variant.id === edge.data.variantId)[0];
  return getEdgeVariant;
};
