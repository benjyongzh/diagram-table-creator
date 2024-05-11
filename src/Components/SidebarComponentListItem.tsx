import CustomNodeVariant from "Types/customNodeVariant";
import { useAppDispatch } from "Hooks/reduxHooks";
import { addNode } from "Features/reactFlowSlice";
import { createNodeFromData } from "Utilities/reactFlowNodes";
import { useState } from "react";
import { AccordionContent } from "./ui/accordion";

type sidebarComponentListItemProps = {
  variant: CustomNodeVariant;
};

export const SidebarComponentListItem = (
  props: sidebarComponentListItemProps
) => {
  const dispatch = useAppDispatch();
  const [isOpened, setIsOpened] = useState(false);

  const onAdd = () => {
    dispatch(addNode(createNodeFromData(props.variant)));
  };

  const onEdit = () => {};

  return (
    <AccordionContent className="py-1">
      <button
        className="sidebar-list-menu-item hoverable-menu-item menu-text text-base pl-8"
        onClick={() => setIsOpened((state) => !state)}
      >
        {props.variant.nodeName}
      </button>
    </AccordionContent>
  );
};
