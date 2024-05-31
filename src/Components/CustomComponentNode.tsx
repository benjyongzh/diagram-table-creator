import { CSSProperties, memo, useCallback, useMemo } from "react";
import {
  Handle,
  NodeProps,
  Position,
  HandleProps,
  Node,
  useUpdateNodeInternals,
} from "reactflow";
import ButtonStyledIcon from "./ui/ButtonStyledIcon";

//config
import { nodeBackgroundBrightnessTailwind } from "Configs/nodeConfig";
// utils
import {
  convertHandlePositionToStyleKey,
  getHandlePropsGroupingByKey,
  getHandleSpacingAndArrayPerNodeSide,
  handleSpacingAndArray,
  formatHandleId,
} from "Utilities/reactFlowHandles";
import { convertObjectGroupingOfArraysToCountLibrary } from "Utilities/objects";

// hooks
import { useAppSelector } from "Hooks/reduxHooks";
import { useStoreNodes } from "Hooks/useStoreNodes";

//styles
import { X } from "lucide-react";
import colors from "Types/colorString";
import defaultHandleStyles from "Styles/handle";

export default memo((props: NodeProps) => {
  const { id, data } = props;
  const updateNodeInternals = useUpdateNodeInternals();
  const { removeNodeById } = useStoreNodes();

  const nodeHeight: number = useAppSelector((state) => {
    const thisNode: Node | undefined = state.reactFlowObjects.nodes.filter(
      (node: Node) => node.id === id
    )[0];
    return thisNode ? thisNode.height! : 0;
  });
  const nodeWidth = useAppSelector((state) => {
    const thisNode: Node | undefined = state.reactFlowObjects.nodes.filter(
      (node: Node) => node.id === id
    )[0];
    return thisNode ? thisNode.width! : 0;
  });

  // use id to call reactflowslice action to remove node
  const onDeleteButtonClicked = useCallback(() => {
    removeNodeById(id);
  }, [id]);

  const handlesGroupings: Record<string, HandleProps[]> = useMemo(
    () => getHandlePropsGroupingByKey(data.handleTypes, "position"),
    [data.handleTypes]
  );

  const handleSpacingsAndArray: Record<Position, handleSpacingAndArray> =
    useMemo(
      () =>
        getHandleSpacingAndArrayPerNodeSide(
          { height: nodeHeight, width: nodeWidth },
          data.handleTypes
        ),
      [nodeHeight, nodeWidth, data.handleTypes]
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
          connectionType,
        } = data.handleTypes[i];

        // establish styleKey for this Variant
        const styleKey: string = convertHandlePositionToStyleKey(handlePos);
        // console.log(`style for handle ${handleName}`, styleKey);

        // get spacing for this handleVariant
        const handleSpacing: number =
          handleSpacingsAndArray[handlePos as Position].spacing;
        // console.log(`handleSpacing:`, handleSpacing);

        for (let j = 0; j < data.handleTypes[i].quantity; j++) {
          // j is the index of each <Handle> of this handleVariant}

          // get styling offset for this 1 handle, using maxHandleCountPerSide
          const offset: number = handleSpacing * (j + 1);
          // console.log(`offset for handle ${handleName}-${j}`, offset);
          const handleStyle: CSSProperties = { [styleKey]: offset };

          finalArr.push(
            <Handle
              key={`${handleName}-${j}`}
              id={formatHandleId(
                data.nodeName,
                data.variantIndex,
                data.handleTypes[i],
                j
              )}
              type={handleType}
              position={handlePos} //position should depend on value of handleCount
              isConnectableStart={true}
              isConnectableEnd={true}
              style={{ ...defaultHandleStyles, ...handleStyle }}
            />
          );

          // update the max count
          maxHandleCountPerSide[handlePos] -= 1;
        }
      }
      updateNodeInternals(id);
      return finalArr;
    };

  const createHandles = useMemo(
    () => createArrayOfHandlesWithSpreadPositions(),
    [nodeHeight, nodeWidth, data.handleTypes]
  );

  return (
    <div
      className={`relative nodeComponent flex-col ${
        data.isHovered
          ? `bg-${colors[data.color as keyof typeof colors]}-${
              nodeBackgroundBrightnessTailwind.hover
            }`
          : `bg-${colors[data.color as keyof typeof colors]}-${
              nodeBackgroundBrightnessTailwind.normal
            }`
      }`}
    >
      <h2>
        {data.nodeName} {data.variantIndex}
      </h2>
      {/* <p>
        height: {nodeHeight}, width: {nodeWidth}
      </p> */}
      <ButtonStyledIcon
        className={`absolute right-1 top-1 rounded-sm -mt-1 -mr-1 ${
          data.isHovered ? "visible" : "invisible"
        }`}
        onButtonClick={onDeleteButtonClicked}
        type="button"
      >
        <X className="h-4 w-4" />
      </ButtonStyledIcon>
      {createHandles}
    </div>
  );
});
