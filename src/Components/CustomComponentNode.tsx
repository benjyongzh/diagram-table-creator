import { memo, useMemo } from "react";
import { Handle, NodeProps, Edge } from "reactflow";
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

// hooks
import { useStoreNodeById } from "Hooks/nodes/useStoreNodeById";
import { useStoreNodes } from "Hooks/useStoreNodes";
import { useStoreEdges } from "Hooks/useStoreEdges";

//styles
import { X } from "lucide-react";

export default memo((props: NodeProps) => {
  const { id, data } = props;
  const {
    nodeVariant,
    variantIndex,
    nodeName,
    handleVariants,
    nodeColor,
    handles,
    connectedEdges,
  } = useStoreNodeById(id);
  const { removeNodeById } = useStoreNodes();
  const { getEdgeLabels } = useStoreEdges();

  // use id to call reactflowslice action to remove node
  const onDeleteButtonClicked = () => removeNodeById(id);

  const nodeHandles: React.ReactElement[] = handles.map((handlePort) => (
    <Handle
      key={handlePort.id}
      id={handlePort.id}
      type={handlePort.handleType}
      position={handlePort.position} //position should depend on value of handleCount
      isConnectableStart={true}
      isConnectableEnd={true}
      style={handlePort.style}
    />
  ));

  const modalConfirmationContent = useMemo(
    () => (
      <div className="flex flex-col gap-2">
        <span className="menu-text">{`${nodeName} ${variantIndex} will be permanently removed from your network. You cannot undo this action.`}</span>
        <span className="menu-text">{`The following connections will also be removed:`}</span>
        <div className="flex flex-col items-start">
          {connectedEdges.map((edge) => (
            <span className="menu-text ml-3">
              {getEdgeLabels(edge).mainLabel}
            </span>
          ))}
        </div>
      </div>
    ),
    [nodeName, variantIndex, connectedEdges]
  );

  return (
    <div
      className={`relative nodeComponent cursor-auto
      flex-col ${
        data.isHovered
          ? `bg-${colors[nodeColor as keyof typeof colors]}-${
              nodeBackgroundBrightnessTailwind.hover
            }`
          : `bg-${colors[nodeColor as keyof typeof colors]}-${
              nodeBackgroundBrightnessTailwind.normal
            }`
      }`}
    >
      <h2>
        {nodeName} {variantIndex}
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

      {nodeHandles}
    </div>
  );
});
