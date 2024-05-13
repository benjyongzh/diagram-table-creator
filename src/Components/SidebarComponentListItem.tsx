import CustomNodeVariant from "Types/customNodeVariant";
import { useAppDispatch } from "Hooks/reduxHooks";
import { addNode } from "Features/reactFlowSlice";
import { createNodeFromData } from "Utilities/reactFlowNodes";
import { AccordionContent } from "./ui/accordion";
import { Plus, Pencil } from "lucide-react";
import { Button } from "./ui/button";

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

  // const onItemClick = () => {
  //   onComponentItemClick(variant);
  // };

  const isHovered = (bool: boolean) => {
    onComponentItemClick(bool ? variant : null);
  };

  const onAdd = () => {
    dispatch(addNode(createNodeFromData(variant)));
  };

  const onEdit = () => {};

  return (
    <AccordionContent
      className="py-0 flex my-1"
      onMouseEnter={() => isHovered(true)}
      onMouseLeave={() => isHovered(false)}
    >
      <div
        className={`cursor-default sidebar-list-menu-item hoverable-menu-item pl-8 flex transition-all ${
          isOpened ? "rounded-e-none bg-slate-200 dark:bg-slate-700" : ""
        }`}
        // onClick={onItemClick}
      >
        <span
          className={`menu-text text-base text-ellipsis ${
            isOpened ? "font-medium" : ""
          }`}
        >
          {props.variant.nodeName}
        </span>
      </div>
      <div
        className={`flex items-center justify-evenly background-lower-contrast dark:bg-slate-900 rounded-e-md overflow-hidden transition-all ease-in-out ${
          isOpened ? "w-36" : "w-0"
        }`}
      >
        <Button
          onClick={onAdd}
          className="menu-text-low-contrast hover:bg-transparent dark:hover:bg-transparent hover:text-sky-600 dark:hover:text-sky-500 aspect-square rounded-full hover:scale-125"
          variant="ghost"
          size="icon"
        >
          <Plus className="h-6 w-6" />
        </Button>

        <Button
          onClick={onEdit}
          className="menu-text-low-contrast hover:bg-transparent dark:hover:bg-transparent hover:text-sky-600 dark:hover:text-sky-500 aspect-square rounded-full hover:scale-110"
          variant="ghost"
          size="icon"
        >
          <Pencil className="h-5 w-5" />
        </Button>
      </div>
    </AccordionContent>
  );
};
