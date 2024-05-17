import React, { MouseEvent } from "react";
import { AccordionContent } from "./ui/accordion";

type sidebarComponentListItemProps = {
  text: string;
  onHover?: Function;
  onListItemClick?: Function;
  isFocused?: boolean;
  leftSideChildren?: React.ReactNode;
  rightSideChildren?: React.ReactNode;
};

export const SidebarListItem = (props: sidebarComponentListItemProps) => {
  const {
    text,
    onHover,
    onListItemClick,
    isFocused,
    leftSideChildren,
    rightSideChildren,
  } = props;

  const isHovered = (bool: boolean) => (onHover ? onHover(bool) : {});
  const handleClick = (event: MouseEvent) =>
    onListItemClick ? onListItemClick(event) : {};

  return (
    <AccordionContent
      className="py-0 flex my-1"
      onMouseEnter={() => isHovered(true)}
      onMouseLeave={() => isHovered(false)}
    >
      {leftSideChildren}
      <div
        className={`cursor-default sidebar-list-menu-item hoverable-menu-item pl-8 flex transition-all ${
          isFocused ? "rounded-e-none bg-slate-300 dark:bg-slate-700" : ""
        }`}
        onClick={handleClick}
      >
        <span
          className={`menu-text text-base text-ellipsis ${
            isFocused ? "font-medium" : ""
          }`}
        >
          {text}
        </span>
      </div>
      {rightSideChildren}
    </AccordionContent>
  );
};
