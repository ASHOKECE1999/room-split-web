// import { useState } from "react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Dashboard from "./components/Dashboard";
import Profile from "./components/Profile";
import ExpensesInput from "./components/Expanses/ExpensesInput";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/expenses" element={<ExpensesInput />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
