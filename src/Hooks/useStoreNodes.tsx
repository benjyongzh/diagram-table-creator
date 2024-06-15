//redux
import nodeConfig from "@/Configs/nodeConfig";
import {
  addNode as addNewNode,
  editNodesByVariant,
} from "@/Store/reactFlowSlice";

// hooks
import { useAppDispatch } from "Hooks/reduxHooks";

// types
import CustomNodeVariant, { EditVariant } from "Types/nodes/customNodeVariant";

//utils
import { createNodeFromData } from "@/Services/reactFlowNodes";
import { useStoreEdges } from "./useStoreEdges";

export const useStoreNodes = () => {
  const dispatch = useAppDispatch();
  const { editEdgesOfNodeVariant } = useStoreEdges();

  const addNode = (newNode: CustomNodeVariant) => {
    const node = createNodeFromData(newNode);
    dispatch(addNewNode(node));
  };

  const editNodesOfVariant = (change: EditVariant) => {
    dispatch(editNodesByVariant(change));
    if (nodeConfig.EDITING_VARIANT_EDITS_AFFECTED_EDGES) {
      editEdgesOfNodeVariant(change);
    }
  };

  return { addNode, editNodesOfVariant };
};
