//redux
import { useAppDispatch } from "Hooks/reduxHooks";
import CustomNodeVariant from "Types/customNodeVariant";
import {
  addNode as addNewNode,
  editNodesByVariant,
} from "Features/reactFlowSlice";
import { createNodeFromData } from "Utilities/reactFlowNodes";
import { EditVariant } from "Types/customNodeVariant";

export const useStoreNodes = () => {
  const dispatch = useAppDispatch();

  const addNode = (newNode: CustomNodeVariant) => {
    const node = createNodeFromData(newNode);
    dispatch(addNewNode(node));
  };

  const editNodesOfVariant = (change: EditVariant) => {
    dispatch(editNodesByVariant(change));
  };

  return { addNode, editNodesOfVariant };
};
