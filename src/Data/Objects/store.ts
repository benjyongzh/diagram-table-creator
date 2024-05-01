import { configureStore } from "@reduxjs/toolkit";
import nodesReducer from "Features/nodeSlice";
import edgesReducer from "Features/edgeSlice";

export const store = configureStore({
  reducer: {
    nodes: nodesReducer,
    edges: edgesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
