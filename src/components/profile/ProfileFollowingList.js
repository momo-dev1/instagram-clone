const ProfileFollowingList = ({
  smallScreen = false,
  followers,
  following,
  posts,
}) => {
  return (
    <>
      {smallScreen ? (
        <div className="px-px md:px-3">
          <ul className="flex justify-around p-2 space-x-8 text-sm leading-snug text-center text-gray-600 border-t md:hidden">
            <li>
              <span className="block font-semibold text-gray-800">{posts}</span>
              posts
            </li>

            <li>
              <span className="block font-semibold text-gray-800">
                {followers}
              </span>
              followers
            </li>
            <li>
              <span className="block font-semibold text-gray-800">
                {following}
              </span>
              following
            </li>
          </ul>
        </div>
      ) : (
        <ul className="hidden mb-4 space-x-8 md:flex">
          <li>
            <span className="mr-1 font-semibold">{posts}</span>
            posts
          </li>

          <li>
            <span className="mr-1 font-semibold">{followers}</span>
            followers
          </li>
          <li>
            <span className="mr-1 font-semibold">{following}</span>
            following
          </li>
        </ul>
      )}
    </>
  );
};

export default ProfileFollowingList;
