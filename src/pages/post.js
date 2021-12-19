import React from "react";
import { useParams } from "react-router";

import Layout from "components/shared/Layout";
import SinglePostCard from "components/post/SinglePostCard";
import MorePostsFromUser from "components/post/MorePostsFromUser";

const PostPage = () => {
  const { postId } = useParams();

  return (
    <Layout maxWidth="max-w-6xl">
      <div className="mx-6">
        <SinglePostCard postId={postId} />
        <MorePostsFromUser postId={postId} />
      </div>
    </Layout>
  );
};

export default PostPage;
