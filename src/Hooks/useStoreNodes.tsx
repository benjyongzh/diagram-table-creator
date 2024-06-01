import { Node } from "reactflow";
import { toast } from "sonner";

//redux
import {
  addNode as addNewNode,
  removeNode,
  editNodesByVariant,
} from "Features/reactFlowSlice";

// hooks
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import { useCallback, useMemo } from "react";

// types
import CustomNodeVariant, { EditVariant } from "Types/customNodeVariant";

//config
import nodeConfig from "Configs/nodeConfig";

//utils
import {
  createNodeFromData,
  getComponentNameTextFromNodeData,
} from "Utilities/reactFlowNodes";

export const useStoreNodes = (nodeId: string) => {
  const dispatch = useAppDispatch();
  const allNodes: Node[] = useAppSelector(
    (state) => state.reactFlowObjects.nodes
  );

  const thisNode: Node | undefined = useAppSelector(
    (state) =>
      state.reactFlowObjects.nodes.filter((node: Node) => node.id === nodeId)[0]
  );

  const nodeHeight = useMemo(
    () => (thisNode ? thisNode.height! : 0),
    [thisNode]
  );
  const nodeWidth = useMemo(() => (thisNode ? thisNode.width! : 0), [thisNode]);

  const addNode = (newNode: CustomNodeVariant) => {
    const node = createNodeFromData(newNode);
    dispatch(addNewNode(node));
  };

  const editNodesOfVariant = (change: EditVariant) => {
    dispatch(editNodesByVariant(change));
  };

  const removeNodeById = useCallback(() => {
    const thisNode: Node = allNodes.filter((node) => node.id === nodeId)[0];
    dispatch(removeNode(thisNode));
    if (nodeConfig.DELETION_CREATES_TOAST_NOTIFICATION) {
      toast.success("Component deleted", {
        description: getComponentNameFromNodeData,
      });
    }
  }, [nodeId]);

  const getComponentNameFromNodeData: string = useMemo(() => {
    return thisNode ? getComponentNameTextFromNodeData(thisNode) : "";
  }, [nodeId]);

  return { nodeHeight, nodeWidth, addNode, removeNodeById, editNodesOfVariant };
};
