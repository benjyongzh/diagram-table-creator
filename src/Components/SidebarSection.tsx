import React from "react";

export const SidebarSection = ({
  children,
  sectionName,
}: {
  children: React.ReactNode;
  sectionName: string;
}) => {
  return (
    <section className="menu-section px-4">
      <span className="menu-title">{sectionName}</span>
      <ul className="menu-items">{children}</ul>
    </section>
  );
};
