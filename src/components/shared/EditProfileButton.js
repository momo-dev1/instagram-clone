import { Link } from "react-router-dom";

const EditProfileButton = () => {
  return (
    <Link to="/accounts/edit">
      <button className="flex items-center justify-center w-full px-4 py-1 ml-2 text-sm font-semibold text-center bg-white border border-gray-200 rounded text-gray-primary xs:text-base sm:w-auto sm:inline-block ">
        Edit Profile
      </button>
    </Link>
  );
};

export default EditProfileButton;
