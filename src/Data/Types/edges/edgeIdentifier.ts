import { EdgeIdentifier } from "../schemas/edgeIdentifier";

export const isEdgeIdentifier = (arg: any): arg is EdgeIdentifier => {
  return (
    arg &&
    arg.length() <= 2 &&
    typeof arg === "string" &&
    arg.match(/^[a-zA-Z]*$/)
  );
};
