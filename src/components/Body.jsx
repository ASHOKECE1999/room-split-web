import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../constants/constant";
import { addUser } from "../store/userSlice";

const Body = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const data = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(data.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      fetchUserData();
    }
  }, []);

  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
