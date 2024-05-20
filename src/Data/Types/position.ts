import { Position } from "reactflow";

export const isPosition = (arg: any): arg is Position => {
  return (
    arg &&
    (arg === Position.Left ||
      arg === Position.Right ||
      arg === Position.Top ||
      arg === Position.Bottom)
  );
};
