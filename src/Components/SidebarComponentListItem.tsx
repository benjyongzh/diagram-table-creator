type sidebarComponentListItemProps = {
  nodeType: Node;
};

export const SidebarComponentListItem = (
  props: sidebarComponentListItemProps
) => {
  //   const [isHovered, setIsHovered] = useState(false);
  const onAdd = () => {};
  const onEdit = () => {};
  return (
    <li>
      <input
        type="checkbox"
        id={`component-list-item-${props.nodeType || "myComponent"}`}
        className="menu-toggle"
      />
      <label
        className="menu-item justify-between"
        htmlFor={`component-list-item-${props.nodeType || "myComponent"}`}
      >
        <div className="flex gap-2">
          <span>{props.nodeType || "myComponent"}</span>
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
