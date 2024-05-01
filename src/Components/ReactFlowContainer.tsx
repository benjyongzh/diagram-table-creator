import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from "reactflow";
import featureFlags from "Configs/featureFlags";
import initialNodes from "Objects/initialNodes";
import initialEdges from "Objects/initialEdges";
import { minimapStyle } from "Styles/minimap";
import "reactflow/dist/style.css";

import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import { setNodes } from "Features/nodeSlice";

const ReactFlowContainer = () => {
  const nodes = useAppSelector((state) => state.nodes.nodes);
  const dispatch = useAppDispatch();

  const onInit = () => {
    console.log("hello! reactflow initialized");
    if (featureFlags.USE_INITIAL_OBJECTS) {
      dispatch(setNodes(initialNodes));
    }
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={featureFlags.USE_INITIAL_OBJECTS ? initialEdges : []}
      //   onNodesChange={onNodesChange}
      //   onEdgesChange={onEdgesChange}
      //   onConnect={onConnect}
      onInit={onInit}
      fitView
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#ccc" variant={BackgroundVariant.Dots} gap={16} />
    </ReactFlow>
  );
};

export default ReactFlowContainer;
