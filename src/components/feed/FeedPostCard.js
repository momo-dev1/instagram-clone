import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import UserHeaderCard from "components/shared/UserHeaderCard";
import FollowSuggestions from "components/shared/FollowSuggestions/FollowSuggestions";

import { useMutation } from "@apollo/client";

import {
  ShareIcon,
  LikeIcon,
  LikeActiveIcon,
  SaveIcon,
  MoreIcon,
  CommentIcon,
  SaveActiveIcon,
} from "../../assets/icons";
import OptionsDialog from "components/shared/OptionsDialog";
import { dateFormatToNow, datePostFormat } from "utils/dateFormat";
import {
  ADD_COMMENT,
  LIKE_POST,
  SAVE_POST,
  UNLIKE_POST,
  UNSAVE_POST,
} from "graphql/mutations";
import { useUserContext } from "auth/userContext";
import { GET_FEED } from "graphql/queries";

const FeedPostCard = ({
  id,
  likes,
  likes_aggregate,
  caption,
  user,
  saved_posts,
  comments,
  comments_aggregate,
  created_at,
  media,
  index,
}) => {
  const navigate = useNavigate();
  const { currentUserId: userId } = useUserContext();
  const [content, setContent] = useState("");
  const [showcaption, setShowCaption] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const likesCount = likes_aggregate.aggregate.count;
  const CommentsCount = comments_aggregate.aggregate.count;
  const { username } = user;
  const showFollowSuggestions = index === 1;
  const [addCommnet] = useMutation(ADD_COMMENT, {
    variables: { userId, postId: id, content },
    refetchQueries: [GET_FEED],
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    setContent("");
    if (content.length > 0) {
      addCommnet();
    }
  };

  function navigateToUserProfile() {
    navigate(`/${user.username}`);
  }
  return (
    <>
      <div className="mb-8 overflow-hidden bg-white border rounded shadow-sm text-gray-primary">
        <div className="flex items-center justify-between w-full p-3">
          <UserHeaderCard user={user} />
          <span onClick={() => setShowDialog(true)} className="cursor-pointer">
            <MoreIcon />
          </span>
        </div>
        <div>
          <img
            className="object-cover w-full h-full"
            src={media}
            alt="postpic"
          />
        </div>
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
          <div>
            <span className="text-sm font-medium">
              {likesCount === 1 ? `1 like` : `${likesCount} likes`}
            </span>
          </div>
          <div className="pt-1">
            <div className="mb-2 text-sm ">
              <div className={`${showcaption ? "" : "line-clamp-1"}`}>
                <Link to={`/${username}`}>
                  <h3 className="inline mr-1 font-medium">{username}</h3>
                </Link>
                <p className="inline text-base">{caption}</p>
              </div>

              <span
                onClick={() => setShowCaption(!showcaption)}
                className="cursor-pointer text-gray-light"
              >
                {showcaption ? "less" : "more"}
              </span>
            </div>
          </div>
          {CommentsCount > 2 && (
            <Link to={`/p/${id}`}>
              <div className="mb-2 text-sm font-medium cursor-pointer text-gray-light">
                View all {CommentsCount} comments
              </div>
            </Link>
          )}

          <div className="mb-2">
            <div className="flex flex-col gap-2 ">
              {comments
                ?.map((comment) => {
                  const { content, created_at, user } = comment;

                  return (
                    <div key={comment.id} className="flex justify-between">
                      <div className="flex gap-2 ">
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
                      <div className="mt-1 text-xs font-normal text-gray-light">
                        {dateFormatToNow(created_at)}
                      </div>
                    </div>
                  );
                })
                .slice(0, 2)}
            </div>
          </div>

          <div style={{ fontSize: 10 }} className="mb-2 text-gray-light ">
            {datePostFormat(created_at)}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
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
      {showFollowSuggestions && <FollowSuggestions />}
      {showDialog && (
        <OptionsDialog postId={id} setShowDialog={setShowDialog} />
      )}
    </>
  );
};
export default FeedPostCard;

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
    refetchQueries: [GET_FEED],
  });
  const [unlikePost] = useMutation(UNLIKE_POST, {
    variables: {
      postId,
      userId,
      profileId: authorId,
    },
    refetchQueries: [GET_FEED],
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
    refetchQueries: [GET_FEED],
  });
  const [unsavePost] = useMutation(UNSAVE_POST, {
    variables: {
      postId,
      userId,
    },
    refetchQueries: [GET_FEED],
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
