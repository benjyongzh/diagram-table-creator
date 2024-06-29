import { EdgeVariantId } from "Types/edges/edgeVariant";
import { Edge } from "reactflow";
import { useAppSelector } from "Hooks/reduxHooks";

export const useGetEdgesOfVariantId = () => {
  const allEdges: Edge[] = useAppSelector((state) => state.edges.edges);
  const getEdgesOfVariantId = (id: EdgeVariantId): Edge[] => {
    return allEdges.filter((edge) => edge.data.variantId === id);
  };
  return getEdgesOfVariantId;
};
