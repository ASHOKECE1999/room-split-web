import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (!user) {
    return navigate("/login");
  }
  return (
    <div className="flex flex-col items-center">
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
      <div className="card-actions">
        <Link className="btn btn-primary" to="/editprofile">
          Edit Profile
        </Link>
      </div>
    </div>
  );
};

export default Profile;
