//redux
import {
  addNode as addNewNode,
  editNodesByVariant,
} from "Features/reactFlowSlice";

// hooks
import { useAppDispatch } from "Hooks/reduxHooks";

// types
import CustomNodeVariant, { EditVariant } from "Types/customNodeVariant";

//utils
import { createNodeFromData } from "Utilities/reactFlowNodes";

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
