import { configureStore } from "@reduxjs/toolkit";
import updateNameReducer from "../slices/nameSlice.mjs";

export const store = configureStore({
  reducer: {
    userName: updateNameReducer,
  },
});
