import { memo, useCallback } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  // useReactFlow,
} from "reactflow";

import EdgeLabel from "./EdgeLabel";

import ButtonStyledIcon from "./ui/ButtonStyledIcon";
import { X } from "lucide-react";

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
            className={selected ? "visible" : "invisible"}
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              // everything inside EdgeLabelRenderer has no pointer events by default
              // if you have an interactive element, set pointer-events: all
              pointerEvents: "all",
            }}
            // className="nodrag nopan"
          >
            <ButtonStyledIcon
              className="bg-slate-400 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-500 border-slate-600 dark:border-slate-300 hover:border-2"
              type="button"
              onButtonClick={onButtonClick}
            >
              <X />
            </ButtonStyledIcon>
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
