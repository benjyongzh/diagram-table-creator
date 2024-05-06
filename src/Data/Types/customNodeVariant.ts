import { HandleVariant } from "./handleVariant";

type CustomNodeVariant = {
  nodeName: string;
  variantIndex?: number;
  handleTypes: HandleVariant[];
  isHovered?: boolean;
  isSelected?: boolean;
};

export default CustomNodeVariant;
