import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreNodeState } from "Types/storeNodeState";
import { Node } from "reactflow";
import { NodeTypes } from "reactflow";
import { removeSubsetObject } from "Utilities/objects";

// Define the initial state using that type
const initialState: StoreNodeState = {
  nodes: [],
  nodeTypes: {},
};

export const nodeSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    //node objects
    addNewNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    removeNode: (state, action: PayloadAction<Node>) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload.id);
    },
    setAllNodes: (state, action: PayloadAction<Array<Node>>) => {
      state.nodes = action.payload;
    },
    // node types
    addNewNodeType: (state, action: PayloadAction<NodeTypes>) => {
      state.nodeTypes = { ...state.nodeTypes, ...action.payload };
    },
    removeNodeType: (state, action: PayloadAction<NodeTypes>) => {
      state.nodeTypes = removeSubsetObject(state.nodeTypes, action.payload);
    },
    setAllNodeTypes: (state, action: PayloadAction<NodeTypes>) => {
      state.nodeTypes = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewNode,
  removeNode,
  setAllNodes,
  addNewNodeType,
  removeNodeType,
  setAllNodeTypes,
} = nodeSlice.actions;

export default nodeSlice.reducer;
