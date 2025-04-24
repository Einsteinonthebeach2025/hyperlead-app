import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "app/features/modalSlice";
import { userReducer } from "app/features/userSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
  },
});
