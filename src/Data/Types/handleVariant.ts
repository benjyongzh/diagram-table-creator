import { HandleType, Position } from "reactflow";
import { isPosition } from "./position";
import { isHandleType } from "./handleType";
import nodeConfig from "Configs/nodeConfig";
import { z } from "zod";
import { handleVariantSchema } from "./schemas/handleVariant";

// export type HandleVariant = {
//   handleType: HandleType; //source | target
//   handleName: string;
//   position: Position;
//   quantity: number;
// };

export type HandleVariant = z.infer<typeof handleVariantSchema>;

export const isHandleVariant = (arg: any): arg is HandleVariant => {
  return (
    arg &&
    arg.handleType &&
    typeof isHandleType(arg.handleType) &&
    arg.handleName &&
    typeof arg.handleName === "string" &&
    arg.position &&
    typeof isPosition(arg.position) &&
    arg.quantity &&
    typeof arg.quantity === "number"
  );
};

export const handleVariantDefaultValue: HandleVariant = {
  handleType: "source", //source | target
  handleName: "",
  position: Position.Top,
  quantity: nodeConfig.HANDLETYPE_QUANTITY_MIN,
};
