import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
  name: "expenses",
  initialState: [],
  reducers: {
    addExpenses: (state, action) => {
      return action.payload;
    },
  },
});

export const { addExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;
