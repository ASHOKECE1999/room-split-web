import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/constant";
import { removeUser } from "../store/userSlice";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="navbar bg-base-200 shadow-sm">
        {!user && (
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">NoteBook</a>
          </div>
        )}
        {user && (
          <div className="flex-1">
            <div className="drawer">
              <input id="my-drawer" type="checkbox" className="drawer-toggle" />
              <div className="drawer-content">
                <label htmlFor="my-drawer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-5 w-5 stroke-current mb-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-[91%] w-40 p-4 pt-10 mt-16">
                  <li>
                    <span className="text-green-700 font-bold">
                      {user?.fullName}
                    </span>
                  </li>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/expenses">Enter Expenses</Link>
                  </li>
                  <li>
                    <Link to="/waterschedule">WaterSchedule</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        {user && (
          <div className="flex-none">
            <Link to="/" className="mr-3 font-bold">
              NoteBook
            </Link>
            <div className="dropdown dropdown-end tabIndex={0}">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar mr-2"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={user?.profileUrl}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" to="/profile">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>

                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
