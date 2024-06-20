import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { NodeVariant } from "Types/nodes/nodeVariant";

type StoreNodeVariants = {
  nodeVariants: NodeVariant[];
};

// Define the initial state using that type
const initialState: StoreNodeVariants = {
  nodeVariants: [],
};

export const nodeVariantSlice: Slice = createSlice({
  name: "nodeVariants",
  initialState,
  reducers: {
    // node types
    addNewNodeVariant: (state, action: PayloadAction<NodeVariant>) => {
      state.nodeVariants.push(action.payload);
    },
    removeNodeVariant: (state, action: PayloadAction<NodeVariant>) => {
      state.nodeVariants = state.nodeVariants.filter(
        (variant: NodeVariant) =>
          !(variant.nodeName !== action.payload.nodeName)
      );
    },
    // editNodeVariant: (state, action: PayloadAction<EditVariant>) => {
    //   state.nodeVariants = state.nodeVariants.map((variant) => {
    //     if (JSON.stringify(variant) === JSON.stringify(action.payload.old)) {
    //       variant = { ...variant, ...action.payload.new };
    //     }
    //     return variant;
    //   });
    // },
    setAllNodeVariants: (state, action: PayloadAction<NodeVariant[]>) => {
      state.nodeVariants = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewNodeVariant,
  removeNodeVariant,
  // editNodeVariant,
  setAllNodeVariants,
} = nodeVariantSlice.actions;

export default nodeVariantSlice.reducer;
