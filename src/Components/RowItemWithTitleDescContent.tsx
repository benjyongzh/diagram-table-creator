import { Children } from "react";

type RowItemWithTitleDescContentProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};
export const RowItemWithTitleDescContent = (
  props: RowItemWithTitleDescContentProps
) => {
  return (
    <section className="flex justify-between items-center w-full gap-5">
      <div className="flex flex-col gap-1 justify-between items-start">
        <header className="menu-text-lg font-bold">{props.title}</header>
        <span className="menu-text-low-contrast">{props.description}</span>
      </div>
      {props.children}
    </section>
  );
};
