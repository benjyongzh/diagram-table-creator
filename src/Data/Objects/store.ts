import { configureStore } from "@reduxjs/toolkit";
import reactFlowReducer from "Features/reactFlowSlice";
import customNodeVariantsReducer from "Features/customNodeVariantSlice";

export const store = configureStore({
  reducer: {
    reactFlowObjects: reactFlowReducer,
    customNodeVariants: customNodeVariantsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
