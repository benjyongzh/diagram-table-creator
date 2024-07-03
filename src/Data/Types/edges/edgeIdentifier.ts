import { z } from "zod";
import edgeConfig from "@/Configs/edgeConfig";

const edgeIdentifierSchema = z
  .string()
  .regex(/^[a-zA-Z]*$/)
  .min(
    edgeConfig.EDGE_IDENTIFIER_MIN_LENGTH,
    `Identifier must not be less than ${edgeConfig.EDGE_IDENTIFIER_MIN_LENGTH} characters long`
  )
  .max(
    edgeConfig.EDGE_IDENTIFIER_MAX_LENGTH,
    `Identifier must not be more than ${edgeConfig.EDGE_IDENTIFIER_MAX_LENGTH} characters long`
  )
  .toUpperCase()
  .or(z.literal(edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER))
  .default(edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER);

export default edgeIdentifierSchema;

export type EdgeIdentifier = z.infer<typeof edgeIdentifierSchema>;

export const isEdgeIdentifier = (arg: any): arg is EdgeIdentifier => {
  if (
    arg.length() <= edgeConfig.EDGE_IDENTIFIER_MIN_LENGTH ||
    arg.length() >= edgeConfig.EDGE_IDENTIFIER_MAX_LENGTH
  ) {
    return arg === edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER;
  }
  return arg && typeof arg === "string" && arg.match(/^[a-zA-Z]*$/);
};
