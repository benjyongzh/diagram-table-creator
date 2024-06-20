import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { EdgeId } from "Types/edges/edge";
import {
  Edge,
  addEdge,
  EdgeChange,
  applyEdgeChanges,
  Connection,
} from "reactflow";

type StoreEdges = {
  edges: Edge[];
};

// Define the initial state using that type
const initialState: StoreEdges = {
  edges: [],
};

export const edgeSlice: Slice = createSlice({
  name: "edges",
  initialState,
  reducers: {
    onEdgesChange: (state, action: PayloadAction<EdgeChange[]>) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action: PayloadAction<Connection | Edge>) => {
      state.edges = addEdge(action.payload, state.edges);
    },
    setAllEdges: (state, action: PayloadAction<Array<Edge>>) => {
      state.edges = action.payload;
    },
    editEdge: (state, action: PayloadAction<Edge>) => {
      state.edges = state.edges.map((edge: Edge) => {
        if (edge.id === action.payload.id) {
          return { ...edge, ...action.payload };
        }
        return edge;
      });
    },
    removeEdgeById: (state, action: PayloadAction<EdgeId>) => {
      state.edges = state.edges.filter(
        (edge: Edge) => edge.id !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onEdgesChange,
  onConnect,
  setAllEdges,
  editEdge,
  removeEdgeById,
} = edgeSlice.actions;

export default edgeSlice.reducer;
