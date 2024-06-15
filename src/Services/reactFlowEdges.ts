import { EdgeIdentifier } from "Types/schemas/edgeIdentifier";
import { Connection, Edge, HandleType, Node } from "reactflow";
import {
  getConnectionTypeFromConnectionHandleString,
  getHandleNameFromConnectionHandleString,
  getHandleIndexFromConnectionHandleString,
  replaceHandleIdHandleName,
  getEdgeEndLabelFromHandleId,
} from "@/Services/reactFlowHandles";
import edgeConfig from "@/Configs/edgeConfig";
import { randomStringGenerator } from "../Utilities/strings";
import { EdgeConnectionDirectionToNode } from "Types/edges/edgeConnectionDirectionToNode";
import EdgeData from "Types/edges/edgeData";
import { HandleVariant } from "Types/handles/handleVariant";

export const createEdgeId = (): string => {
  return randomStringGenerator(edgeConfig.ID_LENGTH);
};

const getEdgeLabelFromHandleId = (handleId: string): string => {
  const array = handleId.split("-");
  const handleName = array[0];
  const handleIndex = array[1];
  return `${handleName}-${handleIndex}`;
};

export const createEdgeMainLabel = (
  edgeIdentifier: string,
  connectionTypeIndex: number
): string => {
  return `${edgeIdentifier}-${connectionTypeIndex}`;
};

const createEdgeEndLabel = (
  connection: Connection,
  direction: "source" | "target"
): string => {
  const handleText =
    direction === "source"
      ? connection.sourceHandle!
      : connection.targetHandle!;
  return getEdgeLabelFromHandleId(handleText);
};

export const createEdgeLabelAtSource = (connection: Connection): string => {
  return createEdgeEndLabel(connection, "source");
};

export const createEdgeLabelAtTarget = (connection: Connection): string => {
  return createEdgeEndLabel(connection, "target");
};

export const getLargestConnectionTypeIndex = (
  edges: Edge[],
  edgeId: EdgeIdentifier
): number | null => {
  const sortedIndexes: number[] = edges
    .filter((edge) => edge.data.edgeIdentifier === edgeId)
    .map((edge) => edge.data.connectionTypeIndex)
    .sort();
  return sortedIndexes.length ? sortedIndexes[sortedIndexes.length - 1] : null;
};

export const createNewConnectionTypeIndex = (
  edges: Edge[],
  edgeId: EdgeIdentifier
): number => {
  const largest: number | null = getLargestConnectionTypeIndex(edges, edgeId);
  return largest === null ? 1 : largest + 1;
};

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

export const getEdgesConnectedToHandleName = (
  edges: Edge[],
  handleName: string
): Edge[] => {
  return edges.filter(
    (edge) =>
      getHandleNameFromConnectionHandleString(edge.sourceHandle!) ===
        handleName ||
      getHandleNameFromConnectionHandleString(edge.targetHandle!) === handleName
  );
};

export const getEdgesConnectedToHandleNameMoreThanIndex = (
  edges: Edge[],
  handleName: string,
  index: number
): Edge[] => {
  return edges.filter(
    (edge) =>
      (getHandleNameFromConnectionHandleString(edge.sourceHandle!) ===
        handleName &&
        getHandleIndexFromConnectionHandleString(edge.sourceHandle!) > index) ||
      (getHandleNameFromConnectionHandleString(edge.targetHandle!) ===
        handleName &&
        getHandleIndexFromConnectionHandleString(edge.targetHandle!) > index)
  );
};

export const getEdgesConnectedToNodeId = (
  edges: Edge[],
  nodeId: string
): Edge[] => {
  return edges.filter(
    (edge) => edge.source === nodeId || edge.target === nodeId
  );
};

export const getEdgesConnectedToNodes = (
  edges: Edge[],
  nodes: Node[]
): Edge[] => {
  const nodeIds: string[] = nodes.map((node: Node) => node.id);
  return edges.filter((edge) => {
    return nodeIds.includes(edge.source) || nodeIds.includes(edge.target);
  });
};

export const getEdgeConnectionDirectionToNodes = (
  edges: Edge[],
  nodes: Node[]
): EdgeConnectionDirectionToNode[] => {
  const nodeIds: string[] = nodes.map((node: Node) => node.id);
  return edges.map((edge) => {
    if (nodeIds.includes(edge.source) && nodeIds.includes(edge.target))
      return "both";
    if (nodeIds.includes(edge.target)) return "target";
    if (nodeIds.includes(edge.source)) return "source";
    return "none";
  });
};

export const getEdgesWithConnectionType = (
  edges: Edge[],
  connectionType: EdgeIdentifier
): Edge[] => {
  return edges.filter(
    (edge) =>
      getConnectionTypeFromConnectionHandleString(edge.sourceHandle!) ===
        connectionType ||
      getConnectionTypeFromConnectionHandleString(edge.targetHandle!) ===
        connectionType
  );
};

export const setEdgeData = (edge: Edge, newData: EdgeData): Edge => {
  return {
    ...edge,
    data: newData,
  };
};

export const updateEdgeConnectionType = (
  edge: Edge,
  conectionType: EdgeIdentifier
): Edge => {
  const mainLabel: string = createEdgeMainLabel(
    conectionType,
    edge.data.connectionTypeIndex
  );
  const newEdge: Edge = setEdgeData(edge, {
    ...edge.data,
    mainLabel,
    edgeIdentifier: conectionType,
  });
  return newEdge;
};

export const updateEdgeHandleName = (
  edge: Edge,
  handleName: string,
  handleType: HandleType
): Edge => {
  if (!edge.sourceHandle || !edge.targetHandle) return edge;
  if (handleType === "source") {
    const newSourceHandle: string = replaceHandleIdHandleName(
      edge.sourceHandle,
      handleName
    );
    const newLabel: string = getEdgeEndLabelFromHandleId(newSourceHandle);
    const newEdge: Edge = {
      ...edge,
      sourceHandle: newSourceHandle,
      data: {
        ...edge.data,
        edgeStartLabel: newLabel,
      },
    };
    return newEdge;
  } else {
    const newTargetHandle: string = replaceHandleIdHandleName(
      edge.targetHandle,
      handleName
    );
    const newLabel: string = getEdgeEndLabelFromHandleId(newTargetHandle);
    const newEdge: Edge = {
      ...edge,
      targetHandle: newTargetHandle,
      data: {
        ...edge.data,
        edgeEndLabel: newLabel,
      },
    };
    return newEdge;
  }
};

export const updateEdgeEndLabel = (
  edge: Edge,
  connection: Connection,
  handleType: HandleType
): Edge => {
  const newLabel: string = createEdgeEndLabel(connection, handleType);

  if (handleType === "source") {
    const newEdge: Edge = setEdgeData(edge, {
      ...edge.data,
      edgeStartLabel: newLabel,
    });
    return newEdge;
  } else {
    const newEdge: Edge = setEdgeData(edge, {
      ...edge.data,
      edgeEndLabel: newLabel,
    });
    return newEdge;
  }
};

export const edgeIsConnectedToHandleWhoseNewIndexIsNoLongerInRange = (
  edge: Edge,
  handles: {
    oldHandleType: HandleVariant;
    newHandleType: HandleVariant;
  }
): boolean => {
  const { oldHandleType, newHandleType } = handles;

  // check source side
  const sourceHandleName: string = getHandleNameFromConnectionHandleString(
    edge.sourceHandle!
  );
  if (sourceHandleName === oldHandleType.handleName) {
    const sourceIndex: number = getHandleIndexFromConnectionHandleString(
      edge.sourceHandle!
    );
    if (sourceIndex >= newHandleType.quantity) {
      return true;
    }
  }
  //check target side
  const targetHandleName: string = getHandleNameFromConnectionHandleString(
    edge.targetHandle!
  );
  if (targetHandleName === oldHandleType.handleName) {
    const targetIndex: number = getHandleIndexFromConnectionHandleString(
      edge.targetHandle!
    );
    if (targetIndex >= newHandleType.quantity) {
      return true;
    }
  }
  return false;
};

export const updateEdgeInfo = (
  edge: Edge,
  info: {
    connectionType?: EdgeIdentifier;
    sourceHandleName?: string;
    targetHandleName?: string;
  }
): Edge => {
  let newEdge = { ...edge };
  if (info.connectionType) {
    // connectionType changed. update edge
    newEdge = updateEdgeConnectionType(newEdge, info.connectionType);
  }
  if (info.sourceHandleName) {
    // handleName changed. update edge
    newEdge = updateEdgeHandleName(newEdge, info.sourceHandleName, "source");
  }
  if (info.targetHandleName) {
    // handleName changed. update edge
    newEdge = updateEdgeHandleName(newEdge, info.targetHandleName, "target");
  }
  return newEdge;
};
