import { HandleVariant } from "Types/handleVariant";
import { HandleProps } from "reactflow";
import { groupBy } from "./objects";

export const flattenHandleVariantArrayIntoHandlePropsArray = <
  T extends HandleVariant
>(
  arr: Array<T>
): Array<HandleProps> => {
  const newArr: HandleProps[] = [];
  arr.forEach((variant) => {
    for (let i = 0; i < variant.quantity; i++) {
      const handle: HandleProps = {
        type: variant.handleType,
        position: variant.position,
        isConnectableStart: true,
        isConnectableEnd: true,
      };
      newArr.push(handle);
    }
  });
  return newArr;
};

export const getHandlePropsGroupingByKey = (
  handleTypes: HandleVariant[],
  key: string
): Record<string, HandleProps[]> => {
  const handlePropsArray: Array<HandleProps> =
    flattenHandleVariantArrayIntoHandlePropsArray(handleTypes);
  const groupedHandlePropsArray: Record<string, HandleProps[]> = groupBy(
    handlePropsArray,
    key
  );
  return groupedHandlePropsArray;
};
