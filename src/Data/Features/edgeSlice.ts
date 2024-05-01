import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreEdgeState } from "Types/storeEdgeState";
import { Edge, addEdge } from "reactflow";
import { edgeParams } from "Types/edgeParams";
import { edgeConfig } from "Configs/edgeConfig";

// Define the initial state using that type
const initialState: StoreEdgeState = {
  edges: [],
};

export const edgeSlice = createSlice({
  name: "edges",
  initialState,
  reducers: {
    addNewEdge: (state, action: PayloadAction<edgeParams>) => {
      const newEdge: Edge = { ...edgeConfig, ...action.payload };
      addEdge(newEdge, state.edges);
    },
    removeEdge: (state, action: PayloadAction<Edge>) => {
      state.edges = state.edges.filter((edge) => edge.id !== action.payload.id);
    },
    setAllEdges: (state, action: PayloadAction<Array<Edge>>) => {
      state.edges = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewEdge, removeEdge, setAllEdges } = edgeSlice.actions;

export default edgeSlice.reducer;
