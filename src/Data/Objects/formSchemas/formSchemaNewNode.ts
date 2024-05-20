import { z } from "zod";
import { HandleVariant } from "Types/handleVariant";
import { isHandleVariant } from "Types/handleVariant";

const handleVariantSchema = z.custom<HandleVariant>((value) =>
  isHandleVariant(value)
);

const formSchemaNewNode = z.object({
  component_name: z.string(),
  handle_variants: z.array(handleVariantSchema),
});

export default formSchemaNewNode;
