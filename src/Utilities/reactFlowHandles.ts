import { HandleVariant } from "Types/handleVariant";
import { HandleProps, Position } from "reactflow";
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
        id: `${variant.handleName}-${i}`,
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

export const convertHandlePositionToStyleKey = (pos: Position): string => {
  let key: string;
  switch (pos) {
    case Position.Left:
      key = Position.Top;
      break;
    case Position.Right:
      key = Position.Top;
      break;
    case Position.Top:
      key = Position.Left;
      break;
    case Position.Bottom:
      key = Position.Left;
      break;

    default:
      key = Position.Top;
      break;
  }
  return key.toString().toLowerCase();
};
