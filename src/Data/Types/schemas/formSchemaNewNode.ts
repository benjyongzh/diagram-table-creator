import { z } from "zod";
import { handleVariantSchema } from "./handleVariant";
import colors from "Types/colorString";

// const handleVariantSchema = z.custom<HandleVariant>((value) =>
//   isHandleVariant(value)
// );

const formSchemaNewNode = z.object({
  component_name: z.string().min(1, "Component name must not be empty"),
  handle_variants: z.array(handleVariantSchema).default([]),
  color: z.nativeEnum(colors).default(colors.blue),
});

export default formSchemaNewNode;
