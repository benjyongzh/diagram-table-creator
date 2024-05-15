import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Separator } from "./ui/separator";

export const Modal = ({
  children,
  title,
  width,
}: {
  children: React.ReactNode;
  title: string;
  width: number;
}) => {
  return (
    <DialogContent className="max-w-fit">
      <DialogHeader>
        <DialogTitle className="text-xl">{title}</DialogTitle>
        <DialogDescription style={{ width: `${width}px` }}>
          <Separator className="mt-2 mb-4" />
          {children}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="mt-8 mb-1">
        <DialogClose asChild>
          <Button type="button" className="px-8">
            OK
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
