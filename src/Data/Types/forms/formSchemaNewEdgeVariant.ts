import { z } from "zod";
import edgeIdentifierSchema from "Types/edges/edgeIdentifier";

const formSchemaNewEdgeVariant = z.object({
  connection_name: z
    .string()
    .min(1, "Connection name must not be empty")
    .regex(
      /^[\w\s]+$/,
      "Connection name can only contain alphanumeric characters, spaces and/or underscores"
    ),
  connection_identifier: edgeIdentifierSchema,
});

export default formSchemaNewEdgeVariant;