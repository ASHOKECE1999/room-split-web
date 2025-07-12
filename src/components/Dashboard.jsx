import React, { useEffect } from "react";
import ScrollingBar from "./ScrollBar/ScrollingBar";
import InputText from "./InputText";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MonthWiseSummary from "./MonthWiseSummary/MonthWiseSummary";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, []);
  return (
    <div className="p-3">
      <ScrollingBar />
      <h1 className="font-bold">Summary of Each Person MonthWise</h1>
      <MonthWiseSummary />
    </div>
  );
};

export default Dashboard;
