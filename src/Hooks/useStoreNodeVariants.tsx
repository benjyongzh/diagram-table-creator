//redux
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import {
  addNewNodeVariant,
  editNodeVariant,
} from "@/Store/customNodeVariantSlice";

// types
import CustomNodeVariant, { EditVariant } from "Types/nodes/customNodeVariant";

// hooks
import { useStoreNodes } from "./useStoreNodes";
import featureFlags from "@/Configs/featureFlags";

export const useStoreNodeVariants = () => {
  const dispatch = useAppDispatch();
  const nodeVariants = useAppSelector(
    (state) => state.customNodeVariants.variants
  );

  const { editNodesOfVariant } = useStoreNodes();

  const addVariant = (newVariant: CustomNodeVariant) => {
    // check to make sure there are no other variants of this name
    const nodesWithSameName = nodeVariants.filter(
      (node) => node.nodeName === newVariant.nodeName
    );
    if (nodesWithSameName.length > 0)
      throw `"${newVariant.nodeName}" already exists.`;

    // await inserting data into DB
    dispatch(addNewNodeVariant(newVariant));
  };

  const editVariant = (editVariantObject: EditVariant) => {
    dispatch(editNodeVariant(editVariantObject));
    if (featureFlags.EDITING_VARIANTS_CHANGES_EXISTING_NODES)
      editNodesOfVariant(editVariantObject);
  };

  return { addVariant, editVariant };
};
