import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreNodeState } from "Types/storeNodeState";

// Define the initial state using that type
const initialState: StoreNodeState = {
  nodes: [],
};

export const nodeSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    increment: (state) => {
      //   state.value += 1;
    },
    decrement: (state) => {
      //   state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      //   state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = nodeSlice.actions;

export default nodeSlice.reducer;
