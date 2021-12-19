import { Link } from "react-router-dom";
import GridPost from "components/shared/GridPost";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_MORE_POSTS_FROM_USER, GET_POST } from "graphql/queries";
import { useEffect } from "react";
import { LogoLoadingIcon } from "assets/icons";

const MorePostsFromUser = ({ postId }) => {
  const { data, loading } = useQuery(GET_POST, { variables: { postId } });
  const [getMorePosts, { data: morePosts, loading: loadingLazy }] =
    useLazyQuery(GET_MORE_POSTS_FROM_USER);

  useEffect(() => {
    if (loading) return;
    const userId = data.posts_by_pk.user.user_id;
    const postId = data.posts_by_pk.id;
    getMorePosts({ variables: { userId, postId } });
  }, [data, loading, getMorePosts]);

  return (
    <div className="mt-16">
      {loading || loadingLazy ? (
        <LogoLoadingIcon />
      ) : (
        <>
          <h2 className="mb-4 text-lg font-semibold leading-4 text-gray-light">
            More posts from
            <Link
              to={`/${data.posts_by_pk.user.username}`}
              className="ml-1 text-gray-primary"
            >
              @{data.posts_by_pk.user.username}
            </Link>
          </h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
            {morePosts?.posts.map((post) => (
              <GridPost key={post.id} {...post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MorePostsFromUser;
