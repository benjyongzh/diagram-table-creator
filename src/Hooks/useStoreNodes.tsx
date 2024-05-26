//redux
import { useAppDispatch } from "Hooks/reduxHooks";
import CustomNodeVariant from "Types/customNodeVariant";
import { addNode as addNewNode } from "Features/reactFlowSlice";
import { createNodeFromData } from "Utilities/reactFlowNodes";

export const useStoreNodes = () => {
  const dispatch = useAppDispatch();

  const addNode = (newNode: CustomNodeVariant) => {
    const node = createNodeFromData(newNode);
    dispatch(addNewNode(node));
  };

  return { addNode };
};
