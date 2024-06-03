import { EdgeIdentifier } from "Types/schemas/edgeIdentifier";
import { Connection, Edge } from "reactflow";
import { getConnectionTypeFromConnectionHandleString } from "Utilities/reactFlowHandles";
import edgeConfig from "Configs/edgeConfig";
import { randomStringGenerator } from "./strings";

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
  if (sourceConnectionType === "" && targetConnectionType !== "")
    return targetConnectionType;
  if (sourceConnectionType !== "" && targetConnectionType === "")
    return sourceConnectionType;
  return targetConnectionType;
};
