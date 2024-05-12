import CustomNodeVariant from "Types/customNodeVariant";
import { useAppDispatch } from "Hooks/reduxHooks";
import { addNode } from "Features/reactFlowSlice";
import { createNodeFromData } from "Utilities/reactFlowNodes";
import { useState } from "react";
import { AccordionContent } from "./ui/accordion";
import { ChevronDown } from "lucide-react";

type sidebarComponentListItemProps = {
  variant: CustomNodeVariant;
  onComponentItemClick: Function;
  isOpened: boolean;
};

export const SidebarComponentListItem = (
  props: sidebarComponentListItemProps
) => {
  const { variant, onComponentItemClick, isOpened } = props;
  const dispatch = useAppDispatch();

  const onItemClick = () => {
    onComponentItemClick(variant);
  };

  const onAdd = () => {
    dispatch(addNode(createNodeFromData(variant)));
  };

  const onEdit = () => {};

  return (
    <AccordionContent className="py-1 flex">
      <button
        className={`sidebar-list-menu-item hoverable-menu-item pl-8 flex transition-all ${
          isOpened ? "rounded-e-none" : ""
        }`}
        onClick={onItemClick}
      >
        <span className="menu-text text-base">{props.variant.nodeName}</span>
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 -rotate-90" />
      </button>
      <div
        className={`transition-all ease-in-out text-slate-900 overflow-hidden rounded-e-md bg-slate-400 ${
          isOpened ? "w-48" : "w-0"
        }`}
      >
        hello there
      </div>
    </AccordionContent>
  );
};
