import { ActiveHeart, CommentActiveIcon } from "../../assets/icons";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

const GridPost = ({ media, id, likes_aggregate, comments_aggregate }) => {
  let location = useLocation();
  const likes = likes_aggregate.aggregate.count;
  const comments = comments_aggregate.aggregate.count;
  return (
    <Link to={`/p/${id}`} state={{ backgroundLocation: location }}>
      <article className="relative mb-6 overflow-hidden text-white bg-gray-100 rounded-sm shadow group">
        <div className="w-full overflow-hidden aspect-w-1 aspect-h-1 sm:aspect-w-2 sm:aspect-h-3">
          <img
            src={media}
            alt="exploreImg"
            className="object-cover object-center w-full h-full "
          />
        </div>
        <div className="absolute inset-0 transition-all duration-300 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100">
          <div className="flex items-center justify-center h-full space-x-8">
            <span className="flex items-center justify-center gap-1">
              <ActiveHeart />
              <span>{likes}</span>
            </span>

            <span className="flex items-center justify-center gap-2">
              <CommentActiveIcon />
              <span> {comments}</span>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default GridPost;
