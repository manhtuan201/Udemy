import { createSlice } from "@reduxjs/toolkit";
const initialUiState = { showCart: false, notification: null };
const uiSlice = createSlice({
  name: "ui",
  initialState: initialUiState,
  reducers: {
    showCart(state) {
      state.showCart = !state.showCart;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});
console.log("🚀 ~ file: ui-slice.js:19 ~ initialUiState", initialUiState)
export default uiSlice;
export const uiActions = uiSlice.actions;
