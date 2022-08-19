import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    updateName(state, action) {
      state.value = action.payload;
    },
  },
});

export const { updateName } = nameSlice.actions;

export default nameSlice.reducer;
