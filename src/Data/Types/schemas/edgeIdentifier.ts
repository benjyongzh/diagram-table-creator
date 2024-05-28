import { z } from "zod";

const edgeIdentifierSchema = z
  .string()
  .regex(/^[a-zA-Z]*$/)
  .max(2, "Identifier must not be more than 2 characters long")
  .toUpperCase();

export default edgeIdentifierSchema;

export type EdgeIdentifier = z.infer<typeof edgeIdentifierSchema>;
