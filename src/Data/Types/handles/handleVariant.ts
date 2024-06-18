import { HandleType, Position } from "reactflow";
import { isPosition } from "./position";
import { isHandleType } from "./handleType";
import nodeConfig from "@/Configs/nodeConfig";
import { z } from "zod";
import {
  handleVariantSchema,
  handleVariantInfoSchema,
} from "../schemas/handleVariant";
import { isEdgeIdentifier } from "../schemas/edgeIdentifier";
import handleConfig from "@/Configs/handleConfig";
import edgeConfig from "@/Configs/edgeConfig";

export type HandleVariant = z.infer<typeof handleVariantSchema>;
export type HandleVariantInfo = z.infer<typeof handleVariantInfoSchema>;

export const isHandleVariant = (arg: any): arg is HandleVariant => {
  return (
    arg &&
    arg.handleTypeId &&
    typeof arg.handleTypeId === "string" &&
    arg.handleTypeId.length === handleConfig.ID_LENGTH &&
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

export const handleVariantDefaultValue: HandleVariantInfo = {
  handleType: "source", //source | target
  handleName: "",
  position: Position.Left,
  quantity: nodeConfig.HANDLETYPE_QUANTITY_MIN,
  connectionType: edgeConfig.FREE_CONNECTION_TYPE_EDGE_IDENTIFIER,
};
