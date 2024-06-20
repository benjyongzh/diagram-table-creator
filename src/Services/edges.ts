import { Connection } from "reactflow";

import { EdgeIdentifier } from "Types/edges/edgeIdentifier";

// configs
import edgeConfig from "Configs/edgeConfig";

// utils
import { randomStringGenerator } from "Utilities/strings";
import { getConnectionTypeFromConnectionHandleString } from "./handleVariants";

export const createEdgeId = (): string => {
  return randomStringGenerator(edgeConfig.EDGE_ID_LENGTH);
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
