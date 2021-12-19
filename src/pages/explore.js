import React from "react";

import Layout from "components/shared/Layout";
import GridPost from "components/shared/GridPost";
import LoadingScreen from "components/shared/LoadingScreen";
import ExploreSuggestions from "components/explore/ExploreSuggestions";

import { useUserContext } from "auth/userContext";
import { useQuery } from "@apollo/client";
import { EXPLORE_POSTS } from "graphql/queries";

function ExplorePage() {
  const { followingIds } = useUserContext();
  const { data, loading } = useQuery(EXPLORE_POSTS, {
    variables: { feedIds: followingIds },
  });
  if (loading) return <LoadingScreen />;

  return (
    <Layout title="Explore" maxWidth="max-w-6xl">
      <section className="relative mx-auto ">
        <div className="sm:px-6 lg:px-8">
          <ExploreSuggestions />
        </div>

        <div className="max-w-2xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-9">
          <h2 className="mb-4 text-lg font-semibold leading-4 text-gray-600">
            Explore
          </h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8 ">
            {data?.posts.map((post) => (
              <GridPost key={post.id} {...post} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ExplorePage;
