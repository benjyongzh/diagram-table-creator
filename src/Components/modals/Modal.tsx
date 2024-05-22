import React from "react";
import { Dialog } from "Components/ui/dialog";

type modalProps = {
  openState?: { open: boolean; setOpen: Function };
  triggerElement: React.ReactNode;
  modalContent: React.ReactNode;
};

export const Modal = (props: modalProps) => {
  const { openState, triggerElement, modalContent } = props;
  return (
    <Dialog
      open={openState && openState.open}
      onOpenChange={(bool: boolean) => openState && openState.setOpen(bool)}
    >
      {triggerElement}
      {modalContent}
    </Dialog>
  );
};
