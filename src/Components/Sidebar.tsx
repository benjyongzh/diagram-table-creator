import { SidebarComponentListItem } from "./SidebarComponentListItem";
import { useAppSelector } from "Hooks/reduxHooks";
import CustomNodeVariant from "Types/customNodeVariant";
import { SidebarSectionDropDown } from "./SidebarSectionDropDown";
import { Separator } from "./ui/separator";
import { AccordionContent } from "./ui/accordion";
import { useState } from "react";
useState;

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

            {/* <section className="menu-section px-4">
              <span className="menu-title">Settings</span>
              <ul className="menu-items">
                <li className="menu-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="opacity-75"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M7 10l5 -6l5 6"></path>
                    <path d="M21 10l-2 8a2 2.5 0 0 1 -2 2h-10a2 2.5 0 0 1 -2 -2l-2 -8z"></path>
                    <path d="M12 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                  </svg>
                  Products
                </li>
                <li>
                  <input type="checkbox" id="menu-2" className="menu-toggle" />
                  <label className="menu-item justify-between" htmlFor="menu-2">
                    <div className="flex gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="opacity-75"
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path
                          stroke="none"
                          d="M0 0h24v24H0z"
                          fill="none"
                        ></path>
                        <path d="M15 21h-9a3 3 0 0 1 -3 -3v-1h10v2a2 2 0 0 0 4 0v-14a2 2 0 1 1 2 2h-2m2 -4h-11a3 3 0 0 0 -3 3v11"></path>
                        <path d="M9 7l4 0"></path>
                        <path d="M9 11l4 0"></path>
                      </svg>
                      <span>Contracts</span>
                    </div>

                    <span className="menu-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </label>

                  <div className="menu-item-collapse">
                    <div className="min-h-0">
                      <label className="menu-item menu-item-disabled ml-6">
                        Create contract
                      </label>
                      <label className="menu-item ml-6">All contracts</label>
                      <label className="menu-item ml-6">
                        Pending contracts
                      </label>
                      <label className="menu-item ml-6">Security</label>
                    </div>
                  </div>
                </li>
              </ul>
            </section> */}
          </nav>
        </section>

        <section className="sidebar-footer-section ">
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
          <span className="menu-text font-medium">footer</span>
        </section>
      </aside>
    </div>
  );
};
