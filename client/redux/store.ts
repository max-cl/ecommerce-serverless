import { configureStore } from "@reduxjs/toolkit";
import { productsSlice } from "../services/products";
import { cartSlice } from "./states";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        [productsSlice.reducerPath]: productsSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;