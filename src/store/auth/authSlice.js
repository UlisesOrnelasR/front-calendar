import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", // checking, authenticated, not-authenticated,
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    onCheckLogin: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, action) => {
      state.status = "authenticated";
      state.user = action.payload;
      state.errorMessage = undefined;
    },
    onLogout: (state, action) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = action.payload;
    },
    clearErrorNessage: (state) => {
      state.errorMessage = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { onCheckLogin, onLogin, onLogout, clearErrorNessage } =
  authSlice.actions;
