import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { EdgeVariant, EdgeVariantId } from "Types/edges/edgeVariant";

type StoreEdgeVariants = {
  edgeVariants: EdgeVariant[];
};

// Define the initial state using that type
const initialState: StoreEdgeVariants = {
  edgeVariants: [],
};

export const edgeVariantSlice: Slice = createSlice({
  name: "edgeVariants",
  initialState,
  reducers: {
    // node types
    addEdgeVariant: (state, action: PayloadAction<EdgeVariant>) => {
      state.edgeVariants.push(action.payload);
    },
    removeEdgeVariant: (state, action: PayloadAction<EdgeVariantId>) => {
      state.edgeVariants = state.edgeVariants.filter(
        (variant: EdgeVariant) => !(variant.id !== action.payload)
      );
    },
    updateEdgeVariant: (state, action: PayloadAction<EdgeVariant>) => {
      state.edgeVariants = state.edgeVariants.map((variant: EdgeVariant) => {
        if (variant.id === action.payload.id) {
          variant = { ...action.payload };
        }

        return variant;
      });
    },
    setAllEdgeVariants: (state, action: PayloadAction<EdgeVariant[]>) => {
      state.edgeVariants = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addEdgeVariant,
  removeEdgeVariant,
  updateEdgeVariant,
  setAllEdgeVariants,
} = edgeVariantSlice.actions;

export default edgeVariantSlice.reducer;
