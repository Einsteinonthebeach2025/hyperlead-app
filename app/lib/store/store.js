import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "app/features/modalSlice";
import { userReducer } from "app/features/userSlice";
import { dashboardReducer } from "app/features/dashboardSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    user: userReducer,
    dashboard: dashboardReducer,
  },
});
