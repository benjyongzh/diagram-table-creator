import { Connection } from "reactflow";

// configs
import edgeConfig from "Configs/edgeConfig";

// utils
import { randomStringGenerator } from "Utilities/strings";

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
