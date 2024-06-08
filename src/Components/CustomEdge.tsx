import { memo, useMemo } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  // useReactFlow,
} from "reactflow";

// components
import EdgeLabel from "./EdgeLabel";
import { Modal } from "./modals/Modal";
import { ModalConfirmation } from "./modals/ModalConfirmation";
import { DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

// config
import edgeConfig from "Configs/edgeConfig";

// hooks
import { useStoreEdgeById } from "Hooks/useStoreEdgeById";
import { useEdgeData } from "Hooks/useEdgeData";

// styles
import { Trash } from "lucide-react";
import colors from "Types/colorString";

export default memo(
  ({
    id,
    sourceX,
    source,
    target,
    sourceHandleId,
    targetHandleId,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    selected,
  }: EdgeProps) => {
    const { deleteEdgeById } = useStoreEdgeById(id);
    const [edgePath, labelX, labelY, offsetX, offsetY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      borderRadius: edgeConfig.SMOOTHSTEP_BORDER_RADIUS,
    });

    const { edgeData } = useEdgeData(id);

    // const onEdgeClick = () => {
    // setEdges((edges) => edges.filter((edge) => edge.id !== id));
    // };

    // use id to call reactflowslice action to remove edge
    const onButtonClick = deleteEdgeById;

    return (
      <>
        <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
        <EdgeLabelRenderer>
          <EdgeLabel
            show={selected || false}
            origin={{ x: sourceX, y: sourceY }}
            label={edgeData.edgeStartLabel}
          />
          <div
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              // everything inside EdgeLabelRenderer has no pointer events by default
              // if you have an interactive element, set pointer-events: all
              pointerEvents: "all",
            }}
            className={`flex items-center justify-between gap-2 absolute ps-3 p-1 rounded-lg z-10 menu-text-low-contrast background-low-contrast text-xs nodrag nopan ${
              selected ? "visible" : "invisible"
            }`}
          >
            <span className="mb-[1px]">{edgeData.mainLabel}</span>
            {edgeConfig.DELETION_REQUIRES_USER_CONFIRMATION ? (
              <Modal
                triggerElement={
                  <DialogTrigger>
                    <Button
                      variant="ghost"
                      size="sm"
                      type="button"
                      className="aspect-square p-0"
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </DialogTrigger>
                }
                modalContent={
                  <ModalConfirmation
                    title={`Delete this connection?`}
                    text={`Connection ${edgeData.mainLabel} will be permanently removed from your network. You cannot undo this action.`}
                    destructive
                    action={onButtonClick}
                  />
                }
              />
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={onButtonClick}
                type="button"
                className="aspect-square p-0"
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            )}
          </div>
          <EdgeLabel
            show={selected || false}
            origin={{ x: targetX, y: targetY }}
            label={edgeData.edgeEndLabel}
          />
        </EdgeLabelRenderer>
      </>
    );
  }
);
