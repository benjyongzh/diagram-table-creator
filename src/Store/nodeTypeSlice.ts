import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreNodeTypes } from "Types/store/storeNodeTypes";
import { NodeTypes } from "reactflow";
import { removeSubsetObject } from "Utilities/objects";

// Define the initial state using that type
const initialState: StoreNodeTypes = {
  nodeTypes: {},
};

export const nodeTypeSlice = createSlice({
  name: "nodeTypes",
  initialState,
  reducers: {
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
export const { addNewNodeType, removeNodeType, setAllNodeTypes } =
  nodeTypeSlice.actions;

export default nodeTypeSlice.reducer;
