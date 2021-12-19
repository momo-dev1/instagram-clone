import { handleImageUpload } from "utils/handleImageUpload";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useMutation } from "@apollo/client";
import { EDIT_USER, EDIT_USER_AVATAR } from "graphql/mutations";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    name: yup.string().max(15).required(),
    username: yup.string().max(15).required(),
    website: yup.string().required(),
    bio: yup.string().max(100).required(),
    phone: yup.string().min(10).max(11).required(),
  })
  .required();

const EditUserInfo = ({ user }) => {
  const { profile_image, username, name, bio, phone_number, website, user_id } =
    user;

  const [editUser] = useMutation(EDIT_USER);
  const [editUserAvatar] = useMutation(EDIT_USER_AVATAR);
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = async (data) => {
    try {
      await editUser({
        variables: {
          userId: user_id,
          name: data.name,
          userName: data.username,
          website: data.website,
          bio: data.bio,
          phoneNumber: data.phone,
        },
      });
      toast.success(" Profile Edited", {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (e) {
      toast.error(e, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleUpdateImage = async (imageFile) => {
    const imageUrl = await handleImageUpload(imageFile);

    await editUserAvatar({
      variables: { userId: user_id, profileImage: imageUrl },
    });
    window.location.reload();
  };

  return (
    <div className="px-4 pt-10 mt-5 md:border-l md:border-gray-200 py-14 md:mt-0 col-span-full md:col-span-2">
      <form className="relative" onSubmit={handleSubmit(submitForm)}>
        <div className="flex items-center gap-5 mx-12 mb-5 xs:mx-20">
          <div className="flex-shrink-0 w-10 h-10 rounded-full">
            <img
              src={profile_image}
              alt={`${username}'s profile'`}
              className="object-cover w-full h-full overflow-hidden rounded-full"
            />
          </div>
          <label htmlFor="image">
            <h3 className="font-semibold">{username}</h3>
            <p className="text-xs cursor-pointer xs:text-sm text-blue-medium ">
              Change Profile Photo
            </p>
          </label>
          <input
            id="image"
            onChange={(e) => handleUpdateImage(e.target.files[0])}
            type="file"
            className="hidden"
          />
        </div>

        <div className="flex items-center mb-5 ">
          <label className="w-24 mr-6 text-xs font-bold text-right xs:w-28 text-gray-primary xs:text-base">
            Name
          </label>
          <input
            {...register("name")}
            type="text"
            defaultValue={name}
            placeholder="Name"
            className="flex-1 w-20 py-2 pl-3 text-xs bg-white border border-gray-200 rounded xs:text-base text-gray-primary focus:outline-none"
          />
        </div>
        <div className="flex items-center mb-5 ">
          <label className="w-24 mr-6 text-xs font-bold text-right xs:w-28 text-gray-primary xs:text-base">
            Username
          </label>
          <input
            {...register("username")}
            type="text"
            defaultValue={username}
            placeholder="Username"
            className="flex-1 w-20 py-2 pl-3 text-xs bg-white border border-gray-200 rounded xs:text-base text-gray-primary focus:outline-none"
          />
        </div>
        <div className="flex items-center mb-5 ">
          <label className="w-24 mr-6 text-xs font-bold text-right xs:w-28 text-gray-primary xs:text-base">
            Website
          </label>
          <input
            {...register("website")}
            type="text"
            defaultValue={website}
            placeholder="Website"
            className="flex-1 w-20 py-2 pl-3 text-xs bg-white border border-gray-200 rounded xs:text-base text-gray-primary focus:outline-none"
          />
        </div>
        <div className="flex items-start mb-5">
          <label className="inline-block w-24 mr-6 text-xs font-bold text-right xs:text-base xs:w-28 text-gray-primary">
            bio
          </label>
          <textarea
            style={{ resize: "none" }}
            {...register("bio")}
            defaultValue={bio}
            placeholder="Your bio"
            className="flex-1 py-2 pl-3 text-xs bg-white border border-gray-200 rounded xs:text-base text-gray-primary h-28 focus:outline-none"
          />
        </div>
        <div className="flex items-center mb-5 ">
          <label className="w-24 mr-6 text-xs font-bold text-right xs:w-auto xs:max-w-max text-gray-primary xs:text-base">
            Phone Number
          </label>
          <input
            {...register("phone")}
            type="text"
            maxLength="11"
            defaultValue={phone_number}
            placeholder="Phone Number"
            className="flex-1 w-20 py-2 pl-3 text-xs bg-white border border-gray-200 rounded xs:text-base text-gray-primary focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="absolute p-2 mx-24 text-xs font-semibold leading-none text-white rounded xs:text-sm xs:px-4 xs:py-2 left-7 xs:mx-28 bg-blue-medium focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditUserInfo;
