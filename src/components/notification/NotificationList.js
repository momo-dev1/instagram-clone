import { useEffect } from "react";
import { Link } from "react-router-dom";
import { dateFormatToNow } from "utils/dateFormat";

import FollowingButton from "components/shared/FollowingButton";

import { useUserContext } from "auth/userContext";
import { useMutation } from "@apollo/client";
import { CHECK_NOTIFICATIONS } from "graphql/mutations";

const NotificationList = ({ notifications }) => {
  const [checkNotifications] = useMutation(CHECK_NOTIFICATIONS);
  const { currentUserId: userId } = useUserContext();
  useEffect(() => {
    checkNotifications({
      variables: { userId, lastChecked: new Date().toISOString() },
    });
  }, [checkNotifications, userId]);
  return (
    <div className="relative flex justify-center mt-3 border w-60 xs:w-350 sm:w-500">
      <div className="w-3 h-3 absolute -top-1.75 border-l border-t  right-0 -translate-x-2 transform rotate-45 bg-white "></div>
      <div className="flex flex-col w-full px-4 bg-white divide-y-2 divide-gray-100">
        {notifications?.map((notification) => {
          const isLike = notification.type === "like";
          const isFollow = notification.type === "follow";
          return (
            <div className="w-full bg-white " key={notification.id}>
              <div className="flex items-center justify-between pb-5 mt-6 border-gray-200 ">
                <div className="flex items-center ">
                  <div className="w-8 h-8 rounded-full">
                    <img
                      className="object-cover w-full h-full rounded-full"
                      src={notification.user.profile_image}
                      alt="profile pic"
                    />
                  </div>

                  <div className="ml-2">
                    <Link to={`/${notification.user.username}`}>
                      <p className="text-sm font-medium leading-none text-gray-primary">
                        {notification.user.username}
                      </p>
                    </Link>
                    <p className="mt-1 text-sm leading-none text-gray-600">
                      {isLike &&
                        `likes your photo. ${dateFormatToNow(
                          notification.created_at
                        )}`}
                      {isFollow &&
                        `started following you. ${dateFormatToNow(
                          notification.created_at
                        )}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  {isLike && (
                    <Link to={`/p/${notification.post.id}`}>
                      <div className="w-8 h-8 ">
                        <img src={notification.post.media} alt="profile pic" />
                      </div>
                    </Link>
                  )}
                  {isFollow && (
                    <FollowingButton userId={notification.user.user_id} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationList;
