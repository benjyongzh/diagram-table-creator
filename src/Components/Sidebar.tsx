// components
import { SidebarComponentListItem } from "./SidebarComponentListItem";
import { SidebarEdgeListItem } from "./SidebarEdgeListItem";
import { SidebarSectionDropDown } from "./SidebarSectionDropDown";
import { ModalSettings } from "./modals/ModalSettings";
import { ModalFormNode } from "./modals/ModalFormNode";
import { SidebarListItem } from "./SidebarListItem";
import ButtonStyledIcon from "./ui/ButtonStyledIcon";
import { AccordionContent } from "./ui/accordion";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Separator } from "./ui/separator";
import { useState } from "react";

// ui
import { Settings, CirclePlus } from "lucide-react";

//hooks
import { useAppSelector } from "Hooks/reduxHooks";
import { useSidebarListItemState } from "Hooks/useSidebarListItemState";

import CustomNodeVariant from "Types/nodes/customNodeVariant";
import CustomEdgeVariant from "Types/edges/customEdgeVariant";

import featureFlags from "@/Configs/featureFlags";
import { Modal } from "./modals/Modal";

export const Sidebar = () => {
  const nodeVariants: Array<CustomNodeVariant> = useAppSelector(
    (state) => state.customNodeVariants.variants
  );
  const edgeVariants: Array<CustomEdgeVariant> = useAppSelector(
    (state) => state.customEdgeVariants.variants
  );

  const {
    openedListItem: openedComponent,
    onListtItemHover: onComponentItemHover,
  } = useSidebarListItemState<CustomNodeVariant>();
  const { openedListItem: openedEdge, onListtItemHover: onEdgeItemHover } =
    useSidebarListItemState<CustomEdgeVariant>();

  const [modalNewNodeIsOpen, setModalNewNodeIsOpen] = useState(false);
  const [modalNewEdgeIsOpen, setModalNewEdgeIsOpen] = useState(false);

  return (
    <div className="flex h-full w-full max-w-96 justify-start items-start">
      <aside className="flex flex-col h-full w-full background-gradient-standard">
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
              {featureFlags.CAN_CREATE_NEW_NODES && (
                <Modal
                  openState={{
                    open: modalNewNodeIsOpen,
                    setOpen: setModalNewNodeIsOpen,
                  }}
                  triggerElement={
                    <DialogTrigger className="w-full">
                      <SidebarListItem onListItemClick={() => {}}>
                        <div className="flex items-center justify-between">
                          <span>Add New Component</span>
                          <CirclePlus />
                        </div>
                      </SidebarListItem>
                    </DialogTrigger>
                  }
                  modalContent={
                    <ModalFormNode setModalOpen={setModalNewNodeIsOpen} />
                  }
                />
              )}

              {nodeVariants.map((variant: CustomNodeVariant) => (
                <SidebarComponentListItem
                  variant={variant}
                  key={variant.nodeName}
                  onHover={onComponentItemHover}
                  isFocused={openedComponent === variant}
                />
              ))}
            </SidebarSectionDropDown>
            <SidebarSectionDropDown sectionName="Connections">
              {featureFlags.CAN_CREATE_NEW_EDGES && (
                // <Modal
                //   openState={{
                //     open: modalNewEdgeIsOpen,
                //     setOpen: setModalNewEdgeIsOpen,
                //   }}
                //   triggerElement={
                //     <DialogTrigger className="w-full">
                <SidebarListItem onListItemClick={() => {}}>
                  <div className="flex items-center justify-between">
                    <span>Add New Connection Type</span>
                    <CirclePlus />
                  </div>
                </SidebarListItem>
                //     </DialogTrigger>
                //   }
                //   modalContent={
                //     <ModalFormEdge setModalOpen={setModalNewEdgeIsOpen} />
                //   }
                // />
              )}

              {edgeVariants.map((variant: CustomEdgeVariant) => (
                <SidebarEdgeListItem
                  variant={variant}
                  key={variant.edgeName}
                  onHover={onEdgeItemHover}
                  isFocused={openedEdge === variant}
                />
              ))}
            </SidebarSectionDropDown>
          </nav>
        </section>

        <section className="sidebar-footer-section flex-row justify-between">
          <span className="menu-text font-medium">footer</span>
          <Modal
            triggerElement={
              <DialogTrigger>
                <ButtonStyledIcon>
                  <Settings />
                </ButtonStyledIcon>
              </DialogTrigger>
            }
            modalContent={<ModalSettings />}
          />
        </section>
      </aside>
    </div>
  );
};
