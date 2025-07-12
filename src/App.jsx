// import { useState } from "react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import ExpensesInput from "./components/Expanses/ExpensesInput";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import Login from "./components/Login";
import NotFound from "./components/NotFound/NotFound";
import EditProfile from "./components/EditProfile/EditProfile";
import WaterSchedule from "./components/WaterSchedule/WaterSchedule";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/expenses" element={<ExpensesInput />} />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/waterschedule" element={<WaterSchedule />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
