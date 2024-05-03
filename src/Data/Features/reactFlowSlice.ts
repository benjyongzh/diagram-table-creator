import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreReactFlowObjects } from "Types/storeReactFlowObjects";
import {
  Node,
  NodeChange,
  applyNodeChanges,
  Edge,
  addEdge,
  EdgeChange,
  applyEdgeChanges,
  Connection,
} from "reactflow";

// Define the initial state using that type
const initialState: StoreReactFlowObjects = {
  nodes: [],
  edges: [],
};

export const reactFlowSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    //node objects
    onNodesChange: (state, action: PayloadAction<NodeChange[]>) => {
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    setAllNodes: (state, action: PayloadAction<Array<Node>>) => {
      state.nodes = action.payload;
    },

    //edges
    onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      state.edges = addEdge(action.payload, state.edges);
    },
    setAllEdges: (state, action: PayloadAction<Array<Edge>>) => {
      state.edges = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onNodesChange,
  setAllNodes,
  onEdgesChange,
  onConnect,
  setAllEdges,
} = reactFlowSlice.actions;

export default reactFlowSlice.reducer;
