import { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  NodeChange,
  EdgeChange,
  Connection,
  Panel,
} from "reactflow";
//components
import DevTools from "./DevTools";

import { Bars3Icon } from "@heroicons/react/24/solid";

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
      className="bg-slate-12"
      fitView
    >
      <MiniMap style={minimapStyle} nodeStrokeWidth={3} zoomable pannable />
      <Controls />
      <Background
        color="#555"
        size={6}
        variant={BackgroundVariant.Cross}
        gap={40}
      />
      {/* <DevTools /> */}
      <Panel position="top-left">
        <label
          htmlFor="sidebar-mobile-fixed"
          className="btn-ghost btn sm:hidden px-2"
        >
          <Bars3Icon className="h-8 w-8 text-gray-500" />
        </label>
      </Panel>
    </ReactFlow>
  );
};

export default ReactFlowContainer;
