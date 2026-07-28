import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
    resInfo: JSON.parse(localStorage.getItem("resInfo")) || [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { info, resInfo } = action.payload;
      state.cartItems = [...state.cartItems, info];
      state.resInfo = resInfo;

      localStorage.setItem("cartData", JSON.stringify(state.cartItems));
      localStorage.setItem("resInfo", JSON.stringify(resInfo));
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== id);

      localStorage.setItem("cartData", JSON.stringify(state.cartItems));
      toast.success("Item removed from cart");

      if (state.cartItems.length === 0) {
        state.resInfo = [];
        localStorage.setItem("resInfo", JSON.stringify([]));
      }
    },

    clearAllItems: (state) => {
      state.cartItems = [];
      state.resInfo = [];
      localStorage.setItem("cartData", JSON.stringify([]));
      localStorage.setItem("resInfo", JSON.stringify([]));
      toast.success("Cart is cleared");
    },
  },
});

export const { addToCart, deleteItem, clearAllItems } = cartSlice.actions;
export default cartSlice.reducer;
