import { EdgeIdentifier } from "Types/schemas/edgeIdentifier";
import { Connection } from "reactflow";

export const createEdgeId = (
  connection: Connection,
  edgeIdentifier: EdgeIdentifier,
  connectionIndex: number
): string => {
  return `${connection.source}-${connection.target}-${edgeIdentifier}-${connectionIndex}`;
};
