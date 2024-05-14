import { Modal } from "./Modal";
import { Separator } from "./ui/separator";

export const ModalSettings = () => {
  return (
    <Modal title="Settings">
      <Separator className="my-3" />
      <div className="flex flex-col gap-5">
        <section className="flex justify-between items-center w-full">
          <header className="menu-text">Theme</header>
          <span>dark mode?</span>
        </section>
        <section className="flex justify-between items-center w-full">
          <header className="menu-text">Save</header>
          <span>save/load</span>
        </section>
      </div>
    </Modal>
  );
};
