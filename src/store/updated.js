import { createSlice } from "@reduxjs/toolkit";

const updatedSlicer = createSlice({
  name: "updated",
  initialState: false,
  reducers: {
    changeState: (state, action) => {
      return !state;
    },
  },
});

export const { changeState } = updatedSlicer.actions;

export default updatedSlicer.reducer;
