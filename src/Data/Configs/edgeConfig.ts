import { MarkerType } from "reactflow";

export const edgeConfig = {
  type: "SmoothStep",
  pathOptions: {
    offset: 0,
    borderRadius: 5,
  },
  markerStart: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: "#FF0072",
  },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    width: 20,
    height: 20,
    color: "#FF0072",
  },
  style: {
    strokeWidth: 2,
    stroke: "#FF0072",
  },
};
