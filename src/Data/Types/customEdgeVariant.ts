import edgeIdentifierSchema from "./schemas/edgeIdentifier";
import { z } from "zod";
type EdgeIdentifier = z.infer<typeof edgeIdentifierSchema>;

type CustomEdgeVariant = {
  edgeName: string;
  edgeIdentifier: EdgeIdentifier;
  variantIndex?: number;
  isSelected?: boolean;
};

export default CustomEdgeVariant;
