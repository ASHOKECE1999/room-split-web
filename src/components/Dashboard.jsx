import React, { useEffect } from "react";
import ScrollingBar from "./ScrollBar/ScrollingBar";
import InputText from "./InputText";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, []);
  return (
    <div>
      <ScrollingBar />
    </div>
  );
};

export default Dashboard;
