const ProfileBio = ({ smallScreen = false, bio, name, website }) => {
  return (
    <>
      {smallScreen ? (
        <div className="mx-8 mb-4 text-sm md:hidden ">
          <p className="font-semibold text-md text-gray-primary ">{name}</p>
          <p className="w-2/3">{bio}</p>
          <button className="text-blue-600 hover:text-blue-800 visited:text-purple-600">
            {website}
          </button>
        </div>
      ) : (
        <div className="hidden md:block">
          <p className="font-semibold text-md text-gray-primary ">{name}</p>
          <p className="w-2/3">{bio}</p>
          <button className="text-blue-600 hover:text-blue-800 visited:text-purple-600">
            {website}
          </button>
        </div>
      )}
    </>
  );
};

export default ProfileBio;
