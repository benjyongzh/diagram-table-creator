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
    addHandleVariant: (state, action: PayloadAction<HandleVariant>) => {
      state.handleVariants.push(action.payload);
    },
    removeHandleVariant: (state, action: PayloadAction<HandleVariantId>) => {
      state.handleVariants = state.handleVariants.filter(
        (variant: HandleVariant) => !(variant.id !== action.payload)
      );
    },
    updateHandleVariant: (state, action: PayloadAction<HandleVariant>) => {
      state.handleVariants = state.handleVariants.map(
        (variant: HandleVariant) => {
          if (variant.id === action.payload.id) {
            variant = { ...action.payload };
          }

          return variant;
        }
      );
    },
    setAllHandleVariants: (state, action: PayloadAction<HandleVariant[]>) => {
      state.handleVariants = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addHandleVariant,
  removeHandleVariant,
  updateHandleVariant,
  setAllhandleVariants,
} = handleVariantslice.actions;

export default handleVariantslice.reducer;
