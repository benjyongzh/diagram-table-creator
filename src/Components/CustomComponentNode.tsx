import { memo } from "react";
import { Handle } from "reactflow";
import CustomNodeVariant from "Types/customNodeVariant";

export default memo(({ data }: { data: CustomNodeVariant }) => {
  const onDeleteButtonClicked = () => {};
  return (
    <div
      className={`${
        data.isHovered ? "bg-primary" : "bg-content2"
      } nodeComponent flex-col`}
    >
      <h2>{data.nodeName}</h2>
      <p>{/*data.isHovered ? data.isHovered.toString() : "false"*/}</p>
      <div className={`${data.isHovered ? "visible" : "invisible"}`}>
        <button
          className="btn btn-circle btn-error"
          onClick={onDeleteButtonClicked}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      {data.handleTypes.map((handleType) =>
        Array.from({ length: handleType.quantity }).map((_item, index) => (
          <Handle
            id={`${data.nodeName} port ${index.toString()}`}
            type={handleType.handleType}
            position={handleType.position} //position should depend on value of handleCount
          />
        ))
      )}
    </div>
  );
});
