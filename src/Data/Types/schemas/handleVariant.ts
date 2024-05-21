import { Position } from "reactflow";
import { z, ZodType } from "zod";
import nodeConfig from "Configs/nodeConfig";
import { HandleVariant } from "Types/handleVariant";

export const handleVariantSchema = z.object({
  handleType: z.enum(["source", "target"]).default("source"),
  handleName: z.string().min(1).default("myHandleType"),
  position: z.nativeEnum(Position).default(Position.Top),
  quantity: z
    .number()
    .min(nodeConfig.HANDLETYPE_QUANTITY_MIN)
    .max(nodeConfig.HANDLETYPE_QUANTITY_MAX)
    .default(nodeConfig.HANDLETYPE_QUANTITY_MIN),
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
