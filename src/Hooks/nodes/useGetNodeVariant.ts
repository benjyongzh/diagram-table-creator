import { NodeVariant } from "Types/nodes/nodeVariant";
import { useAppSelector } from "Hooks/reduxHooks";
import { Node } from "reactflow";

export const useGetNodeVariant = () => {
  const allNodeVariants: NodeVariant[] = useAppSelector(
    (state) => state.nodeVariants.nodeVariants
  );
  const getNodeVariant = (node: Node): NodeVariant =>
    allNodeVariants.filter(
      (variant: NodeVariant) => variant.id === node.data.variantId
    )[0];
  return getNodeVariant;
};
