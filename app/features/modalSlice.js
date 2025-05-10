import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  data: null,
  error: "",
  type: "error",
  link: "",
  title: "",
  leads: [],
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
    toggleSelectedLead: (state, action) => {
      const leadIndex = state.leads.findIndex(
        (lead) => lead.id === action.payload.id
      );
      if (leadIndex === -1) {
        state.leads.push(action.payload);
      } else {
        state.leads.splice(leadIndex, 1);
      }
    },
    clearSelectedLeads: (state) => {
      state.leads = [];
    },
  },
});

export const { setToggle, setError, toggleSelectedLead, clearSelectedLeads } =
  modalSlice.actions;
export const modalReducer = modalSlice.reducer;

export const selectError = (state) => state.modal.error;
export const selectLeads = (state) => state.modal.leads;
