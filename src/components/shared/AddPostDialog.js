import { useMutation } from "@apollo/client";
import { CREAT_USER_POST } from "graphql/mutations";
import { CloseIcon, NoImg } from "assets/icons";
import useClickOutside from "hooks/useClickOutside";
import { useRef, useState } from "react";
import { useUserContext } from "auth/userContext";
import { handleImageUpload } from "utils/handleImageUpload";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddPostDialog({ setPostDialog }) {
  const clickRef = useRef();
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState(null);
  const { currentUserId } = useUserContext();
  const [creatUserPost] = useMutation(CREAT_USER_POST);

  const onClickOutside = () => {
    setPostDialog(false);
  };

  useClickOutside(clickRef, onClickOutside);
  const handleUploadingImg = async (imageFile) => {
    const media = await handleImageUpload(imageFile);
    setMedia(media);
  };

  const handleAddPost = async (e) => {
    e.preventDefault();
    if (media === null) {
      toast.error(
        "please upload image or wait until attachment finishes uploading",
        {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      await creatUserPost({
        variables: { userId: currentUserId, caption, media },
      });
      setPostDialog(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex justify-center w-full">
        <div className="absolute inset-0 z-0 w-full h-full bg-black opacity-50" />
        <div ref={clickRef} className="container mx-auto">
          <div className="flex items-center justify-center w-full h-full ">
            <div className="fixed w-10/12 overflow-y-auto bg-white border border-gray-200 rounded-md shadow sm:h-auto md:w-8/12 lg:w-1/2 2xl:w-2/5">
              <div className="flex items-center justify-between px-4 bg-gray-100 rounded-tl-md rounded-tr-md md:px-8 md:py-4 py-7">
                <p className="text-base font-semibold">Create New Post</p>
                <button
                  onClick={() => setPostDialog(false)}
                  className="focus:outline-none"
                >
                  <CloseIcon filled />
                </button>
              </div>
              <div className="px-4 pt-6 md:px-10 md:pt-12 md:pb-4 pb-7">
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center w-40 h-40 overflow-hidden bg-gray-100 rounded-md">
                    {media ? (
                      <img
                        className="object-cover w-full h-full"
                        src={media}
                        alt="new img-post"
                      />
                    ) : (
                      <NoImg />
                    )}
                  </div>
                </div>
                <form onSubmit={handleAddPost} className="mt-11">
                  <label
                    className="block font-semibold text-center cursor-pointer text-blue-medium"
                    htmlFor="image"
                  >
                    Upload image
                  </label>
                  <input
                    onChange={(e) => handleUploadingImg(e.target.files[0])}
                    type="file"
                    className="hidden"
                    id="image"
                  />
                  <div className="mt-8">
                    <textarea
                      onChange={(e) => setCaption(e.target.value)}
                      placeholder="Caption"
                      className="w-full h-24 py-3 pl-3 overflow-y-auto border border-gray-200 rounded resize-none focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center justify-between mt-9">
                    <button className="px-6 py-3 ml-auto text-sm text-white rounded shadow bg-blue-medium hover:bg-opacity-80">
                      Add Post
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer
          rtl={false}
          autoClose={2000}
          newestOnTop={false}
          hideProgressBar={false}
          draggable
          closeOnClick
          pauseOnHover
          pauseOnFocusLoss
          position="bottom-center"
        />
      </div>
    </>
  );
}

export default AddPostDialog;
