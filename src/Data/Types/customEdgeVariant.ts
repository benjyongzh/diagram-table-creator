import { EdgeIdentifier } from "./schemas/edgeIdentifier";

type CustomEdgeVariant = {
  edgeName: string;
  edgeIdentifier: EdgeIdentifier;
  variantIndex?: number;
  isSelected?: boolean;
};

export default CustomEdgeVariant;
