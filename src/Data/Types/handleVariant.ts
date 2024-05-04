import { HandleType, Position } from "reactflow";

export type HandleVariant = {
  handleType: HandleType; //source | target
  position: Position;
  quantity: number;
};
