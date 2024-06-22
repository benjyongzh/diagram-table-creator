import { CSSProperties, memo, useMemo } from "react";
import {
  Handle,
  NodeProps,
  Position,
  HandleProps,
  useUpdateNodeInternals,
  Edge,
} from "reactflow";
import ButtonStyledIcon from "./ui/ButtonStyledIcon";
import { Modal } from "./modals/Modal";
import { DialogTrigger } from "./ui/dialog";
import { ModalConfirmation } from "./modals/ModalConfirmation";

//config
import nodeConfig, {
  nodeBackgroundBrightnessTailwind,
} from "@/Configs/nodeConfig";

// types
import colors from "Types/colorString";
import { NodeVariant } from "Types/nodes/nodeVariant";
import { HandleVariant } from "Types/handles/handleVariant";

// utils
import {
  convertHandlePositionToStyleKey,
  getHandlePropsGroupingByKey,
  getHandleSpacingAndArrayPerNodeSide,
  handleSpacingAndArray,
  formatHandleId,
} from "@/Services/reactFlowHandles";
import { convertObjectGroupingOfArraysToCountLibrary } from "Utilities/objects";

// hooks
import { useStoreNodeById } from "Hooks/useStoreNodeById";
import { useConnectedEdges } from "Hooks/useConnectedEdges";
import { useStoreNodes } from "Hooks/useStoreNodes";

//styles
import { X } from "lucide-react";
import defaultHandleStyles from "Styles/handle";

export default memo((props: NodeProps) => {
  const { id, data } = props;
  const updateNodeInternals = useUpdateNodeInternals();
  const connectedEdges: Edge[] = useConnectedEdges(id);
  const {
    nodeHeight,
    nodeWidth,
    nodeVariant,
    nodeName,
    handleVariants,
    nodeColor,
  } = useStoreNodeById(id);
  const { removeNodeById } = useStoreNodes();

  // use id to call reactflowslice action to remove node
  const onDeleteButtonClicked = () => removeNodeById(id);

  const handlesGroupings: Record<string, HandleProps[]> = useMemo(
    () => getHandlePropsGroupingByKey(handleVariants, "position"),
    [handleVariants]
  );

  const handleSpacingsAndArray: Record<Position, handleSpacingAndArray> =
    useMemo(
      () =>
        getHandleSpacingAndArrayPerNodeSide(
          { height: nodeHeight, width: nodeWidth },
          handleVariants
        ),
      [nodeHeight, nodeWidth, handleVariants]
    );

  const createArrayOfHandlesWithSpreadPositions =
    (): Array<React.ReactElement> => {
      const finalArr: Array<React.ReactElement> = [];
      if (handleVariants.length < 1) return finalArr;

      const maxHandleCountPerSide: Record<string, number> =
        convertObjectGroupingOfArraysToCountLibrary(handlesGroupings);
      for (let i = 0; i < handleVariants.length; i++) {
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
              id={formatHandleId(data.handleTypes[i], j)}
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

  const modalConfirmationContent = useMemo(
    () => (
      <div className="flex flex-col gap-2">
        <span className="menu-text">{`${data.nodeName} ${data.variantIndex} will be permanently removed from your network. You cannot undo this action.`}</span>
        <span className="menu-text">{`The following connections will also be removed:`}</span>
        <div className="flex flex-col items-start">
          {connectedEdges.map((edge) => (
            <span className="menu-text ml-3">{edge.data.mainLabel}</span>
          ))}
        </div>
      </div>
    ),
    [nodeName, data.variantIndex, connectedEdges]
  );

  return (
    <div
      className={`relative nodeComponent cursor-auto
      flex-col ${
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
        {nodeName} {data.variantIndex}
      </h2>
      {/* <p>
        height: {nodeHeight}, width: {nodeWidth}
      </p> */}
      {nodeConfig.DELETION_REQUIRES_USER_CONFIRMATION ? (
        <Modal
          triggerElement={
            <DialogTrigger>
              <ButtonStyledIcon
                className={`absolute right-1 top-1 rounded-sm -mt-1 -mr-1 ${
                  data.isHovered ? "visible" : "invisible"
                }`}
                type="button"
              >
                <X className="h-4 w-4" />
              </ButtonStyledIcon>
            </DialogTrigger>
          }
          modalContent={
            <ModalConfirmation
              title={`Delete this component?`}
              content={modalConfirmationContent}
              destructive
              action={onDeleteButtonClicked}
            />
          }
        />
      ) : (
        <ButtonStyledIcon
          className={`absolute right-1 top-1 rounded-sm -mt-1 -mr-1 ${
            data.isHovered ? "visible" : "invisible"
          }`}
          onButtonClick={onDeleteButtonClicked}
          type="button"
        >
          <X className="h-4 w-4" />
        </ButtonStyledIcon>
      )}

      {createHandles}
    </div>
  );
});
