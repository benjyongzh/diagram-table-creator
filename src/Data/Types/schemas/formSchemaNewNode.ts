import { z } from "zod";
import { HandleVariant } from "Types/handleVariant";
import { handleVariantSchema } from "./handleVariant";
import { isHandleVariant } from "Types/handleVariant";

// const handleVariantSchema = z.custom<HandleVariant>((value) =>
//   isHandleVariant(value)
// );

const formSchemaNewNode = z.object({
  component_name: z.string().min(1, "Component name must not be empty"),
  handle_variants: z.array(handleVariantSchema).default([]),
});

export default formSchemaNewNode;
