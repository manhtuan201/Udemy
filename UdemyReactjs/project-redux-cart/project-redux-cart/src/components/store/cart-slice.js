// import { createSlice } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { uiActions } from "./ui-slice";
const initialCartState = { items: [], totalQuantity: 0 };
const cartSlice = createSlice({
  name: "product",
  initialState: initialCartState,
  reducers: {
    // replaceCart(state, action){
    //   console.log("🚀 ~ file: cart-slice.js:27 ~ replaceCart ~ action", action)
    //   state.totalQuantity = action.payload.totalQuantity;
    //   state.items= action.payload.items;
    // },
    addItemHandler(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemHandler(state, action) {
      const id = action.payload;
      const removeItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (removeItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        removeItem.quantity--;
      }
    },
  },
});
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...!",
        message: "Sending cart data !",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://order-redux-c0f19-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error("Sending cart data failed");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Sucsess !!!",
          message: "Sednding cart data successfully !",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed --!",
        })
      );
    }
    
  };
};
export const cartActions = cartSlice.actions;
export default cartSlice;
