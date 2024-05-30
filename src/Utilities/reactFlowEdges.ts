import { EdgeIdentifier } from "Types/schemas/edgeIdentifier";
import { Connection, Edge } from "reactflow";
import { getConnectionTypeFromConnectionHandleString } from "Utilities/reactFlowHandles";

export const createEdgeId = (
  connection: Connection,
  edgeIdentifier: EdgeIdentifier,
  connectionIndex: number
): string => {
  return `${connection.source}-${connection.target}-${edgeIdentifier}-${connectionIndex}`;
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
