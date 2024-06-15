import { Node } from "reactflow";
import { toast } from "sonner";

//redux
import { removeNode } from "@/Store/reactFlowSlice";

// hooks
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import { useMemo } from "react";
import { useStoreEdges } from "./useStoreEdges";

// types
import { reduxObjectsHookOptions } from "Types/reduxObjectsHookOptions";

//config
import nodeConfig from "@/Configs/nodeConfig";

//utils
import { getComponentNameTextFromNodeData } from "@/Services/reactFlowNodes";

export const useStoreNodeById = (nodeId: string) => {
  const dispatch = useAppDispatch();
  const { deleteEdgesOfNode } = useStoreEdges();

  const thisNode: Node | undefined = useAppSelector(
    (state) =>
      state.reactFlowObjects.nodes.filter((node: Node) => node.id === nodeId)[0]
  );

  const nodeHeight = useMemo(
    () => (thisNode ? thisNode.height! : 0),
    [thisNode]
  );
  const nodeWidth = useMemo(() => (thisNode ? thisNode.width! : 0), [thisNode]);

  const removeNodeById = (options?: reduxObjectsHookOptions) => {
    if (!thisNode) return;
    if (nodeConfig.DELETION_DELETES_AFFECTED_EDGES) {
      deleteEdgesOfNode(thisNode);
    }
    dispatch(removeNode(thisNode));
    if (
      (!options || options.useToast) &&
      nodeConfig.DELETION_CREATES_TOAST_NOTIFICATION
    ) {
      toast.success("Component deleted", {
        description: getComponentNameFromNodeData,
      });
    }
  };

  const getComponentNameFromNodeData: string = useMemo(() => {
    return thisNode ? getComponentNameTextFromNodeData(thisNode) : "";
  }, [nodeId]);

  return { nodeHeight, nodeWidth, removeNodeById };
};
