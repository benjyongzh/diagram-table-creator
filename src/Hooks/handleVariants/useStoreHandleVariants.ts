// redux
import { useAppDispatch } from "../reduxHooks";
import {
  addHandleVariant as storeAddHandleVariant,
  updateHandleVariant as storeUpdateHandleVariant,
  removeHandleVariantById as storeRemoveHandleVariantById,
} from "Store/handleVariantSlice";

// types
import { HandleVariant, HandleVariantId } from "Types/handles/handleVariant";

export const useStoreHandleVariants = () => {
  const dispatch = useAppDispatch();

  const addHandleVariant = (variant: HandleVariant) => {
    dispatch(storeAddHandleVariant(variant));
  };

  const updateHandleVariant = (variant: HandleVariant) => {
    dispatch(storeUpdateHandleVariant(variant));
  };

  const removeHandleVariantById = (id: HandleVariantId) => {
    dispatch(storeRemoveHandleVariantById(id));
  };

  return {
    addHandleVariant,
    updateHandleVariant,
    removeHandleVariantById,
  };
};
