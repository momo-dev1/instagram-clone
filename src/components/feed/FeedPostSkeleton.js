import {
  CommentIcon,
  LikeIcon,
  SaveIcon,
  ShareIcon,
  SkeletonImg,
} from "assets/icons";

const FeedPostSkeleton = () => {
  return (
    <div className="mb-8 overflow-hidden bg-white border rounded shadow-sm text-gray-primary">
      <div className="flex items-center justify-between w-full p-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200 rounded-full"></div>
          <div className="px-8 py-1 font-semibold bg-gray-200 text-md"></div>
        </div>
      </div>
      <div style={{ height: 700 }}>
        <SkeletonImg />
      </div>
      <div className="flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-3 ">
          <button>
            <LikeIcon />
          </button>
          <CommentIcon />
          <ShareIcon />
        </div>
        <SaveIcon filled />
      </div>
      <div className="px-3 pb-2">
        <div>
          <span className="text-sm font-medium"></span>
        </div>
      </div>
      <div className="flex border-t">
        <textarea
          style={{ resize: "none" }}
          placeholder="Add a comment..."
          className="flex-1 h-10 px-3 py-2 focus:outline-none"
          type="text"
        />
        <button className="px-3 py-2 font-semibold transition-all duration-300 opacity-50 text-blue-medium hover:opacity-100">
          Post
        </button>
      </div>
    </div>
  );
};

export default FeedPostSkeleton;
