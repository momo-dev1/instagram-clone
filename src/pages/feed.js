import { lazy, Suspense } from "react";

import Layout from "components/shared/Layout";
import FeedStories from "components/feed/FeedStories";

import FeedSuggestions from "components/feed/FeedSuggestions";
import FeedPostSkeleton from "components/feed/FeedPostSkeleton";

import { useUserContext } from "auth/userContext";
import { useQuery } from "@apollo/client";
import { GET_FEED } from "graphql/queries";
import LoadingScreen from "components/shared/LoadingScreen";

const FeedPostCard = lazy(() => import("components/feed/FeedPostCard"));

const FeedPage = () => {
  const { feedIds, currentUserData } = useUserContext();
  const { data, loading } = useQuery(GET_FEED, {
    variables: {
      limit: 12,
      feedIds,
      lastTimestamp: currentUserData?.last_checked,
    },
  });
  if (loading) return <LoadingScreen />;
  return (
    <Layout maxWidth="max-w-6xl">
      <section className="relative grid max-w-lg grid-cols-5 px-4 mx-auto md:max-w-full md:px-0 md:mx-7">
        <div className="flex flex-col gap-3 m-2 col-span-full md:col-span-3">
          <FeedStories />
          {data?.posts?.map((post, index) => (
            <Suspense key={post.id} fallback={<FeedPostSkeleton />}>
              <FeedPostCard {...post} index={index} />
            </Suspense>
          ))}
        </div>
        <FeedSuggestions />
      </section>
    </Layout>
  );
};

export default FeedPage;
