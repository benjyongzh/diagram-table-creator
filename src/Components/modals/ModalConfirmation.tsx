import { ModalContentWrapper } from "./ModalContentWrapper";
import { Button } from "Components/ui/button";
import { DialogClose } from "Components/ui/dialog";
import ModalType from "Types/modalType";
import { useMemo } from "react";

type ModalConfirmationProps = {
  title?: string;
  text: string;
  destructive?: boolean;
  action: Function;
};

const defaultTitle: string = "Are you sure";

export const ModalConfirmation = (props: ModalConfirmationProps) => {
  const { title, text, destructive, action } = props;

  const modalTItle: string = useMemo(
    () => (title ? title : defaultTitle),
    [title]
  );

  const isDestructive: boolean = useMemo(
    () => (destructive ? destructive : false),
    [destructive]
  );

  return (
    <ModalContentWrapper
      title={modalTItle}
      width={540}
      modalType={ModalType.confirmation}
    >
      <div className="w-full flex flex-col gap-7">
        <span className="menu-text">{text}</span>
        <div className="w-full flex items-center justify-end gap-4">
          <Button
            type="button"
            onClick={() => action()}
            variant={isDestructive ? "destructive" : "default"}
            className="px-8"
          >
            Confirm
          </Button>
          <DialogClose asChild>
            <Button type="button" variant="outline" className="px-8">
              Cancel
            </Button>
          </DialogClose>
        </div>
      </div>
    </ModalContentWrapper>
  );
};
