import { memo } from "react";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  // useReactFlow,
} from "reactflow";

// import "./buttonedge.css";
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

    const onEdgeClick = () => {
      // setEdges((edges) => edges.filter((edge) => edge.id !== id));
    };

    return (
      <>
        <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
        <EdgeLabelRenderer>
          <div
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
            <button onClick={onEdgeClick}>×</button>
          </div>
        </EdgeLabelRenderer>
      </>
    );
  }
);
