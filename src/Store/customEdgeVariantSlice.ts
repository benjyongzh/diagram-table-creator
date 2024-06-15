import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreCustomEdgeVariants } from "Types/store/storeCustomEdgeVariants";
import CustomEdgeVariant from "Types/edges/customEdgeVariant";

// Define the initial state using that type
const initialState: StoreCustomEdgeVariants = {
  variants: [],
};

export const edgeVariantSlice = createSlice({
  name: "edgeVariants",
  initialState,
  reducers: {
    // node types
    addNewEdgeVariant: (state, action: PayloadAction<CustomEdgeVariant>) => {
      state.variants.push(action.payload);
    },
    removeEdgeVariant: (state, action: PayloadAction<CustomEdgeVariant>) => {
      state.variants = state.variants.filter(
        (variant) => !(variant.edgeName !== action.payload.edgeName)
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
    setAllEdgeVariants: (state, action: PayloadAction<CustomEdgeVariant[]>) => {
      state.variants = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewEdgeVariant,
  removeEdgeVariant,
  // editEdgeVariant,
  setAllEdgeVariants,
} = edgeVariantSlice.actions;

export default edgeVariantSlice.reducer;
