import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
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
import CustomNodeVariant from "Types/customNodeVariant";
import { checkNodeType } from "Utilities/reactFlowNodes";
import nodeConfigs from "Configs/nodeConfig";

// Define the initial state using that type
const initialState: StoreReactFlowObjects = {
  nodes: [],
  edges: [],
};

export const reactFlowSlice: Slice = createSlice({
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
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    removeNode: (state, action: PayloadAction<Node>) => {
      state.nodes = state.nodes.filter(
        (node: Node) => node.id !== action.payload.id
      );
    },
    // onNodeDataChange: (
    //   state,
    //   action: PayloadAction<{ editedNode: Node; newData: CustomNodeVariant }>
    // ) => {
    //   state.nodes = state.nodes.map((node: Node) => {
    //     if (node.id === action.payload.editedNode.id) {
    //       // it's important that you create a new object here
    //       // in order to notify react flow about the change
    //       node.data = {
    //         ...node.data,
    //         ...action.payload.newData,
    //       };
    //     }

    //     return node;
    //   });
    // },
    onNodeMouseEnter: (state, action: PayloadAction<Node>) => {
      if (!checkNodeType(action.payload, nodeConfigs.INITIAL_CUSTOM_NODE_NAME))
        return;

      state.nodes = state.nodes.map((node: Node) => {
        if (node.id === action.payload.id) {
          node.data = {
            ...node.data,
            isHovered: true,
          };
        }
        return node;
      });
    },
    onNodeMouseLeave: (state, action: PayloadAction<Node>) => {
      if (!checkNodeType(action.payload, nodeConfigs.INITIAL_CUSTOM_NODE_NAME))
        return;

      state.nodes = state.nodes.map((node: Node) => {
        if (node.id === action.payload.id) {
          node.data = {
            ...node.data,
            isHovered: false,
          };
        }
        return node;
      });
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
    removeEdge: (state, action: PayloadAction<Edge>) => {
      state.edges = state.edges.filter(
        (edge: Edge) => edge.id !== action.payload.id
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onNodesChange,
  setAllNodes,
  addNode,
  removeNode,
  onNodeMouseEnter,
  onNodeMouseLeave,
  onEdgesChange,
  onConnect,
  setAllEdges,
  removeEdge,
} = reactFlowSlice.actions;

export default reactFlowSlice.reducer;
