import { HandleType, Position } from "reactflow";
import { isPosition } from "./position";
import { isHandleType } from "./handleType";

export type HandleVariant = {
  handleType: HandleType; //source | target
  handleName: string;
  position: Position;
  quantity: number;
};

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
