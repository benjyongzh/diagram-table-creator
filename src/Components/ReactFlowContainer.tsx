import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
} from "reactflow";
import featureFlags from "Configs/featureFlags";
import initialNodes, { initialNodeTypes } from "Objects/initialNodes";
import initialEdges from "Objects/initialEdges";
import { minimapStyle } from "Styles/minimap";
import "reactflow/dist/style.css";

import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import { setAllNodes, setAllNodeTypes } from "Features/nodeSlice";
import { setAllEdges } from "Features/edgeSlice";

const ReactFlowContainer = () => {
  const nodes = useAppSelector((state) => state.nodes.nodes);
  const edges = useAppSelector((state) => state.edges.edges);
  const nodeTypes = useAppSelector((state) => state.nodes.nodeTypes);
  const dispatch = useAppDispatch();

  const onInit = () => {
    console.log("hello! reactflow initialized");
    if (featureFlags.USE_INITIAL_OBJECTS) {
      dispatch(setAllNodes(initialNodes));
      dispatch(setAllEdges(initialEdges));
      dispatch(setAllNodeTypes(initialNodeTypes));
    }
  };

  // const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      //   onNodesChange={onNodesChange}
      //   onEdgesChange={onEdgesChange}
      //   onConnect={onConnect}
      onInit={onInit}
      // connectionLineComponent={}
      fitView
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background color="#999" variant={BackgroundVariant.Dots} gap={16} />
      {/* <div className="w-fit">
        <label
          htmlFor="sidebar-mobile-fixed"
          className="btn-primary btn sm:hidden"
        >
          Open Sidebar
        </label>
      </div> */}
    </ReactFlow>
  );
};

export default ReactFlowContainer;
