import { nodeBackgroundBrightnessTailwind } from "Configs/nodeConfig";

export const getNodeBackgroundColourStyleTailwind = (
  color: string
): Record<string, string> => {
  return {
    normal: `bg-${color}-${nodeBackgroundBrightnessTailwind.normal}`,
    hover: `hover:bg-${color}-${nodeBackgroundBrightnessTailwind.hover}`,
  };
};
