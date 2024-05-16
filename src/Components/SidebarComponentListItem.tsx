import CustomNodeVariant from "Types/customNodeVariant";
import { useAppDispatch } from "Hooks/reduxHooks";
import { addNode } from "Features/reactFlowSlice";
import { createNodeFromData } from "Utilities/reactFlowNodes";
import { AccordionContent } from "./ui/accordion";
import { Plus, Pencil } from "lucide-react";
import { Button } from "./ui/button";
import ButtonStyledIcon from "./ui/ButtonStyledIcon";

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
          isOpened ? "rounded-e-none bg-slate-300 dark:bg-slate-700" : ""
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
        className={`flex items-center justify-evenly background-lower-contrast bg-slate-400 rounded-e-md overflow-hidden transition-all ease-in-out ${
          isOpened ? "w-36" : "w-0"
        }`}
      >
        <ButtonStyledIcon onButtonClick={onAdd}>
          <Plus className="h-6 w-6" />
        </ButtonStyledIcon>
        <ButtonStyledIcon onButtonClick={onEdit}>
          <Pencil className="h-5 w-5" />
        </ButtonStyledIcon>
      </div>
    </AccordionContent>
  );
};
