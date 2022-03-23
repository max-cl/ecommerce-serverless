import { combineReducers, configureStore, PreloadedState } from "@reduxjs/toolkit";
import {
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore,
    persistReducer,
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";
// import autoMergeLevel1 from "reduxjs-toolkit-persist/lib/stateReconciler/autoMergeLevel1";
import logger from "redux-logger";
import { unAuthenticatedMiddleware } from "../middlewares";
import { productsSlice } from "../services/products";
import { cartSlice, authSlice } from "./states";

const persistConfig = {
    key: "root",
    storage: storage,
    // stateReconciler: autoMergeLevel1,
    whitelist: ["cart"],
    blacklist: ["auth", "products"],
};

const rootReducer = combineReducers({
    auth: authSlice,
    cart: cartSlice,
    [productsSlice.reducerPath]: productsSlice.reducer,
});

const _persistedReducer = persistReducer(persistConfig, rootReducer);

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: _persistedReducer,
        devTools: { trace: true, traceLimit: 25 },
        // devTools: process.env.NODE_ENV !== 'production',
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    /* ignore persistance actions */
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat([productsSlice.middleware, unAuthenticatedMiddleware, logger]),
        preloadedState,
    });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferred type: {auth: AuthState, cart: CartState, auth: AuthState}
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

const store = setupStore();

export const persistor = persistStore(store);
export default store;
