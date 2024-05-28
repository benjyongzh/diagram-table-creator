import { useState } from "react";

// components
import { Modal } from "./modals/Modal";
import ButtonStyledIcon from "./ui/ButtonStyledIcon";
import { SidebarListItem } from "./SidebarListItem";
import { DialogTrigger } from "./ui/dialog";

// types
import CustomEdgeVariant from "Types/customEdgeVariant";

// hooks

// ui
import { Pencil } from "lucide-react";

type sidebarEdgeListItemProps = {
  variant: CustomEdgeVariant;
  onHover: Function;
  isFocused: boolean;
};

export const SidebarEdgeListItem = (props: sidebarEdgeListItemProps) => {
  const { variant, onHover, isFocused } = props;
  const [modalEditNodeIsOpen, setModalEditNodeIsOpen] = useState(false);

  const isHovered = (bool: boolean) => {
    onHover(bool ? variant : null);
  };

  return (
    <SidebarListItem
      children={`${props.variant.edgeName} (${props.variant.edgeIdentifier})`}
      onHover={() => isHovered(true)}
      isFocused={isFocused}
      rightSideChildren={
        <div
          className={`flex items-center justify-evenly background-lower-contrast bg-slate-400 rounded-e-md overflow-hidden transition-all ease-in-out ${
            isFocused ? "w-36" : "w-0"
          }`}
        >
          {/* <Modal
            openState={{
              open: modalEditNodeIsOpen,
              setOpen: setModalEditNodeIsOpen,
            }}
            triggerElement={
              <DialogTrigger> */}
          <ButtonStyledIcon onButtonClick={() => isHovered(false)}>
            <Pencil className="h-5 w-5" />
          </ButtonStyledIcon>
          {/* </DialogTrigger>
            }
            modalContent={
              <ModalFormNode
                setModalOpen={setModalEditNodeIsOpen}
                variant={variant}
              />
            }
          /> */}
        </div>
      }
    ></SidebarListItem>
  );
};
