import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, passwordSetter] = useState("");
  const [emailId, emailSetter] = useState("");
  const [isError, errorSettor] = useState(false);
  const [errorMessage, errorMessageSetter] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  console.log(user, "user");
  const fetchData = async () => {
    try {
      const data = await axios.post(
        BASE_URL + "/login",
        {
          emailId: emailId,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      errorSettor(true);
      //   console.log(data);

      dispatch(addUser(data.data.data));
      return navigate("/");
    } catch (error) {
      console.log(error);
      console.log(error.message);
      errorSettor(true);
      errorMessageSetter(error.response.data);
    }
  };

  useEffect(() => {
    if (user) {
      return navigate("/");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 min-h-screen justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-sm px-0 mb-40">
        <div className="card bg-base-100 shadow-md p-4 sm:p-5">
          <div className="card-body space-y-4">
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm sm:text-base">
                Email ID
              </legend>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Enter Email ID"
                value={emailId}
                onChange={(e) => emailSetter(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-sm sm:text-base">
                Password
              </legend>
              <input
                type="password"
                className="input input-bordered w-full"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => passwordSetter(e.target.value)}
              />
            </fieldset>
            <div className="card-actions justify-start">
              <button className="btn btn-primary w-full">Login</button>
            </div>
          </div>
        </div>
      </form>
      {isError && <div className="text-red-500 mt-4">{errorMessage}</div>}
    </div>
  );
};

export default Login;
