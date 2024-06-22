import { configureStore } from "@reduxjs/toolkit";
import edgeReducer from "./edgeSlice";
import nodeReducer from "./nodeSlice";
import edgeVariantReducer from "./edgeVariantSlice";
import nodeVariantReducer from "./nodeVariantSlice";
import handleVariantReducer from "./handleVariantSlice";

export const store = configureStore({
  reducer: {
    edges: edgeReducer,
    nodes: nodeReducer,
    nodeVariants: nodeVariantReducer,
    edgeVariants: edgeVariantReducer,
    handleVariants: handleVariantReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
