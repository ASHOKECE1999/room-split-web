import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constant";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [isEditPassowrd, editpassowrdSetter] = useState(false);
  const [password, setPassword] = useState("");
  const [rePassword, setRepassowrd] = useState("");
  const isSame = password == rePassword;
  const [displayToast, toastTimeSetter] = useState(false);

  const navigate = useNavigate();
  if (!user) {
    return navigate("/login");
  }

  const callTheResetPasswordApi = async () => {
    try {
      const data = await axios.patch(
        BASE_URL + "/profile/updatepassword",
        {
          password,
        },
        {
          withCredentials: true,
        }
      );
      toastTimeSetter(true);
      const time = setTimeout(() => {
        toastTimeSetter(false);
        editpassowrdSetter(false);
      }, 2000);
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="flex flex-col items-center">
      {!isEditPassowrd && (
        <div className="card bg-base-100 w-96 shadow-sm">
          <figure className="px-10 pt-10">
            <img
              src={user?.profileUrl}
              alt="Shoes"
              className="rounded-xl max-h-30"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">{user?.fullName}</h2>
            <p>{user?.about}</p>
          </div>
        </div>
      )}
      {displayToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Password SuccessFully Changed.</span>
          </div>
        </div>
      )}
      {isEditPassowrd && (
        <div className="flex text-center flex-col">
          <legend className="fieldset-legend mt-4">Enter passowrd</legend>
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter Password"
              minlength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
          <p className="validator-hint hidden">
            Must be more than 8 characters, including
            <br />
            At least one number <br />
            At least one lowercase letter <br />
            At least one uppercase letter
          </p>
          <legend className="fieldset-legend mt-3">
            Re-Enter New Password
          </legend>
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              value={rePassword}
              onChange={(e) => setRepassowrd(e.target.value)}
              required
              placeholder="Re-enter Password"
              minlength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
          <p className={`${!isSame ? "validator-hint" : ""} hidden`}>
            PasswordNotMatch
          </p>
        </div>
      )}
      <div className="card-actions">
        {!isEditPassowrd && (
          <Link className="btn btn-primary" to="/editprofile">
            Edit Profile
          </Link>
        )}
        <button
          className="btn btn-primary"
          onClick={
            isEditPassowrd
              ? callTheResetPasswordApi
              : () => editpassowrdSetter(true)
          }
        >
          Change Password
        </button>
      </div>
    </div>
  );
};

export default Profile;
