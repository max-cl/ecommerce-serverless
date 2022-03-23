import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../redux/store";

// Types
import { ICart } from "../types";

export const catSlice = createApi({
    reducerPath: "cart",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_CART_API_ENDPOINT,
        prepareHeaders: (headers, { endpoint, getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token && endpoint !== "refresh") {
                headers.set("Authorization", `${token}`);
                headers.set("Content-Type", "application/json");
                headers.set("Access-Control-Allow-Origin", "no-cors");
            }
            return headers;
        },
    }),
    tagTypes: ["Cart"],
    endpoints: (builder) => ({
        cartCheckout: builder.mutation<any, ICart[]>({
            query: (body) => ({
                url: "cart",
                method: "POST",
                body,
                // crossDomain: true
            }),
            // Invalidates all Post-type queries providing the `LIST` id - after all, depending of the sort order,
            // that newly created post could show up in any lists.
            invalidatesTags: [{ type: "Cart", id: "LIST" }],
        }),
    }),
});

export const { useCartCheckoutMutation } = catSlice;
