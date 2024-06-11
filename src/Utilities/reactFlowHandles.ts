import { HandleVariant } from "Types/handleVariant";
import { HandleProps, Position } from "reactflow";
import {
  groupBy,
  convertObjectGroupingOfArraysToCountLibrary,
} from "./objects";
import { getSpacing } from "Utilities/numbers";
import nodeDimensions from "Types/nodeDimensions";
import { EdgeIdentifier } from "Types/schemas/edgeIdentifier";

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

export type handleSpacingAndArray = {
  spacing: number;
  array: Array<HandleProps>;
};

export const getHandleSpacingAndArrayPerNodeSide = (
  nodeDims: nodeDimensions,
  handleTypes: Array<HandleVariant>
): Record<Position, handleSpacingAndArray> => {
  const positionGrouping: Record<
    string,
    Array<HandleProps>
  > = getHandlePropsGroupingByKey(handleTypes, "position");

  const getHandleCountPerPosition: Record<string, number> =
    convertObjectGroupingOfArraysToCountLibrary(positionGrouping);

  const handleSpacings: Record<Position, number> = {
    [Position.Left]: getSpacing(
      nodeDims.height,
      getHandleCountPerPosition[Position.Left]
    ),
    [Position.Right]: getSpacing(
      nodeDims.height,
      getHandleCountPerPosition[Position.Right]
    ),
    [Position.Top]: getSpacing(
      nodeDims.width,
      getHandleCountPerPosition[Position.Top]
    ),
    [Position.Bottom]: getSpacing(
      nodeDims.width,
      getHandleCountPerPosition[Position.Bottom]
    ),
  };

  return {
    [Position.Left]: {
      spacing: handleSpacings[Position.Left],
      array: positionGrouping[Position.Left],
    },
    [Position.Right]: {
      spacing: handleSpacings[Position.Right],
      array: positionGrouping[Position.Right],
    },
    [Position.Top]: {
      spacing: handleSpacings[Position.Top],
      array: positionGrouping[Position.Top],
    },
    [Position.Bottom]: {
      spacing: handleSpacings[Position.Bottom],
      array: positionGrouping[Position.Bottom],
    },
  };
};

export const formatHandleId = (handleVariant: HandleVariant, index: number) => {
  return `${handleVariant.handleName}-${index}-${handleVariant.connectionType}`;
};

export const getConnectionTypeFromConnectionHandleString = (
  connectionHandleString: string
): EdgeIdentifier => {
  return connectionHandleString.split("-")[2];
};

export const getHandleNameFromConnectionHandleString = (
  connectionHandleString: string
): string => {
  return connectionHandleString.split("-")[0];
};

export const getHandleIndexFromConnectionHandleString = (
  connectionHandleString: string
): number => {
  return parseInt(connectionHandleString.split("-")[1]);
};

export const replaceHandleIdHandleName = (
  handleId: string,
  newHandleName: string
): string => {
  const output: string = handleId
    .split("-")
    .map((part, index) => (index === 0 ? newHandleName : part))
    .join("-");
  return output;
};

export const handleHasIncompatibleConnectionType = (
  handleId: string,
  desiredConnectionType: EdgeIdentifier
): boolean => {
  const targetConnectionType: EdgeIdentifier =
    getConnectionTypeFromConnectionHandleString(handleId);
  return (
    targetConnectionType !== desiredConnectionType &&
    targetConnectionType !== ""
  );
};

export const getEdgeEndLabelFromHandleId = (handleId: string): string => {
  const arr: string[] = handleId.split("-");
  const output: string = arr
    .filter((part, index) => index < arr.length - 1)
    .join("-");
  return output;
};
