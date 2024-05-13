import { useState } from "react";
import { SidebarComponentListItem } from "./SidebarComponentListItem";
import { SidebarSectionDropDown } from "./SidebarSectionDropDown";
import { useAppSelector } from "Hooks/reduxHooks";
import CustomNodeVariant from "Types/customNodeVariant";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import ButtonStyledIcon from "./ui/ButtonStyledIcon";
import { AccordionContent } from "./ui/accordion";
import { Settings } from "lucide-react";

export const Sidebar = () => {
  const variants: Array<CustomNodeVariant> = useAppSelector(
    (state) => state.customNodeVariants.variants
  );
  const [openedComponent, setOpenedComponent] =
    useState<CustomNodeVariant | null>(null);

  const onComponentItemClick = (variant: CustomNodeVariant | null) => {
    if (variant === null) {
      setOpenedComponent(null);
      return;
    }
    openedComponent === variant
      ? setOpenedComponent(null)
      : setOpenedComponent(variant);
  };

  const onSettingsButtonClicked = () => {};

  return (
    <div className="flex h-full w-full max-w-96 justify-start items-start">
      <aside className="flex flex-col h-full w-full background-standard">
        <section className="sidebar-header-section">
          <svg
            fill="none"
            height="42"
            viewBox="0 0 32 32"
            width="42"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect height="100%" rx="16" width="100%"></rect>
            <path
              clipRule="evenodd"
              d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
              fill="currentColor"
              fillRule="evenodd"
            ></path>
          </svg>
          <span className="menu-text-lg text-2xl font-medium">
            Diagram Table Creator
          </span>
        </section>
        <section className="sidebar-content-section">
          <nav className="flex flex-col gap-2 w-full">
            <SidebarSectionDropDown sectionName="Main menu">
              <AccordionContent className="pl-8 py-2 text-base sidebar-list-menu-item hoverable-menu-item menu-text">
                General
              </AccordionContent>
            </SidebarSectionDropDown>

            {/* <Separator /> */}
            <SidebarSectionDropDown sectionName="Components">
              {variants.map((variant: CustomNodeVariant) => (
                <SidebarComponentListItem
                  variant={variant}
                  key={variant.nodeName}
                  onComponentItemClick={onComponentItemClick}
                  isOpened={openedComponent === variant}
                />
              ))}
            </SidebarSectionDropDown>
          </nav>
        </section>

        <section className="sidebar-footer-section flex-row justify-between">
          <span className="menu-text font-medium">footer</span>
          <ButtonStyledIcon onButtonClick={onSettingsButtonClicked}>
            <Settings />
          </ButtonStyledIcon>
        </section>
      </aside>
    </div>
  );
};
