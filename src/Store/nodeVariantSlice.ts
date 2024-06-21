import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { NodeVariant, NodeVariantId } from "Types/nodes/nodeVariant";

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
    addNodeVariant: (state, action: PayloadAction<NodeVariant>) => {
      state.nodeVariants.push(action.payload);
    },
    updateNodeVariant: (state, action: PayloadAction<NodeVariant>) => {
      state.nodeVariants = state.nodeVariants.map((variant: NodeVariant) => {
        if (variant.id === action.payload.id) {
          variant = { ...action.payload };
        }

        return variant;
      });
    },
    removeNodeVariantById: (state, action: PayloadAction<NodeVariantId>) => {
      state.nodeVariants = state.nodeVariants.filter(
        (variant: NodeVariant) => !(variant.id !== action.payload)
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
  addNodeVariant,
  updateNodeVariant,
  removeNodeVariantById,
  // editNodeVariant,
  setAllNodeVariants,
} = nodeVariantSlice.actions;

export default nodeVariantSlice.reducer;
