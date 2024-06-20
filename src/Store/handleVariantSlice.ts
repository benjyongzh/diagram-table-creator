import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { HandleVariant, HandleVariantId } from "Types/handles/handleVariant";

type StoreHandleVariants = {
  handleVariants: HandleVariant[];
};

// Define the initial state using that type
const initialState: StoreHandleVariants = {
  handleVariants: [],
};

export const handleVariantslice: Slice = createSlice({
  name: "handleVariants",
  initialState,
  reducers: {
    // node types
    addNewHandleVariant: (state, action: PayloadAction<HandleVariant>) => {
      state.handleVariants.push(action.payload);
    },
    removeHandleVariant: (state, action: PayloadAction<HandleVariantId>) => {
      state.handleVariants = state.handleVariants.filter(
        (variant: HandleVariant) => !(variant.id !== action.payload)
      );
    },
    // editHandleVariant: (state, action: PayloadAction<EditVariant>) => {
    //   state.variants = state.variants.map((variant) => {
    //     if (JSON.stringify(variant) === JSON.stringify(action.payload.old)) {
    //       variant = { ...variant, ...action.payload.new };
    //     }
    //     return variant;
    //   });
    // },
    setAllHandleVariants: (state, action: PayloadAction<HandleVariant[]>) => {
      state.handleVariants = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewHandleVariant,
  removeHandleVariant,
  // editHandleVariant,
  setAllhandleVariants,
} = handleVariantslice.actions;

export default handleVariantslice.reducer;
