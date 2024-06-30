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
  setAllNodes,
} from "@/Store/nodeSlice";

import {
  onEdgesChange as onReactFlowEdgesChange,
  onConnect as onReactFlowConnect,
  setAllEdges,
} from "@/Store/edgeSlice";
import { setAllNodeVariants } from "Store/nodeVariantSlice";
import { setAllEdgeVariants } from "Store/edgeVariantSlice";
import { setAllHandleVariants } from "Store/handleVariantSlice";

//hooks
import { useConnectionValidation } from "Hooks/useConnectionValidation";
import { useStoreEdges } from "Hooks/edges/useStoreEdges";

//initial
import initialNodes, {
  initialNodeVariants,
  initialNodeTypes,
  initialHandleVariants,
} from "Objects/initialNodes";
import initialEdges, {
  initialEdgeVariants,
  initialEdgeTypes,
} from "Objects/initialEdges";

//styles
import { minimapStyle } from "Styles/minimap";
import "reactflow/dist/style.css";
import { useTheme } from "./providers/ThemeProvider";
import { standardEdgeData } from "Types/edges/edge";

const nodeTypes = initialNodeTypes;
const edgeTypes = initialEdgeTypes;

const ReactFlowContainer = () => {
  const { theme } = useTheme();
  // const reactFlowInstance = useReactFlow();
  // const zoom = reactFlowInstance.getZoom();
  const nodes = useAppSelector((state) => state.nodes.nodes);
  const edges = useAppSelector((state) => state.edges.edges);
  const edgeVariants = useAppSelector((state) => state.edgeVariants.variants);
  const dispatch = useAppDispatch();
  const { connectionIsValid } = useConnectionValidation();
  const { addEdgeFromConnection } = useStoreEdges();

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
      addEdgeFromConnection(connection);
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
      dispatch(setAllEdgeVariants(initialEdgeVariants));
      dispatch(setAllHandleVariants(initialHandleVariants));
      dispatch(setAllNodeVariants(initialNodeVariants));
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
