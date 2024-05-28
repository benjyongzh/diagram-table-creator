import { Position } from "reactflow";
import { z } from "zod";
import nodeConfig from "Configs/nodeConfig";
import edgeIdentifierSchema from "./edgeIdentifier";

export const handleVariantSchema = z.object({
  handleType: z.enum(["source", "target"]).default("source"),
  handleName: z
    .string()
    .min(1, "Handle name must not be empty")
    .regex(
      /^[\w\s]+$/,
      "Handle name can only contain alphanumeric characters, spaces and/or underscores"
    ),
  position: z.nativeEnum(Position).default(Position.Left),
  quantity: z.coerce
    .number()
    .min(
      nodeConfig.HANDLETYPE_QUANTITY_MIN,
      `Minimum quantity of ${nodeConfig.HANDLETYPE_QUANTITY_MIN}`
    )
    .max(
      nodeConfig.HANDLETYPE_QUANTITY_MAX,
      `Maximum quantity of ${nodeConfig.HANDLETYPE_QUANTITY_MAX}`
    )
    .default(nodeConfig.HANDLETYPE_QUANTITY_MIN),
  connectionType: edgeIdentifierSchema,
});

// export const handleVariantSchema = z.object({
//   handleType: z.string().default("source"),
//   handleName: z.string().min(1).default("myHandleType"),
//   position: z.string().default(Position.Top),
//   quantity: z
//     .number()
//     .min(nodeConfig.HANDLETYPE_QUANTITY_MIN)
//     .max(nodeConfig.HANDLETYPE_QUANTITY_MAX)
//     .default(nodeConfig.HANDLETYPE_QUANTITY_MIN),
// }) satisfies ZodType<HandleVariant>;
