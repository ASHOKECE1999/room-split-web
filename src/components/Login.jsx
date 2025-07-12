import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, passwordSetter] = useState("");
  const [fullName, fullNameSetter] = useState("");
  const [about, aboutSetter] = useState("");
  const [profileUrl, profileUrlSetter] = useState(
    "https://www.profilebakery.com/wp-content/uploads/2023/04/Profile-Image-AI.jpg"
  );
  const [emailId, emailSetter] = useState("");
  const [isError, errorSettor] = useState(false);
  const [errorMessage, errorMessageSetter] = useState("");
  const dispatch = useDispatch();
  const [isLogin, loginSetter] = useState(false);
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
      errorSettor(false);
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

  const signUpandRedirectToProfile = async () => {
    try {
      const data = await axios.post(
        BASE_URL + "/signup",
        {
          fullName,
          about,
          profileUrl,
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log(data);
      errorSettor(false);
      dispatch(addUser(data?.data?.data[0]));

      navigate("/");
    } catch (error) {
      console.log(error.message);
      errorSettor(true);
      errorMessageSetter(error.response.data);
    }
  };

  const onSignUp = (e) => {
    e.preventDefault();
    signUpandRedirectToProfile();
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
    <div>
      <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 min-h-screen ">
        <form
          onSubmit={!isLogin ? handleSubmit : onSignUp}
          className="w-full max-w-sm px-0 "
        >
          <div className="card bg-base-100 shadow-md p-4 sm:p-5">
            <div className="card-body space-y-4">
              {isLogin && (
                <div>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-sm sm:text-base">
                      FullName
                    </legend>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Enter FullName ID"
                      value={fullName}
                      onChange={(e) => fullNameSetter(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-sm sm:text-base">
                      About
                    </legend>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Something Abour you  "
                      value={about}
                      onChange={(e) => aboutSetter(e.target.value)}
                    />
                  </fieldset>
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend text-sm sm:text-base">
                      Prfile Url
                    </legend>
                    <input
                      type="text"
                      className="input input-bordered w-full"
                      placeholder="Enter ProfileUrl"
                      value={profileUrl}
                      onChange={(e) => profileUrlSetter(e.target.value)}
                    />
                  </fieldset>
                </div>
              )}
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
                <button className="btn btn-primary w-full">
                  {!isLogin ? "Login" : "Signup"}
                </button>
              </div>
            </div>
          </div>
        </form>
        <button
          onClick={() => {
            loginSetter((prev) => !prev);
          }}
          className="underline mt-4"
        >
          {isLogin ? "Existing User ? Login Here" : "New to site SignUp here"}
        </button>
        {isError && <h1 className="text-warning mb-4">{errorMessage}</h1>}
      </div>
    </div>
  );
};

export default Login;
