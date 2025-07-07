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
      navigate("/");
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
    <div className="flex flex-col items-center p-5">
      <form onSubmit={handleSubmit}>
        <div className="card w-96 bg-base-100 card-md shadow-sm p-5">
          <div className="card-body">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">EmailID</legend>
              <input
                type="text"
                className="input"
                placeholder="Enter EmailId"
                value={emailId}
                onChange={(e) => emailSetter(e.target.value)}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">EmailID</legend>
              <input
                type="password"
                className="input"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => passwordSetter(e.target.value)}
              />
            </fieldset>
            <div className="justify-start card-actions">
              <button className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </form>
      <div>{isError && <div>{errorMessage}</div>}</div>
    </div>
  );
};

export default Login;
