import { HandleType } from "reactflow";

export const isHandleType = (arg: any): arg is HandleType => {
  return arg && (arg === "source" || arg === "target");
};
