import { HandleVariant, HandleVariantId } from "Types/handles/handleVariant";
import { useAppSelector } from "Hooks/reduxHooks";

export const useGetHandleVariantFromId = () => {
  const allHandleVariants: HandleVariant[] = useAppSelector(
    (state) => state.handleVariants.handleVariants
  );

  const getHandleVariantFromId = (id: HandleVariantId) =>
    allHandleVariants.filter((variant) => variant.id === id)[0];
  return getHandleVariantFromId;
};
