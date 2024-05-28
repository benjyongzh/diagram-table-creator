import { HandleType, Position } from "reactflow";
import { isPosition } from "./position";
import { isHandleType } from "./handleType";
import nodeConfig from "Configs/nodeConfig";
import { z } from "zod";
import { handleVariantSchema } from "./schemas/handleVariant";
import { isEdgeIdentifier } from "./edgeIdentifier";

export type HandleVariant = z.infer<typeof handleVariantSchema>;

export const isHandleVariant = (arg: any): arg is HandleVariant => {
  return (
    arg &&
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

export const handleVariantDefaultValue: HandleVariant = {
  handleType: "source", //source | target
  handleName: "",
  position: Position.Left,
  quantity: nodeConfig.HANDLETYPE_QUANTITY_MIN,
  connectionType: "", //blank = accept any connectionType
};
