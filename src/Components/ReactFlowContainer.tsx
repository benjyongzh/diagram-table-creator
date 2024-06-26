import React, { useCallback } from "react";
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
  Node,
  Edge,
  ConnectionMode,
  // useReactFlow,
} from "reactflow";
//components
import DevTools from "./DevTools";

import { Bars3Icon } from "@heroicons/react/24/solid";

//config
import featureFlags from "@/Configs/featureFlags";

//redux
import { useAppSelector, useAppDispatch } from "Hooks/reduxHooks";
import {
  onNodesChange as onReactFlowNodesChange,
  onNodeMouseEnter as onReactFlowMouseEnter,
  onNodeMouseLeave as onReactFlowMouseLeave,
  onEdgesChange as onReactFlowEdgesChange,
  onConnect as onReactFlowConnect,
  setAllNodes,
  setAllEdges,
} from "@/Store/reactFlowSlice";
import { setAllNodeVariants } from "@/Store/customNodeVariantSlice";
import { setAllEdgeVariants } from "@/Store/customEdgeVariantSlice";

//hooks
import { useConnectionValidation } from "Hooks/useConnectionValidation";

//initial
import initialNodes, {
  initialCustomNodeVariants,
  initialNodeTypes,
} from "Objects/initialNodes";
import initialEdges, {
  initialCustomEdgeVariants,
  initialEdgeTypes,
} from "Objects/initialEdges";

//styles
import { minimapStyle } from "Styles/minimap";
import "reactflow/dist/style.css";
import { useTheme } from "./providers/ThemeProvider";
import { standardEdgeData } from "Objects/edges";

const nodeTypes = initialNodeTypes;
const edgeTypes = initialEdgeTypes;

const ReactFlowContainer = () => {
  const { theme } = useTheme();
  // const reactFlowInstance = useReactFlow();
  // const zoom = reactFlowInstance.getZoom();
  const nodes = useAppSelector((state) => state.reactFlowObjects.nodes);
  const edges = useAppSelector((state) => state.reactFlowObjects.edges);
  const edgeVariants = useAppSelector(
    (state) => state.customEdgeVariants.variants
  );
  const dispatch = useAppDispatch();
  const { connectionIsValid, createValidEdgeConnection } =
    useConnectionValidation(edges, edgeVariants);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => dispatch(onReactFlowNodesChange(changes)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => dispatch(onReactFlowEdgesChange(changes)),
    []
  );
  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdge: Edge = createValidEdgeConnection(connection);
      dispatch(onReactFlowConnect(newEdge));
    },
    [edges, edgeVariants]
  );

  //isValidConnection runs when hovering mouse over a handle during connecting
  const isValidConnection = useCallback(
    (connection: Connection) => connectionIsValid(connection),
    []
  );
  const onNodeMouseEnter = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      dispatch(onReactFlowMouseEnter(node.id));
    },
    []
  );
  const onNodeMouseLeave = useCallback(
    (event: React.MouseEvent, node: Node) => {
      event.preventDefault();
      dispatch(onReactFlowMouseLeave(node.id));
    },
    []
  );

  const onInit = () => {
    console.log("hello! reactflow initialized");
    if (featureFlags.USE_INITIAL_OBJECTS) {
      // dispatch(setAllNodes(initialNodes));
      // dispatch(setAllEdges(initialEdges));
      dispatch(setAllNodeVariants(initialCustomNodeVariants));
      dispatch(setAllEdgeVariants(initialCustomEdgeVariants));
    }
  };
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={standardEdgeData}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      isValidConnection={isValidConnection}
      onInit={onInit}
      onNodeMouseEnter={onNodeMouseEnter}
      onNodeMouseLeave={onNodeMouseLeave}
      connectionMode={ConnectionMode.Loose}
      className="background-gradient-low-contrast"
      fitView
      attributionPosition="bottom-left"
    >
      <MiniMap style={minimapStyle} nodeStrokeWidth={3} zoomable pannable />
      <Controls />
      <Background
        color={`${theme === "light" ? "#94a3b8" : "#475569"}`}
        // size={6}
        size={5}
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
