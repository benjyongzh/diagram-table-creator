import { HandleType, Position } from "reactflow";

export type HandleVariant = {
  handleType: HandleType; //source | target
  handleName: string;
  position: Position;
  quantity: number;
};
