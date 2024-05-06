import { HandleVariant } from "./handleVariant";
import colorName from "./colorString";

type CustomNodeVariant = {
  nodeName: string;
  variantIndex?: number;
  handleTypes: HandleVariant[];
  isHovered?: boolean;
  isSelected?: boolean;
  color: colorName;
};

export default CustomNodeVariant;
