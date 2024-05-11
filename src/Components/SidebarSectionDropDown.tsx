// import { useState } from "react";
import {
  Accordion,
  // AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "Components/ui/accordion";

export const SidebarSectionDropDown = ({
  children,
  sectionName,
}: {
  children: React.ReactNode;
  sectionName: string;
}) => {
  // const [isOpened, setIsOpened] = useState(false);
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={sectionName} className="pb-2">
        <AccordionTrigger className="py-3 menu-text-lg justify-between sidebar-list-menu-item hoverable-menu-item hover:no-underline">
          {sectionName}
        </AccordionTrigger>
        {children}
      </AccordionItem>
    </Accordion>
    // <section className="flex flex-col relative">
    //   <button
    //     className="sidebar-list-menu-item hoverable-menu-item"
    //     onClick={() => setIsOpened((state) => !state)}
    //   >
    //     <span className="menu-text">{sectionName}</span>
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth="1.5"
    //       className={`w-4 h-4 stroke-slate-900 dark:stroke-slate-50 transition-all ease-in-out ${
    //         isOpened ? "rotate-90" : ""
    //       }`}
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M8.25 4.5l7.5 7.5-7.5 7.5"
    //       />
    //     </svg>
    //   </button>

    //   <div
    //     className={`overflow-hidden transition-all ease-in-out flex-auto ${
    //       isOpened ? "h-48" : "h-0"
    //     }`}
    //   >
    //     <ul className="min-h-0 mt-2 gap-2">{children}</ul>
    //   </div>
    // </section>
  );
};
