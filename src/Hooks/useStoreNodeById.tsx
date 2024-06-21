import { Node } from "reactflow";
import { toast } from "sonner";

// hooks
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import { useMemo } from "react";
import { useStoreNodeVariants } from "./useStoreNodeVariants";

// types
import { NodeVariant } from "Types/nodes/nodeVariant";

//config
import nodeConfig from "@/Configs/nodeConfig";

//utils
import { NodeId } from "Types/nodes/node";

export const useStoreNodeById = (nodeId: NodeId) => {
  // const dispatch = useAppDispatch();
  const { allNodeVariants } = useStoreNodeVariants();

  const thisNode: Node | undefined = useAppSelector(
    (state) => state.nodes.nodes.filter((node: Node) => node.id === nodeId)[0]
  );

  const nodeHeight = useMemo(
    () => (thisNode ? thisNode.height! : 0),
    [thisNode]
  );
  const nodeWidth = useMemo(() => (thisNode ? thisNode.width! : 0), [thisNode]);

  const getNodeVariant = (): NodeVariant => {
    return allNodeVariants.filter(
      (variant: NodeVariant) => variant.id === thisNode!.data.variantId
    );
  };

  const getNodeName = (): string => {
    const variant: NodeVariant = getNodeVariant();
    return variant.nodeName;
  };

  return { nodeHeight, nodeWidth, getNodeVariant, getNodeName };
};
