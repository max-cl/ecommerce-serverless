import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProduct } from "../models";

export const productsSlice = createApi({
    reducerPath: "products",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_PRODUCTS_API_ENDPOINT,
    }),
    tagTypes: ["Products"],
    endpoints: (builder) => ({
        getAll: builder.query<IProduct[], void>({
            query: () => "products",
            providesTags: [{ type: "Products", id: "LIST" }],
        }),
    }),
});

export const { useGetAllQuery } = productsSlice;
