import { useUserContext } from "auth/userContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { FOLLOW_USER, UNFOLLOW_USER } from "graphql/mutations";

const ExploreSuggestionsItem = ({ username, name, profile_image, user_id }) => {
  const { followingIds, currentUserId } = useUserContext();
  const isAlreadyfollowed = followingIds.some((id) => id === user_id);

  const [isFollowing, setIsFollowing] = useState(isAlreadyfollowed);
  const [followUser] = useMutation(FOLLOW_USER, {
    variables: {
      userIdToFollow: user_id,
      currentUserId,
    },
  });
  const [unfollowUser] = useMutation(UNFOLLOW_USER, {
    variables: {
      userIdToFollow: user_id,
      currentUserId,
    },
  });
  const handleFollow = () => {
    setIsFollowing(true);
    followUser();
  };
  const handleUnFollow = () => {
    setIsFollowing(false);
    unfollowUser();
  };
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

      <button
        onClick={isFollowing ? handleUnFollow : handleFollow}
        className={`px-5 py-1 text-sm transition duration-150 ease-in-out rounded 
        ${
          isFollowing
            ? "text-gray-primary bg-gray-200"
            : "bg-blue-medium text-white "
        }  focus:outline-none`}
      >
        {isFollowing ? "Following" : "Follow"}
      </button>
    </div>
  );
};

export default ExploreSuggestionsItem;
