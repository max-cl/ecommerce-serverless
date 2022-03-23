import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
import { IUser, TError } from "../../types";

const initialState = { user: {}, isSignedIn: false, errorAuth: { status: 0, message: "" }, token: "" } as IUser;

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<IUser>) {
            state.user = action.payload.user;
            state.isSignedIn = true;
            state.token = action.payload.token;
            state.errorAuth = { status: 0, message: "" };
        },
        logout(state) {
            state.user = {};
            state.isSignedIn = false;
            state.errorAuth = { status: 0, message: "" };
            state.token = "";
        },
        authenticatedUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload.user;
            state.isSignedIn = true;
            state.token = action.payload.token;
            state.errorAuth = { status: 0, message: "" };
        },
        saveErrorAuth(state, action: PayloadAction<TError>) {
            state.errorAuth = { status: action.payload.status, message: action.payload.message };
        },
        clearErrorAuth(state) {
            state.errorAuth = { status: 0, message: "" };
        },
    },
});

export const { login, logout, authenticatedUser, saveErrorAuth, clearErrorAuth } = authSlice.actions;
export default authSlice.reducer;
