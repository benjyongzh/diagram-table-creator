import { useState } from "react";
import CustomNodeVariant from "Types/customNodeVariant";

export const useComponentListItem = () => {
  const [openedComponent, setOpenedComponent] =
    useState<CustomNodeVariant | null>(null);

  const onComponentItemHover = (variant: CustomNodeVariant | null) => {
    if (variant === null) {
      setOpenedComponent(null);
      return;
    }
    openedComponent === variant
      ? setOpenedComponent(null)
      : setOpenedComponent(variant);
  };
  return { openedComponent, setOpenedComponent, onComponentItemHover };
};
