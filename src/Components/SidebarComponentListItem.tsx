import CustomNodeVariant from "Types/customNodeVariant";
import { useAppDispatch } from "Hooks/reduxHooks";
import { addNode } from "Features/reactFlowSlice";
import { createNodeFromData } from "Utilities/reactFlowNodes";

type sidebarComponentListItemProps = {
  variant: CustomNodeVariant;
};

export const SidebarComponentListItem = (
  props: sidebarComponentListItemProps
) => {
  const dispatch = useAppDispatch();

  const onAdd = () => {
    dispatch(addNode(createNodeFromData(props.variant)));
  };

  const onEdit = () => {};

  return (
    <li className="menu-section">
      <input
        type="checkbox"
        id={`sidebar-component-${props.variant.nodeName}`}
        className="menu-toggle"
      />
      <label
        className="menu-item justify-between pl-6"
        htmlFor={`sidebar-component-${props.variant.nodeName}`}
      >
        <span>{props.variant.nodeName}</span>
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
        <ul className="menu-items min-h-0">
          <label className="menu-item justify-between pl-12" onClick={onAdd}>
            <span>Add</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-content3"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H5C3.89 3 3 3.9 3 5ZM15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9ZM6 17C6 15 10 13.9 12 13.9C14 13.9 18 15 18 17V18H6V17Z"
              ></path>
            </svg>
          </label>
          <label className="menu-item justify-between pl-12" onClick={onEdit}>
            <span>Edit</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-content3"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3H5C3.89 3 3 3.9 3 5ZM15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9ZM6 17C6 15 10 13.9 12 13.9C14 13.9 18 15 18 17V18H6V17Z"
              ></path>
            </svg>
          </label>
        </ul>
      </div>
    </li>
  );
};
