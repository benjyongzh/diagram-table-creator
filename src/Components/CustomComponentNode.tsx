import { memo, useMemo } from "react";
import { Handle } from "reactflow";
import CustomNodeVariant from "Types/customNodeVariant";
import { XMarkIcon } from "@heroicons/react/16/solid";
import colorName from "Types/colorString";
import { getNodeBackgroundColourStyleTailwind } from "Utilities/colors";
import { colorNodeBackground } from "Objects/colors";

export default memo(({ data }: { data: CustomNodeVariant }) => {
  const onDeleteButtonClicked = () => {};
  const backgroundColor = useMemo(
    () => getNodeBackgroundColourStyleTailwind(colorName[data.color]),
    [data.color]
  );
  return (
    <div
      className={`nodeComponent flex-col ${
        data.isHovered
          ? // ? colorNodeBackground[colorName[data.color]].hover
            // : colorNodeBackground[colorName[data.color]].normal
            backgroundColor.hover
          : backgroundColor.normal
      }`}
    >
      <h2>
        {data.nodeName} {data.variantIndex}
      </h2>
      <p>{/*data.isHovered ? data.isHovered.toString() : "false"*/}</p>
      <div className={`${data.isHovered ? "visible" : "invisible"}`}>
        <button
          className="btn btn-circle btn-ghost btn-xs btn-error"
          onClick={onDeleteButtonClicked}
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />;
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
