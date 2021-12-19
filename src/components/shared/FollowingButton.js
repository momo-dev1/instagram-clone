import { useMutation } from "@apollo/client";
import { CheckUserIcon } from "assets/icons";
import { useUserContext } from "auth/userContext";
import { FOLLOW_USER, UNFOLLOW_USER } from "graphql/mutations";
import { useState } from "react";

const FollowingButton = ({ userId }) => {
  const { currentUserId, followingIds } = useUserContext();
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
    followUser();
    setIsFollowing(true);
  };

  const handleUnFollow = () => {
    unfollowUser();
    setIsFollowing(false);
  };
  return (
    <>
      {isFollowing ? (
        <button
          onClick={handleUnFollow}
          className="flex items-center justify-center w-24 px-4 py-1 ml-2 text-base font-semibold text-center text-white bg-white border border-gray-200 rounded sm:w-auto sm:inline-block "
        >
          <CheckUserIcon />
        </button>
      ) : (
        <button
          onClick={handleFollow}
          className="flex items-center justify-center w-full px-4 py-1 ml-2 text-base font-semibold text-center text-white rounded bg-blue-medium sm:w-auto sm:inline-block "
        >
          Follow
        </button>
      )}
    </>
  );
};

export default FollowingButton;
