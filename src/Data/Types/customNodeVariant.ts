import { HandleVariant } from "./handleVariant";

type CustomNodeVariant = {
  nodeName: string;
  handleTypes: HandleVariant[];
  isHovered?: boolean;
  isSelected?: boolean;
};

export default CustomNodeVariant;
