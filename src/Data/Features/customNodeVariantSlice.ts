import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreCustomNodeVariants } from "Types/storeCustomNodeVariants";
import CustomNodeVariant from "Types/customNodeVariant";

// Define the initial state using that type
const initialState: StoreCustomNodeVariants = {
  variants: [],
};

export const nodeVariantSlice = createSlice({
  name: "nodeVariants",
  initialState,
  reducers: {
    // node types
    addNewNodeVariant: (state, action: PayloadAction<CustomNodeVariant>) => {
      state.variants = { ...state.variants, ...action.payload };
    },
    removeNodeVariant: (state, action: PayloadAction<CustomNodeVariant>) => {
      state.variants = state.variants.filter(
        (variant) => !(variant.nodeName !== action.payload.nodeName)
      );
    },
    setAllNodeVariants: (state, action: PayloadAction<CustomNodeVariant[]>) => {
      state.variants = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addNewNodeVariant, removeNodeVariant, setAllNodeVariants } =
  nodeVariantSlice.actions;

export default nodeVariantSlice.reducer;
