import { CSSProperties, memo, useCallback, useEffect, useMemo } from "react";
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
import {
  // flattenHandleVariantArrayIntoHandlePropsArray,
  convertHandlePositionToStyleKey,
  getHandlePropsGroupingByKey,
  getHandleSpacingAndArrayPerNodeSide,
  handleSpacingAndArray,
} from "Utilities/reactFlowHandles";
import { convertObjectGroupingOfArraysToCountLibrary } from "Utilities/objects";

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

  const onDeleteButtonClicked = useCallback(() => {}, []);

  // const handleArray: Array<HandleProps> = useMemo(
  //   () => flattenHandleVariantArrayIntoHandlePropsArray(data.handleTypes),
  //   [data.handleTypes]
  // );

  const handlesGroupings: Record<string, HandleProps[]> = useMemo(
    () => getHandlePropsGroupingByKey(data.handleTypes, "position"),
    [data.handleTypes]
  );

  const handleSpacingsAndArray: Record<Position, handleSpacingAndArray> =
    useMemo(
      () =>
        getHandleSpacingAndArrayPerNodeSide(nodeDimensions, data.handleTypes),
      [nodeDimensions, data.handleTypes]
    );

  const createArrayOfHandlesWithSpreadPositions =
    (): Array<React.ReactElement> => {
      const finalArr: Array<React.ReactElement> = [];
      if (data.handleTypes.length < 1) return finalArr;

      const maxHandleCountPerSide: Record<string, number> =
        convertObjectGroupingOfArraysToCountLibrary(handlesGroupings);
      for (let i = 0; i < data.handleTypes.length; i++) {
        // i is the index of each handleVariant

        // get info of this handleVariant
        const {
          handleType,
          handleName,
          position: handlePos,
        } = data.handleTypes[i];

        // establish styleKey for this Variant
        const styleKey: string = convertHandlePositionToStyleKey(handlePos);

        // get spacing for this handleVariant
        const handleSpacing: number =
          handleSpacingsAndArray[handlePos as Position].spacing;
        console.log(handleSpacing);

        for (let j = 0; j < data.handleTypes[i].quantity; j++) {
          // j is the index of each <Handle> of this handleVariant}

          // get styling offset for this 1 handle, using maxHandleCountPerSide
          const offset: number = handleSpacing * (j + 1);
          console.log(offset);
          const handleStyle: CSSProperties = { [styleKey]: offset };

          finalArr.push(
            <Handle
              key={`${handleName}-${j}`}
              id={`${data.nodeName}-${data.variantIndex}-${handleName}-${j}`}
              type={handleType}
              position={handlePos} //position should depend on value of handleCount
              isConnectableStart={true}
              isConnectableEnd={true}
              style={handleStyle}
            />
          );

          // update the max count
          maxHandleCountPerSide[handlePos] -= 1;
        }
      }

      return finalArr;
    };

  const createHandles = useMemo(
    () => createArrayOfHandlesWithSpreadPositions(),
    [nodeDimensions, data.handleTypes]
  );

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
      {createHandles}
    </div>
  );
});
