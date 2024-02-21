import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../actions/users/usersSlice";
import productsSlice from "../actions/products/productSlice";
import cartSlice from "../actions/cart/cartSlice";
import categorySlice from "../actions/categories/categorySlice";
import ordersSlice from "../actions/orders/ordersSlice";
import contactusSlice from "../actions/contactus/contactusSlice";
export const store = configureStore({
  reducer: {
    users: usersSlice,
    products: productsSlice,
    cart: cartSlice,
    categories: categorySlice,
    order: ordersSlice,
    contactus: contactusSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
