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
