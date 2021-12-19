import FollowButton from "components/shared/FollowButton";
import UserHeaderCard from "components/shared/UserHeaderCard";

import { useQuery } from "@apollo/client";
import { SUGGEST_USERS } from "graphql/queries";
import { useUserContext } from "auth/userContext";

const FeedSuggestions = () => {
  const { currentUserData, followerIds } = useUserContext();
  const { data, loading } = useQuery(SUGGEST_USERS, {
    variables: {
      limit: 4,
      followerIds,
      createdAt: currentUserData?.created_at
        ? currentUserData?.created_at
        : null,
    },
  });

  return (
    <div className="hidden col-span-2 md:block">
      <div className="flex flex-col w-full px-4 py-2 ">
        <div className="ml-2">
          <UserHeaderCard user={currentUserData} />
        </div>
        <div className="w-full max-w-sm px-4 py-6 mt-3 bg-white border border-gray-200 shadow-sm">
          <h2 className="text-base font-semibold leading-4 text-gray-600">
            Suggestions For You
          </h2>
          {loading ? (
            <div className="flex items-center justify-between mt-6 ">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex flex-col gap-2 ml-2">
                  <p className="w-20 h-2 bg-gray-200 "></p>
                  <p className="w-8 h-2 bg-gray-200"></p>
                </div>
              </div>
              <div className="p-2 ml-2 text-sm font-semibold leading-none">
                Follow
              </div>
            </div>
          ) : (
            <>
              {data?.users?.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between mt-6 "
                >
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full">
                      <img
                        className="object-cover w-full h-full rounded-full"
                        src={user.profile_image}
                        alt="profile pic"
                      />
                    </div>
                    <div className="ml-2">
                      <p className="text-sm font-medium leading-none text-blue-primary">
                        {user.name}
                      </p>
                      <p className="mt-1 text-sm leading-none text-gray-600">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                  <div>
                    <FollowButton userId={user.user_id} />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedSuggestions;
