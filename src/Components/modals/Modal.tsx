import React from "react";
import { Dialog } from "Components/ui/dialog";

type modalProps = {
  setOpenState: Function;
  triggerElement: React.ReactNode;
  modalContent: React.ReactNode;
};

export const Modal = (props: modalProps) => {
  return (
    <Dialog>
      {props.triggerElement}
      {props.modalContent}
    </Dialog>
  );
};
