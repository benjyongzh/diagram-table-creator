import { useState } from "react";

// components
import { Modal } from "./modals/Modal";
import ButtonStyledIcon from "./ui/ButtonStyledIcon";
import { SidebarListItem } from "./SidebarListItem";
import { DialogTrigger } from "./ui/dialog";

// types
import { EdgeVariant } from "Types/edges/edgeVariant";

// hooks

// ui
import { Pencil } from "lucide-react";

type sidebarEdgeListItemProps = {
  variant: EdgeVariant;
  onHover: Function;
  isFocused: boolean;
};

export const SidebarEdgeListItem = (props: sidebarEdgeListItemProps) => {
  const { variant, onHover, isFocused } = props;
  const [modalEditEdgeIsOpen, setModalEditEdgeIsOpen] = useState(false);

  const isHovered = (bool: boolean) => {
    onHover(bool ? variant : null);
  };

  return (
    <SidebarListItem
      children={`${props.variant.edgeIdentifier} - ${props.variant.edgeName}`}
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
              open: modalEditEdgeIsOpen,
              setOpen: setModalEditEdgeIsOpen,
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
                setModalOpen={setModalEditEdgeIsOpen}
                variant={variant}
              />
            }
          /> */}
        </div>
      }
    ></SidebarListItem>
  );
};
