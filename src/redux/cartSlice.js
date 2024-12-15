import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalCount: 0,
  buyNowItem: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const item = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push({ ...item, quantity: item.quantity });
      }

      state.totalCount += item.quantity;
    },
    removeItemFromCart(state, action) {
      const id = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        const item = state.items[index];
        state.totalCount -= item.quantity;
        state.items.splice(index, 1);
      }
    },
    updateItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalCount += quantity - existingItem.quantity;
        existingItem.quantity = quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalCount = 0;
    },
    setBuyNowItem(state, action) {
      state.buyNowItem = action.payload;
    },
    clearBuyNowItem(state) {
      state.buyNowItem = null;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  updateItemQuantity,
  clearCart,
  setBuyNowItem,
  clearBuyNowItem,
} = cartSlice.actions;

export default cartSlice.reducer;
