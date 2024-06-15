import { Position } from "reactflow";
import { z } from "zod";
import nodeConfig from "@/Configs/nodeConfig";
import handleConfig from "@/Configs/handleConfig";
import edgeIdentifierSchema from "./edgeIdentifier";

export const handleVariantInfoSchema = z.object({
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

export const handleVariantSchema = z
  .object({
    handleTypeId: z.string().length(handleConfig.ID_LENGTH),
  })
  .merge(handleVariantInfoSchema);
