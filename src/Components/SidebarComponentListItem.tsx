import CustomNodeVariant from "Types/customNodeVariant";
import { useAppDispatch } from "Hooks/reduxHooks";
import { addNode } from "Features/reactFlowSlice";
import { createNodeFromData } from "Utilities/reactFlowNodes";
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
        className={`flex background-lower-contrast rounded-e-md overflow-hidden transition-all ease-in-out ${
          isOpened ? "w-48" : "w-0"
        }`}
      >
        <button
          className="flex items-center justify-center flex-1 menu-text bg-red-400"
          onClick={onAdd}
        >
          Add
        </button>
        <button
          className="flex items-center justify-center flex-1 menu-text background-lower-contrast"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
    </AccordionContent>
  );
};
