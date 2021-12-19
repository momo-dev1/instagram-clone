import { SaveIcon } from "assets/icons";
import GridPost from "components/shared/GridPost";

const ProfileSave = ({ user }) => {
  const saved = user.saved_post.length;
  console.log(user.saved_post);
  return (
    <div>
      {saved > 0 ? (
        <div className="grid grid-cols-1 p-4 gap-y-2 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {user?.saved_post.map(({ post }) => (
            <GridPost key={post.id} {...post} />
          ))}
        </div>
      ) : (
        <div className="w-full p-10 ">
          <div className="flex flex-col items-center justify-center gap-3 text-center text-gray-primary">
            <div className="p-4 border rounded-full border-gray-primary">
              <SaveIcon />
            </div>
            <h4 className="text-lg font-semibold xs:text-2xl">Save</h4>
            <p className="sm:w-1/2 ">
              Save photos and videos that you want to see again. No one is
              notified, and only you can see what you've save
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSave;
