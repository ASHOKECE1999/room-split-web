import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../../constants/constant";
import { addUser } from "../../store/userSlice";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const [fullName, setFullname] = useState(user?.fullName || "");
  const [about, setAbout] = useState(user?.about || "");
  const [profileUrl, setProfileUrl] = useState(user?.profileUrl || "");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const data = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          fullName,
          about,
          profileUrl,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(data.data));
      navigate("/profile"); // Redirect after successful update
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col items-center p-4 min-h-screen justify-center bg-base-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-base-100 shadow-lg rounded-xl p-6 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Edit Profile</h2>

        <div>
          <label className="label">Full Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="label">About</label>
          <textarea
            className="textarea textarea-bordered w-full"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Tell us about yourself"
          />
        </div>

        <div>
          <label className="label">Profile Image URL</label>
          <input
            type="text"
            className="input input-bordered w-full"
            value={profileUrl}
            onChange={(e) => setProfileUrl(e.target.value)}
            placeholder="Enter image URL"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button type="submit" className="btn btn-primary w-full">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
