import { z } from "zod";

const formSchemaNewNode = z.object({
  component_name: z.boolean().default(false),
  handle_variants: z.boolean(),
});

export default formSchemaNewNode;
