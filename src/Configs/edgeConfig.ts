// import { MarkerType } from "reactflow";

// export const edgeConfig = {
//   type: "SmoothStep",
//   pathOptions: {
//     offset: 0,
//     borderRadius: 5,
//   },
//   markerStart: {
//     type: MarkerType.ArrowClosed,
//     width: 20,
//     height: 20,
//     color: "#FF0072",
//   },
//   markerEnd: {
//     type: MarkerType.ArrowClosed,
//     width: 20,
//     height: 20,
//     color: "#FF0072",
//   },
//   style: {
//     strokeWidth: 2,
//     stroke: "#FF0072",
//   },
// };

const edgeConfig = {
  INITIAL_CUSTOM_EDGE_NAME: "myEdge",
  FREE_CONNECTION_TYPE_EDGE_IDENTIFIER: "",
  EDGE_IDENTIFIER_MAX_LENGTH: 2,
  EDGE_VARIANT_ID_LENGTH: 5,
  EDGE_ID_LENGTH: 5,
  SMOOTHSTEP_BORDER_RADIUS: 5,
  DELETION_REQUIRES_USER_CONFIRMATION: true,
  CREATION_CREATES_TOAST_NOTIFICATION: true,
  EDITING_CREATES_TOAST_NOTIFICATION: true,
  DELETION_CREATES_TOAST_NOTIFICATION: true,
};

export default edgeConfig;
