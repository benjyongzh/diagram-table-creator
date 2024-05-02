import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreNodes } from "Types/storeNodes";
import { Node } from "reactflow";

// Define the initial state using that type
const initialState: StoreNodes = {
  nodes: [],
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
  },
});

// Action creators are generated for each case reducer function
export const { addNewNode, removeNode, setAllNodes } = nodeSlice.actions;

export default nodeSlice.reducer;
