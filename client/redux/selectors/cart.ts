import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

// Types
import { IMergeCartItems } from "../../types";

// Select the amount of Product there are in the Cart
const selectCartQuantity = createSelector(
    (state: RootState) => state.cart,
    (cart) => {
        return cart.reduce((sum: any, current: { quantity: any }) => sum + current.quantity, 0);
    }
);

const mergeCartItems = createSelector(
    (state: RootState) => state.cart,
    (cart) => {
        return cart.length > 0
            ? Object.values(
                  cart.reduce((acc, { _id, quantity, color, price }) => {
                      //@ts-ignore
                      acc[_id] = {
                          _id,
                          //@ts-ignore
                          color: color,
                          price: price,
                          //@ts-ignore
                          subtotal: (acc[_id] ? acc[_id].subtotal : 0) + price * quantity,
                          //@ts-ignore
                          quantity: (acc[_id] ? acc[_id].quantity : 0) + quantity,
                      };
                      return acc;
                  }, {} as IMergeCartItems)
              )
            : ([] as IMergeCartItems[]);
    }
);

const totalCart = createSelector(mergeCartItems, (mergeItems) =>
    mergeItems.reduce((acc: number, current: any) => current.price * current.quantity + acc, 0)
);

export { selectCartQuantity, mergeCartItems, totalCart };
