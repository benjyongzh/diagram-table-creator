import React from "react";
import { AccordionContent } from "./ui/accordion";

type sidebarComponentListItemProps = {
  text: string;
  onHover: Function;
  isFocused?: boolean;
  children?: React.ReactNode;
};

export const SidebarListItem = (props: sidebarComponentListItemProps) => {
  const { text, onHover, isFocused, children } = props;

  const onItemClick = () => {};

  const isHovered = (bool: boolean) => {};

  return (
    <AccordionContent
      className="py-0 flex my-1"
      onMouseEnter={() => isHovered(true)}
      onMouseLeave={() => isHovered(false)}
    >
      <div
        className={`cursor-default sidebar-list-menu-item hoverable-menu-item pl-8 flex transition-all ${
          isFocused ? "rounded-e-none bg-slate-300 dark:bg-slate-700" : ""
        }`}
        // onClick={onItemClick}
      >
        <span
          className={`menu-text text-base text-ellipsis ${
            isFocused ? "font-medium" : ""
          }`}
        >
          {props.text}
        </span>
      </div>
      {children}
    </AccordionContent>
  );
};
