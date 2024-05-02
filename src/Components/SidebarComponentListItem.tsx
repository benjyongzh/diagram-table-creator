import CustomNodeVariant from "Types/customNodeVariant";

type sidebarComponentListItemProps = {
  variant: CustomNodeVariant;
};

export const SidebarComponentListItem = (
  props: sidebarComponentListItemProps
) => {
  const onAdd = () => {};
  const onEdit = () => {};
  return (
    <li>
      <input
        type="checkbox"
        id={`component-list-item-${props.variant.nodeName}`}
        className="menu-toggle"
      />
      <label
        className="menu-item justify-between"
        htmlFor={`component-list-item-${props.variant.nodeName}`}
      >
        <div className="flex gap-2">
          <span>{props.variant.nodeName}</span>
        </div>
      </label>

      <div className="menu-item-collapse">
        <div className="min-h-0">
          <label className="menu-item ml-6" onClick={onAdd}>
            Add
          </label>
          <label className="menu-item ml-6 disabled" onClick={onEdit}>
            Edit
          </label>
        </div>
      </div>
    </li>
  );
};
