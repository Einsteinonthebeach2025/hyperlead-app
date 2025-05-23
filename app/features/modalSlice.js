import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationModal: {
    isOpen: false,
    data: null,
  },
  emailModal: {
    isOpen: false,
    data: null,
  },
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
      const { modalType, isOpen, data } = action.payload;
      if (modalType === "notification") {
        state.notificationModal.isOpen = isOpen;
        state.notificationModal.data = data || null;
      } else if (modalType === "email") {
        state.emailModal.isOpen = isOpen;
        state.emailModal.data = data || null;
      }
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
    clearSelectedUsers: (state) => {
      state.users = [];
    },
  },
});

export const {
  setToggle,
  setError,
  toggleSelectedLead,
  clearSelectedLeads,
  clearSelectedUsers,
} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;

export const selectError = (state) => state.modal.error;
export const selectLeads = (state) => state.modal.leads;
export const selectNotificationModal = (state) => state.modal.notificationModal;
export const selectEmailModal = (state) => state.modal.emailModal;
