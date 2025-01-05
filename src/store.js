import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./services/apiSlice";
import { userApiSlice } from "./features/user/userApiSlice";

import userReducer from "./features/user/userSlice";
import cartReducer from "./features/cart/cartSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware, userApiSlice.middleware),
});

export default store;
