import React from "react";

export const SidebarSectionDropDown = ({
  children,
  sectionName,
}: {
  children: React.ReactNode;
  sectionName: string;
}) => {
  return (
    <section className="menu-section px-2">
      <input
        type="checkbox"
        id={`sidebar-section-${sectionName}`}
        className="menu-toggle"
      />
      <label
        className="menu-item justify-between"
        htmlFor={`sidebar-section-${sectionName}`}
      >
        <span>{sectionName}</span>
        <span className="menu-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            className="w-4 h-4 stroke-content3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </label>

      <div className="menu-item-collapse">
        <ul className="menu-items min-h-0">{children}</ul>
      </div>
    </section>
  );
};
