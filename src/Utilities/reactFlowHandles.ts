import { HandleVariant } from "Types/handleVariant";
import { HandleProps, Position } from "reactflow";
import {
  groupBy,
  convertObjectGroupingOfArraysToCountLibrary,
} from "./objects";
import { getSpacing } from "Utilities/numbers";
import nodeDimensions from "Types/nodeDimenions";
import React from "react";

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

  // return handleSpacings;

  // const handleGroups: Record<Position, Array<HandleProps>> = {
  //   [Position.Left]: positionGrouping[Position.Left],
  //   [Position.Right]: positionGrouping[Position.Right],
  //   [Position.Top]: positionGrouping[Position.Top],
  //   [Position.Bottom]: positionGrouping[Position.Bottom],
  // };

  // for (const side in handleGroups) {
  //   const handleArray: Array<HandleProps> = handleGroups[side as Position];
  //   const sideStyle = side.toString().toLocaleLowerCase();
  //   for (let i = 0; i < handleArray.length; i++) {
  //     const spacing = (i + 1) * handleSpacings[side as Position];
  //     finalArr.push(
  //       <Handle
  //         key={i}
  //         id={handleArray[i].id}
  //         type={handleArray[i].type}
  //         position={handleArray[i].position} //position should depend on value of handleCount
  //         isConnectableStart={true}
  //         isConnectableEnd={true}
  //         style={{ [sideStyle]: spacing }}
  //       />
  //     );
  //   }
  // }

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
