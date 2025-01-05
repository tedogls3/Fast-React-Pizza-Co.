import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApiSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.bigdatacloud.net/",
  }),
  endpoints: (builder) => ({
    getUserAddress: builder.query({
      async queryFn(_, _queryApi, _extraOptions, fetchWithBQ) {
        try {
          // Step 1: Get user's geolocation
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };

          // Step 2: Fetch address using reverse geocoding API
          const res = await fetchWithBQ(
            `data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}`
          );

          if (res.error)
            throw new Error(res.error.data || "Failed fetching address");

          const addressObj = res.data;

          // Step 3: Construct the address string
          const address = `${addressObj?.locality || ""}, ${
            addressObj?.city || ""
          } ${addressObj?.postcode || ""}, ${
            addressObj?.countryName || ""
          }`.trim();

          // Step 4: Return position and address
          return { data: { position: coords, address } };
        } catch (error) {
          return { error: { status: 500, message: error.message } };
        }
      },
    }),
  }),
});

export const { useGetUserAddressQuery } = userApiSlice;
