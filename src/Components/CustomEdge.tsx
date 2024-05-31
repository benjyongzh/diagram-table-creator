import { memo, useCallback } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  // useReactFlow,
} from "reactflow";

import EdgeLabel from "./EdgeLabel";

import { Button } from "./ui/button";
import { Trash } from "lucide-react";

import { useAppDispatch } from "Hooks/reduxHooks";
import { removeEdge } from "Features/reactFlowSlice";
//styles
import colors from "Types/colorString";

export default memo(
  ({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    selected,
    data,
  }: EdgeProps) => {
    // const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY, offsetX, offsetY] = getSmoothStepPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      borderRadius: 5,
    });
    const dispatch = useAppDispatch();

    // const onEdgeClick = () => {
    // setEdges((edges) => edges.filter((edge) => edge.id !== id));
    // };

    // use id to call reactflowslice action to remove edge
    const onButtonClick = useCallback(() => {
      dispatch(removeEdge(id));
    }, [id]);

    return (
      <>
        <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
        <EdgeLabelRenderer>
          <EdgeLabel
            show={selected || false}
            origin={{ x: sourceX, y: sourceY }}
            label={data.edgeStartLabel}
          />
          <div
            style={{
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              // everything inside EdgeLabelRenderer has no pointer events by default
              // if you have an interactive element, set pointer-events: all
              pointerEvents: "all",
            }}
            className={`flex items-center justify-between gap-1 absolute ps-3 p-1 rounded-lg z-10 menu-text-low-contrast background-low-contrast text-xs nodrag nopan ${
              selected ? "visible" : "invisible"
            }`}
          >
            <span className="mb-1">{id}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onButtonClick}
              type="button"
              className="aspect-square p-0"
            >
              <Trash className="h-4 w-4 text-red-500" />
            </Button>
          </div>
          <EdgeLabel
            show={selected || false}
            origin={{ x: targetX, y: targetY }}
            label={data.edgeEndLabel}
          />
        </EdgeLabelRenderer>
      </>
    );
  }
);
