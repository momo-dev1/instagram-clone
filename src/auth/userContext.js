import { useSubscription } from "@apollo/client";
import { MY_DATA_PROFILE } from "../graphql/subscriptions ";
import React, { createContext, useContext } from "react";
import { useAuthContext } from "./auth";
import LoadingScreen from "components/shared/LoadingScreen";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { authState } = useAuthContext();
  const currentUserId = authState.userId;
  const { data, loading } = useSubscription(MY_DATA_PROFILE, {
    variables: { userId: currentUserId },
  });

  if (loading) return <LoadingScreen />;

  const currentUserData =
    authState.status === "in" && data ? data.users[0] : null;

  const followingIds = currentUserData?.following?.map(
    ({ users }) => users.user_id
  );
  const followerIds = currentUserData?.followers?.map(({ users }) => users.id);
  const feedIds = followingIds ? [currentUserId, ...followingIds] : [];

  return (
    <UserContext.Provider
      value={{
        currentUserId,
        currentUserData,
        loading,
        followingIds,
        followerIds,
        feedIds,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

//custom hook
export const useUserContext = () => {
  return useContext(UserContext);
};

export { UserProvider, UserContext };
