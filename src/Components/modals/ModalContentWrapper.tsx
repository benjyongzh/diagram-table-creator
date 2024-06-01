import React from "react";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import ModalType from "Types/modalType";

type modalContentWrapperProps = {
  children: React.ReactNode;
  title: string;
  width: number;
  modalType: ModalType;
};

export const ModalContentWrapper = (props: modalContentWrapperProps) => {
  return (
    <DialogContent className="max-w-fit bg-slate-100">
      <DialogHeader>
        <DialogTitle className="menu-text font-bold text-xl">
          {props.title}
        </DialogTitle>
        <DialogDescription style={{ width: `${props.width}px` }}>
          <Separator className="mt-2 mb-4 bg-slate-900 dark:bg-slate-200" />
          {props.children}
        </DialogDescription>
      </DialogHeader>
      {props.modalType === ModalType.simple && (
        <DialogFooter className="mt-8 mb-1">
          <DialogClose asChild>
            <Button type="button" className="px-8">
              OK
            </Button>
          </DialogClose>
        </DialogFooter>
      )}
    </DialogContent>
  );
};
