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
    <DialogContent className="max-w-fit bg-slate-100">
      <DialogHeader>
        <DialogTitle className="menu-text font-bold text-xl">
          {title}
        </DialogTitle>
        <DialogDescription style={{ width: `${width}px` }}>
          <Separator className="mt-2 mb-4 bg-slate-900 dark:bg-slate-200" />
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
