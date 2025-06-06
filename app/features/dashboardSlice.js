import { createSlice } from "@reduxjs/toolkit";

const setCookie = (name, value) => {
  document.cookie = `${name}=${value};path=/;max-age=31536000`; // 1 year expiry
};

const getInitialState = () => {
  if (typeof window === "undefined") return { viewBossData: true };
  const cookies = document.cookie.split(";");
  const viewBossDataCookie = cookies.find((cookie) =>
    cookie.trim().startsWith("viewBossData=")
  );
  const viewBossData = viewBossDataCookie
    ? viewBossDataCookie.split("=")[1] === "true"
    : true;
  return { viewBossData };
};

const initialState = getInitialState();

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    toggleView: (state) => {
      state.viewBossData = !state.viewBossData;
      setCookie("viewBossData", state.viewBossData);
    },
    setView: (state, action) => {
      state.viewBossData = action.payload;
      setCookie("viewBossData", action.payload);
    },
  },
});

export const { toggleView, setView } = dashboardSlice.actions;
export const selectViewBossData = (state) => state.dashboard.viewBossData;

export const dashboardReducer = dashboardSlice.reducer;
