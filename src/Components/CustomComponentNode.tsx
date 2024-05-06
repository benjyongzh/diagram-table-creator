import { memo, useEffect } from "react";
import { Handle, NodeProps, useUpdateNodeInternals } from "reactflow";
import { XMarkIcon } from "@heroicons/react/16/solid";
import colors from "Types/colorString";
import { nodeBackgroundBrightnessTailwind } from "Configs/nodeConfig";
import { HandleVariant } from "Types/handleVariant";
import mapHandlePositionToStyle from "Styles/handle";
import { useAppSelector } from "Hooks/reduxHooks";
import nodeDimensions from "Types/nodeDimenions";
import { Node } from "reactflow";

// export default memo(({ id, data }: { id: string; data: CustomNodeVariant }) => {
export default memo((props: NodeProps) => {
  const { id, data } = props;
  // const updateNodeInternals = useUpdateNodeInternals();
  // useEffect(() => {
  //   updateNodeInternals(id);
  // }, [data.handleTypes]);

  const nodeDimensions: nodeDimensions = {
    height: useAppSelector(
      (state) =>
        state.reactFlowObjects.nodes.filter((node: Node) => node.id === id)[0]
          .height
    ),
    width: useAppSelector(
      (state) =>
        state.reactFlowObjects.nodes.filter((node: Node) => node.id === id)[0]
          .width
    ),
  };

  const onDeleteButtonClicked = () => {};

  const setHandles = () => {};

  return (
    <div
      className={`nodeComponent flex-col ${
        data.isHovered
          ? `bg-${colors[data.color]}-${nodeBackgroundBrightnessTailwind.hover}`
          : `bg-${colors[data.color]}-${
              nodeBackgroundBrightnessTailwind.normal
            }`
      }`}
    >
      <h2>
        {data.nodeName} {data.variantIndex}
      </h2>
      <p>
        height: {nodeDimensions.height}, width: {nodeDimensions.width}
      </p>
      <div className={`${data.isHovered ? "visible" : "invisible"}`}>
        <button
          className="btn btn-circle btn-ghost btn-xs btn-error"
          onClick={onDeleteButtonClicked}
        >
          <XMarkIcon className="h-6 w-6 text-gray-500" />;
        </button>
      </div>
      {data.handleTypes.map((handleType: HandleVariant) =>
        Array.from({ length: handleType.quantity }).map((_item, index) => (
          <Handle
            key={index}
            id={`${data.nodeName}-${data.variantIndex}-${
              handleType.handleName
            }-${index.toString()}`}
            type={handleType.handleType}
            position={handleType.position} //position should depend on value of handleCount
            isConnectableStart={true}
            isConnectableEnd={true}
            // style={mapHandlePositionToStyle[handleType.position]}
          />
        ))
      )}
    </div>
  );
});
