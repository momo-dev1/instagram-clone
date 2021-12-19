import { useState } from "react";
import { useUserContext } from "auth/userContext";
import { useMutation } from "@apollo/client";
import { FOLLOW_USER, UNFOLLOW_USER } from "graphql/mutations";

const FollowButton = ({ userId }) => {
  const { followingIds, currentUserId } = useUserContext();
  const isAlreadyfollowed = followingIds.some((id) => id === userId);
  const [isFollowing, setIsFollowing] = useState(isAlreadyfollowed);
  const [followUser] = useMutation(FOLLOW_USER, {
    variables: {
      userIdToFollow: userId,
      currentUserId,
    },
  });
  const [unfollowUser] = useMutation(UNFOLLOW_USER, {
    variables: {
      userIdToFollow: userId,
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
    <button
      onClick={isFollowing ? handleUnFollow : handleFollow}
      aria-label="view"
      className={`ml-2 p-2 text-sm font-semibold leading-none ${
        isFollowing ? "text-gray-primary bg-gray-200" : "text-blue-medium"
      } focus:outline-none `}
    >
      {isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
