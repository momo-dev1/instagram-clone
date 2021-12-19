const ProfileAvatar = ({ profile_image }) => {
  return (
    <div className="md:w-3/12 md:ml-16">
      <img
        className="object-cover w-16 h-16 p-1 border-2 border-pink-600 rounded-full xs:w-24 xs:h-24 md:w-48 md:h-48"
        src={profile_image}
        alt="profile"
      />
    </div>
  );
};

export default ProfileAvatar;
