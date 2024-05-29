import { EdgeIdentifier } from "./schemas/edgeIdentifier";

type CustomEdgeVariant = {
  edgeName: string;
  edgeIdentifier: EdgeIdentifier;
  connectionTypeIndex?: number;
};

export default CustomEdgeVariant;
