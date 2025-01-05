import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "menu",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://react-fast-pizza-api.jonas.io/api",
  }),

  endpoints: (builder) => {
    return {
      getMenu: builder.query({
        query: () => "/menu",
      }),

      getOrderItemById: builder.query({
        query: (id) => `/order/${id}`,
      }),

      createOrder: builder.mutation({
        query: (newOrder) => ({
          url: "/order",
          method: "POST",
          body: newOrder,
        }),
      }),
    };
  },
});

export const {
  useGetMenuQuery,
  useGetOrderItemByIdQuery,
  useCreateOrderMutation,
} = apiSlice;
