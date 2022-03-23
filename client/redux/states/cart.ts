import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// types
import { ICart } from "../../types";

const initialState = [] as ICart[];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<ICart>) {
            state.push(action.payload);
        },
        removeItem(state, action: PayloadAction<string>) {
            return state.filter((product) => product._id !== action.payload);
        },
    },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
