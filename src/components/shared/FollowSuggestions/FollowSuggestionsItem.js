import { Link } from "react-router-dom";
import FollowButton from "../FollowButton";

const FollowSuggestionsItem = ({ username, name, user_id, profile_image }) => {
  return (
    <div className="flex flex-col items-center w-full py-6 mx-auto text-center bg-white border border-gray-200 rounded shadow ">
      <Link to={`/${username}`}>
        <div className="w-12 h-12 mb-1 rounded-full">
          <img
            src={profile_image}
            alt={`${username}'s profile'`}
            className="object-cover w-full h-full overflow-hidden rounded-full"
          />
        </div>
      </Link>
      <Link to={`/${username}`}>
        <p className="mb-1 text-base font-semibold text-gray-primary">
          {username}
        </p>
        <p className="mb-4 text-sm text-gray-light"> {name}</p>
      </Link>
      <FollowButton
        username={username}
        name={name}
        profile_image={profile_image}
        user_id={user_id}
      />
    </div>
  );
};

export default FollowSuggestionsItem;
