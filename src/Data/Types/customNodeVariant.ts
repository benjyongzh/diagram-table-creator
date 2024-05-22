import { HandleVariant } from "./handleVariant";
import colors from "./colorString";

type CustomNodeVariant = {
  nodeName: string;
  variantIndex?: number;
  handleTypes: HandleVariant[];
  isHovered?: boolean;
  isSelected?: boolean;
  color: colors;
};

export default CustomNodeVariant;
