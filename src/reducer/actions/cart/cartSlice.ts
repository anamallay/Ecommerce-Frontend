import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../../types/types";
// import { Product } from "../products/productSlice";

const data =
  localStorage.getItem("cart") !== null
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

type cartState = {
  cartItems: Product[];
};
const initialState: cartState = {
  cartItems: data,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === product._id
      );

      if (existingItem) {
        existingItem.quantity = existingItem.quantity
          ? existingItem.quantity + 1
          : 2;
      } else {
        const newProduct = { ...product, quantity: 1 };
        state.cartItems.push(newProduct);
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      console.log("Trying to remove product with _id:", action.payload);
      const index = state.cartItems.findIndex(
        (item) => item._id === action.payload
      );
      console.log("Product found at index:", index);
      if (index !== -1) {
        const existingItem = state.cartItems[index];
        if (existingItem.quantity && existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          console.log(
            "Decreased quantity, new quantity:",
            existingItem.quantity
          );
        } else {
          state.cartItems.splice(index, 1);
          console.log("Product removed from cart");
        }
        localStorage.setItem("cart", JSON.stringify(state.cartItems));
      } else {
        console.log("Product not found in cart");
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cart");
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
