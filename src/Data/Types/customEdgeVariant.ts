import edgeConfig from "Configs/edgeConfig";
import { EdgeIdentifier } from "./schemas/edgeIdentifier";

type CustomEdgeVariant = {
  edgeName: string;
  edgeIdentifier: EdgeIdentifier;
  connectionTypeIndex?: number;
};

export default CustomEdgeVariant;

export const emptyEdgeVariant: CustomEdgeVariant = {
  edgeName: "",
  edgeIdentifier: edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER,
};
