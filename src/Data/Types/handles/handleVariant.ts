import { HandleType, Position } from "reactflow";
import { isPosition } from "./position";
import { isHandleType } from "./handleType";
import nodeConfig from "@/Configs/nodeConfig";
import handleConfig from "@/Configs/handleConfig";
import edgeConfig from "@/Configs/edgeConfig";
import { z } from "zod";
import { isEdgeIdentifier } from "../edges/edgeIdentifier";

import { EdgeVariantId, edgeVariantIdSchema } from "Types/edges/edgeVariant";
import { CSSProperties } from "react";

const handleVariantConnectionTypeSchema = z
  .literal(edgeConfig.FREE_CONNECTION_TYPE_VARIANT_ID)
  .or(edgeVariantIdSchema);

export type HandleVariantConnectionType = z.infer<
  typeof handleVariantConnectionTypeSchema
>;

export const handleVariantDataSchema = z.object({
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
  edgeVariantId: handleVariantConnectionTypeSchema,
});

export type HandleVariantData = z.infer<typeof handleVariantDataSchema>;

export const handleVariantIdSchema = z
  .string()
  .length(handleConfig.HANDLE_VARIANT_ID_LENGTH);

export type HandleVariantId = z.infer<typeof handleVariantIdSchema>;

export const handleVariantSchema = z
  .object({
    id: handleVariantIdSchema,
  })
  .merge(handleVariantDataSchema);

export type HandleVariant = z.infer<typeof handleVariantSchema>;

export const isHandleVariant = (arg: any): arg is HandleVariant => {
  return (
    arg &&
    arg.id &&
    typeof arg.id === "string" &&
    arg.id.length === handleConfig.HANDLE_VARIANT_ID_LENGTH &&
    arg.handleType &&
    isHandleType(arg.handleType) &&
    arg.handleName &&
    typeof arg.handleName === "string" &&
    arg.position &&
    isPosition(arg.position) &&
    arg.quantity &&
    typeof arg.quantity === "number" &&
    arg.connectionType &&
    isEdgeIdentifier(arg.connectionType)
  );
};

export const handleVariantDataDefaultValue: HandleVariantData = {
  handleType: "source", //source | target
  handleName: "",
  position: Position.Left,
  quantity: nodeConfig.HANDLETYPE_QUANTITY_MIN,
  edgeVariantId: edgeConfig.FREE_CONNECTION_TYPE_VARIANT_ID,
};

export type HandlePort = Omit<HandleVariantData, "quantity"> & {
  id: string;
  portIndex: number;
  style: CSSProperties;
};
