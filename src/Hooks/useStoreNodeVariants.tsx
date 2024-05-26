//redux
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import {
  addNewNodeVariant,
  editNodeVariant,
} from "Features/customNodeVariantSlice";
import CustomNodeVariant, { EditVariant } from "Types/customNodeVariant";

export const useStoreNodeVariants = () => {
  const dispatch = useAppDispatch();
  const nodeVariants = useAppSelector(
    (state) => state.customNodeVariants.variants
  );

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
  };

  return { addVariant, editVariant };
};
