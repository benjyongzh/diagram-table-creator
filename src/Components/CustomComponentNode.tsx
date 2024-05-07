import React, { memo, useCallback, useEffect, useMemo } from "react";
import {
  Handle,
  NodeProps,
  // useUpdateNodeInternals,
  Position,
  HandleProps,
} from "reactflow";
import { XMarkIcon } from "@heroicons/react/16/solid";
import colors from "Types/colorString";
import { nodeBackgroundBrightnessTailwind } from "Configs/nodeConfig";
import { HandleVariant } from "Types/handleVariant";
// import mapHandlePositionToStyle from "Styles/handle";
import { useAppSelector } from "Hooks/reduxHooks";
import nodeDimensions from "Types/nodeDimenions";
import { Node } from "reactflow";
import { convertObjectGroupingOfArraysToCountLibrary } from "Utilities/objects";
import {
  getHandlePropsGroupingByKey,
  convertHandlePositionToStyleKey,
} from "Utilities/reactFlowHandles";
import { getSpacing } from "Utilities/numbers";

// export default memo(({ id, data }: { id: string; data: CustomNodeVariant }) => {
export default memo((props: NodeProps) => {
  const { id, data } = props;
  // const updateNodeInternals = useUpdateNodeInternals();
  // useEffect(() => {
  //   updateNodeInternals(id);
  // }, [data.handleTypes]);

  const nodeDimensions: nodeDimensions = {
    height: useAppSelector(
      (state) =>
        state.reactFlowObjects.nodes.filter((node: Node) => node.id === id)[0]
          .height
    ),
    width: useAppSelector(
      (state) =>
        state.reactFlowObjects.nodes.filter((node: Node) => node.id === id)[0]
          .width
    ),
  };

  const onDeleteButtonClicked = () => {};

  const getHandleSpacingPerNodeSide = (): Record<Position, number> => {
    const positionGrouping: Record<
      string,
      Array<HandleProps>
    > = getHandlePropsGroupingByKey(data.handleTypes, "position");

    const getHandleCountPerPosition: Record<string, number> =
      convertObjectGroupingOfArraysToCountLibrary(positionGrouping);

    const handleSpacings: Record<Position, number> = {
      [Position.Left]: getSpacing(
        nodeDimensions.height,
        getHandleCountPerPosition[Position.Left]
      ),
      [Position.Right]: getSpacing(
        nodeDimensions.height,
        getHandleCountPerPosition[Position.Right]
      ),
      [Position.Top]: getSpacing(
        nodeDimensions.width,
        getHandleCountPerPosition[Position.Top]
      ),
      [Position.Bottom]: getSpacing(
        nodeDimensions.width,
        getHandleCountPerPosition[Position.Bottom]
      ),
    };

    return handleSpacings;

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

    // return {
    //   [Position.Left]: {
    //     spacing: handleSpacings[Position.Left],
    //     array: positionGrouping[Position.Left],
    //   },
    //   [Position.Right]: {
    //     spacing: handleSpacings[Position.Right],
    //     array: positionGrouping[Position.Right],
    //   },
    //   [Position.Top]: {
    //     spacing: handleSpacings[Position.Top],
    //     array: positionGrouping[Position.Top],
    //   },
    //   [Position.Bottom]: {
    //     spacing: handleSpacings[Position.Bottom],
    //     array: positionGrouping[Position.Bottom],
    //   },
    // };
  };

  const handleSpacings = useMemo(getHandleSpacingPerNodeSide, [
    data.handleTypes,
    nodeDimensions,
  ]);

  return (
    <div
      className={`nodeComponent flex-col ${
        data.isHovered
          ? `bg-${colors[data.color]}-${nodeBackgroundBrightnessTailwind.hover}`
          : `bg-${colors[data.color]}-${
              nodeBackgroundBrightnessTailwind.normal
            }`
      }`}
    >
      <h2>
        {data.nodeName} {data.variantIndex}
      </h2>
      <p>
        height: {nodeDimensions.height}, width: {nodeDimensions.width}
      </p>
      <div className={`${data.isHovered ? "visible" : "invisible"}`}>
        <button
          className="btn btn-circle btn-ghost btn-xs btn-error"
          onClick={onDeleteButtonClicked}
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />;
        </button>
      </div>
      {data.handleTypes.map((handleType: HandleVariant) =>
        Array.from({ length: handleType.quantity }).map((_item, index) => {
          const handleStyle = {
            [convertHandlePositionToStyleKey(handleType.position)]:
              index * handleSpacings[handleType.position],
          };

          return (
            <Handle
              key={index}
              id={`${data.nodeName}-${data.variantIndex}-${
                handleType.handleName
              }-${index.toString()}`}
              type={handleType.handleType}
              position={handleType.position} //position should depend on value of handleCount
              isConnectableStart={true}
              isConnectableEnd={true}
              style={handleStyle}
            />
          );
        })
      )}
    </div>
  );
});
