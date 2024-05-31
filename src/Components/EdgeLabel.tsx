type EdgeLabelProps = {
  show: boolean;
  label: string;
  origin: { x: number; y: number };
  className?: string;
};
function EdgeLabel(props: EdgeLabelProps) {
  const { show, label, origin, className } = props;
  return (
    <div
      style={{
        transform: `translate(${origin.x}px, ${origin.y}px) translate(-50%, -100%) translate(0%, -5px)`,
      }}
      className={`absolute py-1 px-2 rounded z-10 menu-text-low-contrast background-low-contrast text-xs nodrag nopan ${
        show ? "visible" : "invisible"
      } ${className ? className : ""}`}
    >
      {label}
    </div>
  );
}

export default EdgeLabel;
