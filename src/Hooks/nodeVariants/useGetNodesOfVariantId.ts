import { NodeVariantId } from "Types/nodes/nodeVariant";
import { Node } from "reactflow";
import { useAppSelector } from "Hooks/reduxHooks";

export const useGetNodesOfVariantId = () => {
  const allNodes: Node[] = useAppSelector((state) => state.nodes.nodes);
  const getNodesOfVariantId = (id: NodeVariantId): Node[] => {
    return allNodes.filter((node: Node) => node.data.variantId === id);
  };
  return getNodesOfVariantId;
};
