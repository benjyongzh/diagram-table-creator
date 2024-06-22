import { Node } from "reactflow";
import { toast } from "sonner";
import colors from "../colorString";

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
import { HandleVariant } from "Types/handles/handleVariant";

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

  const nodeVariant: NodeVariant = useMemo(
    () =>
      allNodeVariants.filter(
        (variant: NodeVariant) => variant.id === thisNode!.data.variantId
      ),
    [thisNode]
  );

  const nodeName: string = useMemo(() => nodeVariant.nodeName, [nodeVariant]);

  const handleVariants: HandleVariant[] = useMemo(
    () => nodeVariant.handleTypes,
    [nodeVariant]
  );

  const nodeColor: colors = useMemo(() => nodeVariant.color, [nodeVariant]);

  return {
    nodeHeight,
    nodeWidth,
    nodeVariant,
    nodeName,
    handleVariants,
    nodeColor,
  };
};
