import { configureStore } from "@reduxjs/toolkit";
import reactFlowReducer from "@/Store/reactFlowSlice";
import customNodeVariantsReducer from "@/Store/customNodeVariantSlice";
import customEdgeVariantSReducer from "@/Store/customEdgeVariantSlice";

export const store = configureStore({
  reducer: {
    reactFlowObjects: reactFlowReducer,
    customNodeVariants: customNodeVariantsReducer,
    customEdgeVariants: customEdgeVariantSReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
