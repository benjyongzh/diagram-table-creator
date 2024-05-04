import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  NodeChange,
  EdgeChange,
  Connection,
} from "reactflow";
//components
import DevTools from "./DevTools";

//config
import featureFlags from "Configs/featureFlags";

//redux
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import {
  onNodesChange as onReactFlowNodesChange,
  onEdgesChange as onReactFlowEdgesChange,
  onConnect as onReactFlowConnect,
  setAllNodes,
  setAllEdges,
} from "Features/reactFlowSlice";
import { setAllNodeTypes } from "Features/nodeTypeSlice";
import { setAllNodeVariants } from "Features/customNodeVariantSlice";

//initial
import initialNodes, {
  initialCustomNodeVariants,
  initialNodeTypes,
} from "Objects/initialNodes";
import initialEdges from "Objects/initialEdges";

//styles
import { minimapStyle } from "Styles/minimap";
import "reactflow/dist/style.css";

const ReactFlowContainer = () => {
  const nodes = useAppSelector((state) => state.reactFlowObjects.nodes);
  const edges = useAppSelector((state) => state.reactFlowObjects.edges);
  const nodeTypes = useAppSelector((state) => state.nodeTypes.nodeTypes);
  const dispatch = useAppDispatch();

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => dispatch(onReactFlowNodesChange(changes)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => dispatch(onReactFlowEdgesChange(changes)),
    []
  );
  const onConnect = useCallback(
    (connection: Connection) => dispatch(onReactFlowConnect(connection)),
    []
  );

  const onInit = () => {
    console.log("hello! reactflow initialized");
    if (featureFlags.USE_INITIAL_OBJECTS) {
      dispatch(setAllNodes(initialNodes));
      dispatch(setAllEdges(initialEdges));
      dispatch(setAllNodeTypes(initialNodeTypes));
      dispatch(setAllNodeVariants(initialCustomNodeVariants));
    }
  };

  // const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onInit={onInit}
      // connectionLineComponent={}
      fitView
    >
      <MiniMap style={minimapStyle} zoomable pannable />
      <Controls />
      <Background
        color="#555"
        size={8}
        variant={BackgroundVariant.Cross}
        gap={40}
      />
      {/* <div className="w-fit">
        <label
          htmlFor="sidebar-mobile-fixed"
          className="btn-primary btn sm:hidden"
        >
          Open Sidebar
        </label>
      </div> */}
      <DevTools />
    </ReactFlow>
  );
};

export default ReactFlowContainer;
