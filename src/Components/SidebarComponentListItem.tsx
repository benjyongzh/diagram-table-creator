import { useState } from "react";

// components
import { Modal } from "./modals/Modal";
import { ModalFormNode } from "./modals/ModalFormNode";
import ButtonStyledIcon from "./ui/ButtonStyledIcon";
import { SidebarListItem } from "./SidebarListItem";
import { DialogTrigger } from "./ui/dialog";

// types
import CustomNodeVariant from "Types/customNodeVariant";

// hooks
import { useStoreNodes } from "Hooks/useStoreNodes";

// ui
import { Plus, Pencil } from "lucide-react";

type sidebarComponentListItemProps = {
  variant: CustomNodeVariant;
  onHover: Function;
  isFocused: boolean;
};

export const SidebarComponentListItem = (
  props: sidebarComponentListItemProps
) => {
  const { variant, onHover, isFocused } = props;
  const { addNode } = useStoreNodes();
  const [modalEditNodeIsOpen, setModalEditNodeIsOpen] = useState(false);

  const isHovered = (bool: boolean) => {
    onHover(bool ? variant : null);
  };

  const onAdd = () => {
    addNode(variant);
  };

  return (
    <SidebarListItem
      children={props.variant.nodeName}
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
          <Modal
            openState={{
              open: modalEditNodeIsOpen,
              setOpen: setModalEditNodeIsOpen,
            }}
            triggerElement={
              <DialogTrigger>
                <ButtonStyledIcon onButtonClick={() => isHovered(false)}>
                  <Pencil className="h-5 w-5" />
                </ButtonStyledIcon>
              </DialogTrigger>
            }
            modalContent={
              <ModalFormNode
                setModalOpen={setModalEditNodeIsOpen}
                variant={variant}
              />
            }
          />
        </div>
      }
    ></SidebarListItem>
  );
};
