import { EdgeIdentifier } from "./schemas/edgeIdentifier";

type CustomEdgeVariant = {
  edgeName: string;
  edgeIdentifier: EdgeIdentifier;
  connectionTypeIndex?: number;
};

export default CustomEdgeVariant;

export const emptyEdgeVariant: CustomEdgeVariant = {
  edgeName: "",
  edgeIdentifier: "",
};
