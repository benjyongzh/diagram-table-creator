import CustomNodeVariant from "Types/customNodeVariant";
import { useAppDispatch } from "Hooks/reduxHooks";
import { addNode } from "Features/reactFlowSlice";
import { createNodeFromData } from "Utilities/reactFlowNodes";
import { Plus, Pencil } from "lucide-react";
import ButtonStyledIcon from "./ui/ButtonStyledIcon";
import { SidebarListItem } from "./SidebarListItem";

type sidebarComponentListItemProps = {
  variant: CustomNodeVariant;
  onHover: Function;
  isFocused: boolean;
};

export const SidebarComponentListItem = (
  props: sidebarComponentListItemProps
) => {
  const { variant, onHover, isFocused } = props;
  const dispatch = useAppDispatch();

  const isHovered = (bool: boolean) => {
    onHover(bool ? variant : null);
  };

  const onAdd = () => {
    dispatch(addNode(createNodeFromData(variant)));
  };

  const onEdit = () => {};

  return (
    <SidebarListItem
      text={props.variant.nodeName}
      onHover={() => isHovered(true)}
      isFocused={isFocused}
      rightSideChildren={
        <div
          className={`flex items-center justify-evenly background-lower-contrast bg-slate-400 rounded-e-md overflow-hidden transition-all ease-in-out ${
            isFocused ? "w-36" : "w-0"
          }`}
        >
          <ButtonStyledIcon onButtonClick={onAdd}>
            <Plus className="h-6 w-6" />
          </ButtonStyledIcon>
          <ButtonStyledIcon onButtonClick={onEdit}>
            <Pencil className="h-5 w-5" />
          </ButtonStyledIcon>
        </div>
      }
    ></SidebarListItem>
  );
};
