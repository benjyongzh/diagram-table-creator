export const getSpacing = (
  totalLength: number,
  denominator: number
): number => {
  return totalLength / (denominator + 1);
};
