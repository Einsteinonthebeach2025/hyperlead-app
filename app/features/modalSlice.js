import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  data: null,
  error: "",
  type: "error",
  link: "",
  title: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setToggle: (state, action) => {
      state.isOpen = action.payload;
      state.data = action.payload.data || null;
    },
    setError: (state, action) => {
      const { message, type, link, title } =
        typeof action.payload === "string"
          ? { message: action.payload, type: "error", link: "", title: "" }
          : action.payload;

      state.error = message;
      state.type = type || "error";
      state.link = link || "";
      state.title = title || "";
    },
  },
});

export const { setToggle, setError } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;

export const selectError = (state) => state.modal.error;
