import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import expensesSlice from "./expenses";
import updatedSlicer from "./updated";
const store = configureStore({
  reducer: {
    user: userSlice,
    expenses: expensesSlice,
    update: updatedSlicer,
  },
});
export default store;
