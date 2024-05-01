import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreNodeState } from "Types/storeNodeState";
import { Node } from "reactflow";

// Define the initial state using that type
const initialState: StoreNodeState = {
  nodes: [],
};

export const nodeSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    removeNode: (state, action: PayloadAction<Node>) => {
      //   state.value -= 1;
    },
    setNodes: (state, action: PayloadAction<Array<Node>>) => {
      state.nodes = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNode, removeNode, setNodes } = nodeSlice.actions;

export default nodeSlice.reducer;
