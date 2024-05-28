import { z } from "zod";

const edgeIdentifierSchema = z
  .string()
  .min(1, "Identifier must not be empty")
  .max(2, "Identifier must not be more than 2 characters long");

export default edgeIdentifierSchema;
