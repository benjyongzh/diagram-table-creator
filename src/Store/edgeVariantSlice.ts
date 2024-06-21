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
    // editEdgeVariant: (state, action: PayloadAction<EditVariant>) => {
    //   state.variants = state.variants.map((variant) => {
    //     if (JSON.stringify(variant) === JSON.stringify(action.payload.old)) {
    //       variant = { ...variant, ...action.payload.new };
    //     }
    //     return variant;
    //   });
    // },
    setAllEdgeVariants: (state, action: PayloadAction<EdgeVariant[]>) => {
      state.edgeVariants = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addEdgeVariant,
  removeEdgeVariant,
  // editEdgeVariant,
  setAllEdgeVariants,
} = edgeVariantSlice.actions;

export default edgeVariantSlice.reducer;
