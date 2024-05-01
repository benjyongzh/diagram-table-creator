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

const ReactFlowContainer = () => {
  const onInit = () => {
    console.log("hello! reactflow initialized");
  };
  return (
    <ReactFlow
      nodes={featureFlags.USE_INITIAL_OBJECTS ? initialNodes : []}
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
