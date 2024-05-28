import { useState } from "react";

export const useSidebarListItemState = <T>() => {
  const [openedListItem, setOpenedListItem] = useState<T | null>(null);

  const onListtItemHover = (variant: T | null) => {
    if (variant === null) {
      setOpenedListItem(null);
      return;
    }
    openedListItem === variant
      ? setOpenedListItem(null)
      : setOpenedListItem(variant);
  };
  return { openedListItem, setOpenedListItem, onListtItemHover };
};
