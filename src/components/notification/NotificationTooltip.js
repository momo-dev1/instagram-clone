import { UserIcon, ActiveHeart } from "../../assets/icons";

const NotificationTooltip = ({ notifications }) => {
  const followCount = countNotifications("follow").length;
  const likeCount = countNotifications("like").length;
  function countNotifications(notiType) {
    return notifications.filter(({ type }) => type === notiType);
  }

  return (
    <div className="relative flex items-center justify-center h-9 rounded-3xl">
      <div className="w-3 h-3 absolute mt-1.5 shadow-sm transform rotate-45 bg-red-primary "></div>
      <div className="relative z-50 flex items-center justify-center gap-2 px-3 py-2 rounded bg-red-primary mt-11">
        {followCount > 0 && (
          <div className="flex items-center justify-center gap-1 bg-red-primary">
            <UserIcon />
            <p className="text-white ">{followCount}</p>
          </div>
        )}

        {likeCount > 0 && (
          <div className="flex items-center justify-center gap-1 bg-red-primary">
            <ActiveHeart />
            <p className="text-white">{likeCount}</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default NotificationTooltip;
