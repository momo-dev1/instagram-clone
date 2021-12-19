import { useState } from "react";
import { useNavigate } from "react-router";
import { dateFormatToNow, datePostFormat } from "utils/dateFormat";

import LoadingScreen from "components/shared/LoadingScreen";
import UserHeaderCard from "components/shared/UserHeaderCard";

import {
  ShareIcon,
  LikeIcon,
  LikeActiveIcon,
  SaveIcon,
  CommentIcon,
  SaveActiveIcon,
} from "../../assets/icons";

import { useMutation, useSubscription } from "@apollo/client";
import { useUserContext } from "auth/userContext";
import { GET_POST } from "graphql/subscriptions ";
import {
  LIKE_POST,
  UNLIKE_POST,
  SAVE_POST,
  UNSAVE_POST,
  ADD_COMMENT,
} from "graphql/mutations";

const SinglePostCard = ({ postId }) => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const { currentUserId: userId } = useUserContext();
  const { data, loading } = useSubscription(GET_POST, {
    variables: { postId },
  });

  const [addCommnet] = useMutation(ADD_COMMENT, {
    variables: { userId, postId, content },
  });

  if (loading) return <LoadingScreen />;

  const {
    id,
    user,
    media,
    likes,
    caption,
    comments,
    created_at,
    likes_aggregate,
    saved_posts,
  } = data.posts_by_pk;

  const likesCount = likes_aggregate.aggregate.count;

  function navigateToUserProfile() {
    navigate(`/${user.username}`);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    setContent("");
    if (content.length > 0) {
      addCommnet();
    }
  };

  return (
    <>
      <div className="flex flex-col mx-auto my-10 overflow-hidden bg-white border rounded-lg shadow-sm md:flex-row lg:mx-0 text-gray-primary">
        <div className="h-80 md:h-full md:flex-1">
          <img className="object-cover w-full h-full" src={media} alt="" />
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div className="flex items-center justify-between w-full p-3 border border-b">
            <UserHeaderCard user={user} />
          </div>
          <div className="hidden h-full md:block ">
            <div className="flex flex-col gap-2 px-3 py-2 pt-3">
              <div className="flex gap-2 mb-4">
                <div
                  onClick={navigateToUserProfile}
                  className="flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-500 rounded-full cursor-pointer w-7 h-7"
                >
                  <img src={user.profile_image} alt="profilepic" />
                </div>
                <h3 className="inline text-sm font-medium">
                  <span
                    className="cursor-pointer "
                    onClick={navigateToUserProfile}
                  >
                    {user.username}
                  </span>
                  <p className="inline ml-1 text-base font-normal">{caption}</p>
                </h3>
              </div>

              <div className="flex flex-col gap-2 ">
                {comments?.map((comment) => {
                  const { content, created_at, user } = comment;

                  return (
                    <div key={comment.id} className="flex flex-col">
                      <div className="flex gap-2 ">
                        <div
                          onClick={navigateToUserProfile}
                          className="flex items-center justify-center flex-shrink-0 overflow-hidden bg-gray-500 rounded-full cursor-pointer w-7 h-7"
                        >
                          <img
                            className="object-cover w-full h-full"
                            src={user.profile_image}
                            alt="profilepic"
                          />
                        </div>
                        <h3 className="inline text-sm font-medium">
                          <span
                            className="cursor-pointer "
                            onClick={navigateToUserProfile}
                          >
                            {user.username}
                          </span>
                          <p className="inline ml-1 text-base font-normal break-all">
                            {content}
                          </p>
                        </h3>
                      </div>
                      <div className="mt-1 text-xs font-normal ml-9 text-gray-light">
                        {dateFormatToNow(created_at)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between px-3 py-2">
              <div className="flex items-center flex-1 gap-3">
                <LikeButton likes={likes} postId={id} authorId={user.user_id} />
                <label htmlFor="comment">
                  <CommentIcon />
                </label>
                <ShareIcon />
              </div>
              <SaveButton postId={id} savedPosts={saved_posts} />
            </div>

            <div className="px-3 pb-2">
              <div className="mb-2">
                <span className="text-sm font-medium">
                  {likesCount === 1 ? `1 like` : `${likesCount} likes`}
                </span>
              </div>

              <div style={{ fontSize: 10 }} className="mb-2 text-gray-light ">
                <div>{datePostFormat(created_at)}</div>
              </div>
            </div>
            <div className="flex border-t">
              <textarea
                id="comment"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{ resize: "none" }}
                placeholder="Add a comment..."
                className="flex-1 h-10 px-3 py-2 focus:outline-none"
                type="text"
              />
              <button
                type="submit"
                className="px-3 py-2 font-semibold transition-all duration-300 opacity-50 text-blue-medium hover:opacity-100"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default SinglePostCard;

function LikeButton({ postId, authorId, likes }) {
  const { currentUserId: userId } = useUserContext();
  const isAlreadyliked = likes.some(({ user_id }) => user_id === userId);
  const [like, setLike] = useState(isAlreadyliked);

  const [likePost] = useMutation(LIKE_POST, {
    variables: {
      postId,
      userId,
      profileId: authorId,
    },
  });
  const [unlikePost] = useMutation(UNLIKE_POST, {
    variables: {
      postId,
      userId,
      profileId: authorId,
    },
  });
  const handleLike = () => {
    likePost();
    setLike(true);
  };
  const handleUnLike = () => {
    unlikePost();
    setLike(false);
  };
  return (
    <button onClick={like ? handleUnLike : handleLike}>
      {like ? <LikeActiveIcon /> : <LikeIcon />}
    </button>
  );
}
function SaveButton({ postId, savedPosts }) {
  const { currentUserId: userId } = useUserContext();
  const isAlreadySaved = savedPosts.some(({ user_id }) => user_id === userId);
  const [save, setSave] = useState(isAlreadySaved);

  const [savePost] = useMutation(SAVE_POST, {
    variables: {
      postId,
      userId,
    },
  });
  const [unsavePost] = useMutation(UNSAVE_POST, {
    variables: {
      postId,
      userId,
    },
  });
  const handleSave = () => {
    savePost();
    setSave(true);
  };
  const handleUnSave = () => {
    unsavePost();
    setSave(false);
  };
  return (
    <button onClick={save ? handleUnSave : handleSave}>
      {save ? <SaveActiveIcon /> : <SaveIcon filled />}
    </button>
  );
}
