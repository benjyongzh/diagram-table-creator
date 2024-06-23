import { Connection, Edge, HandleType } from "reactflow";

import { EdgeIdentifier } from "Types/edges/edgeIdentifier";
import { EdgeData, EdgeLabels } from "Types/edges/edge";
import { HandleVariant } from "Types/handles/handleVariant";

// configs
import edgeConfig from "Configs/edgeConfig";

// utils
import { randomStringGenerator } from "Utilities/strings";
import {
  getConnectionTypeFromConnectionHandleString,
  getHandleNameFromConnectionHandleString,
  getHandleIndexFromConnectionHandleString,
  replaceHandleIdHandleName,
  getEdgeEndLabelFromHandleId,
} from "./handleVariants";

export const createEdgeId = (): string => {
  return randomStringGenerator(edgeConfig.EDGE_ID_LENGTH);
};

export type getEdgeLabelsArgs = {
  edge: Edge;
  edgeIdentifier: EdgeIdentifier;
  variantIndex: number;
};
export const getEdgeLabels = (args: getEdgeLabelsArgs): EdgeLabels => {
  const { edge, edgeIdentifier, variantIndex } = args;
  const { source, target, sourceHandle, targetHandle } = edge;
  const mainLabel: string = `${edgeIdentifier}-${variantIndex}`;
  const startLabel: string = getEdgeLabelFromHandleId(sourceHandle);
  const endLabel: string = getEdgeLabelFromHandleId(targetHandle);
  return { mainLabel, startLabel, endLabel };
};

const getEdgeLabelFromHandleId = (
  handleId: string | null | undefined
): string => {
  if (typeof handleId === "string") {
    const array = handleId.split("-");
    const handleName = array[0];
    const handleIndex = array[1];
    return `${handleName}-${handleIndex}`;
  } else return "";
};

// export const createEdgeMainLabel = (
//   edgeIdentifier: string,
//   connectionTypeIndex: number
// ): string => {
//   return `${edgeIdentifier}-${connectionTypeIndex}`;
// };

// const createEdgeEndLabel = (
//   connection: Connection,
//   direction: "source" | "target"
// ): string => {
//   const handleText =
//     direction === "source"
//       ? connection.sourceHandle!
//       : connection.targetHandle!;
//   return getEdgeLabelFromHandleId(handleText);
// };

// export const createEdgeLabelAtSource = (connection: Connection): string => {
//   return createEdgeEndLabel(connection, "source");
// };

// export const createEdgeLabelAtTarget = (connection: Connection): string => {
//   return createEdgeEndLabel(connection, "target");
// };

export const getUsableEdgeIdentifierFromConnection = (
  connection: Connection
): EdgeIdentifier => {
  const sourceConnectionType: EdgeIdentifier =
    getConnectionTypeFromConnectionHandleString(connection.sourceHandle!);
  const targetConnectionType: EdgeIdentifier =
    getConnectionTypeFromConnectionHandleString(connection.targetHandle!);
  if (
    sourceConnectionType === edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER &&
    targetConnectionType !== edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER
  )
    return targetConnectionType;
  if (
    sourceConnectionType !== edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER &&
    targetConnectionType === edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER
  )
    return sourceConnectionType;
  return targetConnectionType;
};

export const setEdgeData = (edge: Edge, newData: EdgeData): Edge => {
  return {
    ...edge,
    data: newData,
  };
};

// export const updateEdgeConnectionType = (
//   edge: Edge,
//   conectionType: EdgeIdentifier
// ): Edge => {
//   const mainLabel: string = createEdgeMainLabel(
//     conectionType,
//     edge.data.connectionTypeIndex
//   );
//   const newEdge: Edge = setEdgeData(edge, {
//     ...edge.data,
//     mainLabel,
//     edgeIdentifier: conectionType,
//   });
//   return newEdge;
// };

// export const updateEdgeHandleName = (
//   edge: Edge,
//   handleName: string,
//   handleType: HandleType
// ): Edge => {
//   if (!edge.sourceHandle || !edge.targetHandle) return edge;
//   if (handleType === "source") {
//     const newSourceHandle: string = replaceHandleIdHandleName(
//       edge.sourceHandle,
//       handleName
//     );
//     const newLabel: string = getEdgeEndLabelFromHandleId(newSourceHandle);
//     const newEdge: Edge = {
//       ...edge,
//       sourceHandle: newSourceHandle,
//       data: {
//         ...edge.data,
//         edgeStartLabel: newLabel,
//       },
//     };
//     return newEdge;
//   } else {
//     const newTargetHandle: string = replaceHandleIdHandleName(
//       edge.targetHandle,
//       handleName
//     );
//     const newLabel: string = getEdgeEndLabelFromHandleId(newTargetHandle);
//     const newEdge: Edge = {
//       ...edge,
//       targetHandle: newTargetHandle,
//       data: {
//         ...edge.data,
//         edgeEndLabel: newLabel,
//       },
//     };
//     return newEdge;
//   }
// };

// export const updateEdgeEndLabel = (
//   edge: Edge,
//   connection: Connection,
//   handleType: HandleType
// ): Edge => {
//   const newLabel: string = createEdgeEndLabel(connection, handleType);

//   if (handleType === "source") {
//     const newEdge: Edge = setEdgeData(edge, {
//       ...edge.data,
//       edgeStartLabel: newLabel,
//     });
//     return newEdge;
//   } else {
//     const newEdge: Edge = setEdgeData(edge, {
//       ...edge.data,
//       edgeEndLabel: newLabel,
//     });
//     return newEdge;
//   }
// };

// export const edgeIsConnectedToHandleWhoseNewIndexIsNoLongerInRange = (
//   edge: Edge,
//   handles: {
//     oldHandleType: HandleVariant;
//     newHandleType: HandleVariant;
//   }
// ): boolean => {
//   const { oldHandleType, newHandleType } = handles;

//   // check source side
//   const sourceHandleName: string = getHandleNameFromConnectionHandleString(
//     edge.sourceHandle!
//   );
//   if (sourceHandleName === oldHandleType.handleName) {
//     const sourceIndex: number = getHandleIndexFromConnectionHandleString(
//       edge.sourceHandle!
//     );
//     if (sourceIndex >= newHandleType.quantity) {
//       return true;
//     }
//   }
//   //check target side
//   const targetHandleName: string = getHandleNameFromConnectionHandleString(
//     edge.targetHandle!
//   );
//   if (targetHandleName === oldHandleType.handleName) {
//     const targetIndex: number = getHandleIndexFromConnectionHandleString(
//       edge.targetHandle!
//     );
//     if (targetIndex >= newHandleType.quantity) {
//       return true;
//     }
//   }
//   return false;
// };

// export const updateEdgeInfo = (
//   edge: Edge,
//   info: {
//     connectionType?: EdgeIdentifier;
//     sourceHandleName?: string;
//     targetHandleName?: string;
//   }
// ): Edge => {
//   let newEdge = { ...edge };
//   if (info.connectionType) {
//     // connectionType changed. update edge
//     newEdge = updateEdgeConnectionType(newEdge, info.connectionType);
//   }
//   if (info.sourceHandleName) {
//     // handleName changed. update edge
//     newEdge = updateEdgeHandleName(newEdge, info.sourceHandleName, "source");
//   }
//   if (info.targetHandleName) {
//     // handleName changed. update edge
//     newEdge = updateEdgeHandleName(newEdge, info.targetHandleName, "target");
//   }
//   return newEdge;
// };
