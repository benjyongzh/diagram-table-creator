import { z } from "zod";
import { handleVariantIdSchema } from "Types/handles/handleVariant";
import colors from "Types/colorString";

// const handleVariantSchema = z.custom<HandleVariant>((value) =>
//   isHandleVariant(value)
// );

const formSchemaNewNodeVariant = z.object({
  component_name: z
    .string()
    .min(1, "Component name must not be empty")
    .regex(
      /^[\w\s]+$/,
      "Component name can only contain alphanumeric characters, spaces and/or underscores"
    ),
  handle_variants: z.array(handleVariantIdSchema).default([]),
  color: z.nativeEnum(colors).default(colors.blue),
});

export default formSchemaNewNodeVariant;
