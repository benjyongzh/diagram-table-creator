import { z } from "zod";
import edgeIdentifierSchema from "./edgeIdentifier";

const formSchemaNewEdge = z.object({
  connection_name: z
    .string()
    .min(1, "Connection name must not be empty")
    .regex(
      /^[\w\s]+$/,
      "Connection name can only contain alphanumeric characters, spaces and/or underscores"
    ),
  edge_identifier: edgeIdentifierSchema,
});

export default formSchemaNewEdge;
