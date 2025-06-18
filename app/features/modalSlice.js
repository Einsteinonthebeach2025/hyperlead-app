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
  globalModal: {
    isOpen: false,
    data: null,
  },
  transactionsModal: {
    isOpen: false,
    data: null,
  },
  paypalPaymentModal: {
    isOpen: false,
    selectedPlan: null,
  },
  isModalOpen: false,
  error: "",
  type: "error",
  sideBar: false,
  link: "",
  title: "",
  leads: [],
  isDarkMode: false,
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
      } else if (modalType === "global") {
        state.globalModal.isOpen = isOpen;
        state.globalModal.data = data || null;
      } else if (modalType === "paypalPayment") {
        state.paypalPaymentModal.isOpen = isOpen;
        state.paypalPaymentModal.selectedPlan = data || null;
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
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("theme", state.isDarkMode ? "dark" : "light");
    },
    toggleSideBar: (state) => {
      state.sideBar = !state.sideBar;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
    setTransactionsModal: (state, action) => {
      const { isOpen, data } = action.payload;
      state.transactionsModal.isOpen = isOpen;
      state.transactionsModal.data = data || null;
    },
  },
});

export const {
  setToggle,
  setError,
  toggleSelectedLead,
  clearSelectedLeads,
  clearSelectedUsers,
  toggleTheme,
  toggleSideBar,
  toggleModal,
  setTransactionsModal,
} = modalSlice.actions;

export const modalReducer = modalSlice.reducer;
export default modalSlice.reducer;

export const selectError = (state) => state.modal.error;
export const selectSideBar = (state) => state.modal.sideBar;
export const selectLeads = (state) => state.modal.leads;
export const selectNotificationModal = (state) => state.modal.notificationModal;
export const selectEmailModal = (state) => state.modal.emailModal;
export const selectGlobalModal = (state) => state.modal.globalModal;
export const selectIsDarkMode = (state) => state.modal.isDarkMode;
export const selectIsModalOpen = (state) => state.modal.isModalOpen;
export const selectTransactionsModal = (state) => state.modal.transactionsModal;
export const selectPayPalPaymentModal = (state) =>
  state.modal.paypalPaymentModal;
