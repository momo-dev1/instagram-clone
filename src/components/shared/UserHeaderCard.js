import { Link } from "react-router-dom";

const UserHeaderCard = ({ user }) => {
  const { profile_image, username } = user;

  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-500 rounded-full">
        <img src={profile_image} alt="profilepic" />
      </div>
      <Link to={`/${username}`}>
        <div className="pt-1 ml-2 font-semibold text-md text-gray-primary">
          <p>{username}</p>
        </div>
      </Link>
    </div>
  );
};

export default UserHeaderCard;
