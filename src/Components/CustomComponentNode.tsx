import { memo, useMemo } from "react";
import { getConnectedEdges, Handle, NodeProps, Edge } from "reactflow";
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
import { useGetEdgeLabels } from "Hooks/edges/useGetEdgeLabels";
import { useStoreNodes } from "Hooks/nodes/useStoreNodes";
import { useAppSelector } from "Hooks/reduxHooks";

//styles
import { X } from "lucide-react";

export default memo((props: NodeProps) => {
  const { id, data } = props;
  const {
    thisNode,
    nodeHeight,
    nodeWidth,
    nodeVariant,
    variantIndex,
    handleVariants,
    createHandlePorts,
  } = useStoreNodeById(id);
  const { removeNodeById } = useStoreNodes();
  const getEdgeLabels = useGetEdgeLabels();
  // const updateNodeInternals = useUpdateNodeInternals();

  // use id to call reactflowslice action to remove node
  const onDeleteButtonClicked = () => removeNodeById(id);

  const allEdges: Edge[] = useAppSelector((state) => state.edges.edges);

  const nodeHandles: React.ReactElement[] = useMemo(
    () =>
      createHandlePorts().map((handlePort) => (
        <Handle
          key={handlePort.id}
          id={handlePort.id}
          type={handlePort.handleType}
          position={handlePort.position} //position should depend on value of handleCount
          isConnectableStart={true}
          isConnectableEnd={true}
          style={handlePort.style}
        />
      )),
    [nodeHeight, nodeWidth, handleVariants]
  );

  const connectedEdges: Edge[] = useMemo(
    () => (thisNode ? getConnectedEdges([thisNode], allEdges) : []),
    [allEdges.length]
  );

  const modalConfirmationContent = useMemo(
    () => (
      <div className="flex flex-col gap-2">
        <span className="menu-text">{`${
          nodeVariant
            ? nodeVariant.nodeName
            : `This ${nodeConfig.UNKNOWN_NODE_VARIANT_STRING}`
        } ${
          variantIndex
            ? variantIndex
            : `of ${nodeConfig.UNKNOWN_VARIANT_INDEX_STRING}`
        } will be permanently removed from your network. You cannot undo this action.`}</span>
        {connectedEdges.length ? (
          <span className="menu-text">{`The following connections will also be removed:`}</span>
        ) : null}
        {connectedEdges.length ? (
          <div className="flex flex-col items-start">
            {connectedEdges.map((edge) => (
              <span className="menu-text ml-3">
                {getEdgeLabels(edge).mainLabel}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    ),
    [nodeVariant, variantIndex, connectedEdges]
  );

  return (
    <div
      className={`relative nodeComponent cursor-auto
      flex-col ${
        data.isHovered
          ? `bg-${colors[nodeVariant.color as keyof typeof colors]}-${
              nodeBackgroundBrightnessTailwind.hover
            }`
          : `bg-${colors[nodeVariant.color as keyof typeof colors]}-${
              nodeBackgroundBrightnessTailwind.normal
            }`
      }`}
    >
      <h2>
        {nodeVariant
          ? nodeVariant.nodeName
          : nodeConfig.UNKNOWN_NODE_VARIANT_STRING}{" "}
        {variantIndex && variantIndex}
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
