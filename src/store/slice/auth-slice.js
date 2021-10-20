import { createSlice } from "@reduxjs/toolkit";
import getInitialAuthState  from "../../helper/util/initial_state_util";

let initialAuthState = getInitialAuthState();

const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    //set isAuthenticated to true once the user has logged in
    addLoginData(state) {
      state.isAuthenticated = true;
    },
    //reset isAuthenticated to initialState once the user has logged out
    removeLoginData(state) {
      state.isAuthenticated = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
