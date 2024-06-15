import { z } from "zod";
import edgeConfig from "@/Configs/edgeConfig";

const edgeIdentifierSchema = z
  .string()
  .regex(/^[a-zA-Z]*$/)
  .max(
    edgeConfig.EDGE_IDENTIFIER_MAX_LENGTH,
    `Identifier must not be more than ${edgeConfig.EDGE_IDENTIFIER_MAX_LENGTH} characters long`
  )
  .toUpperCase()
  .default(edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER);

export default edgeIdentifierSchema;

export type EdgeIdentifier = z.infer<typeof edgeIdentifierSchema>;
