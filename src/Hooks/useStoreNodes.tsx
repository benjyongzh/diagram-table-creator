//redux
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import CustomNodeVariant from "Types/customNodeVariant";
import {
  addNode as addNewNode,
  removeNode,
  editNodesByVariant,
} from "Features/reactFlowSlice";
import { createNodeFromData } from "Utilities/reactFlowNodes";
import { EditVariant } from "Types/customNodeVariant";
import { Node } from "reactflow";

export const useStoreNodes = () => {
  const dispatch = useAppDispatch();
  const allNodes: Node[] = useAppSelector(
    (state) => state.reactFlowObjects.nodes
  );

  const addNode = (newNode: CustomNodeVariant) => {
    const node = createNodeFromData(newNode);
    dispatch(addNewNode(node));
  };

  const editNodesOfVariant = (change: EditVariant) => {
    dispatch(editNodesByVariant(change));
  };

  const removeNodeById = (nodeId: string) => {
    const thisNode: Node = allNodes.filter((node) => node.id === nodeId)[0];
    dispatch(removeNode(thisNode));
  };

  return { addNode, removeNodeById, editNodesOfVariant };
};
