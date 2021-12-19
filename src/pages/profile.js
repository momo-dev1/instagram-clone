import React, { useState } from "react";
import { useParams } from "react-router";
import { GearIcon } from "assets/icons";

import { useUserContext } from "auth/userContext";
import { useQuery } from "@apollo/client";
import { GET_USER_PROFILE } from "graphql/queries";

import Layout from "components/shared/Layout";
import GridPost from "components/shared/GridPost";
import ProfileBio from "components/profile/ProfileBio";
import ProfileTabs from "components/profile/ProfileTabs";
import ProfileSave from "components/profile/ProfileSave";
import OptionsDialog from "components/shared/OptionsDialog";
import LoadingScreen from "components/shared/LoadingScreen";
import ProfileAvatar from "components/profile/ProfilePicture";
import ProfileNoPosts from "components/profile/ProfileNoPosts";
import FollowingButton from "components/shared/FollowingButton";
import EditProfileButton from "components/shared/EditProfileButton";
import ProfileFollowingList from "components/profile/ProfileFollowingList";

const ProfilePage = () => {
  const { currentUserId } = useUserContext();
  const { username } = useParams();
  const [showDialog, setShowDialog] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const { data, loading } = useQuery(GET_USER_PROFILE, {
    variables: { username },
  });

  if (loading) return <LoadingScreen />;

  const [user] = data.users;
  const isFollowing = true;
  const isOwner = user.user_id === currentUserId;

  const {
    bio,
    name,
    posts,
    profile_image,
    followers_aggregate,
    following_aggregate,
    user_id,
    website,
  } = user;

  const followersCount = followers_aggregate.aggregate.count;
  const followingCount = following_aggregate.aggregate.count;
  const postsCount = posts.length;

  return (
    <Layout maxWidth="max-w-6xl" title={`${name} (@${username})`}>
      <main className="">
        <header className="flex flex-wrap items-center p-4 md:mb-6 md:justify-center">
          <ProfileAvatar profile_image={profile_image} />
          <div className="w-8/12 ml-4 md:w-7/12">
            <div className="relative flex flex-wrap items-center gap-1 mb-1 xs:mb-3">
              <h2 className="py-1.5 mb-2 text-xl font-light xs:text-3xl md:mr-2 sm:mb-0 line-clamp-1">
                {username.length > 15
                  ? `${username.substr(0, 15)}...`
                  : username}
              </h2>

              <div className="order-2 md:order-none">
                {isOwner ? (
                  <EditProfileButton />
                ) : (
                  <FollowingButton
                    userId={user_id}
                    profileBtn
                    isFollowing={isFollowing}
                  />
                )}
              </div>
              {isOwner && (
                <div
                  onClick={() => setShowDialog(true)}
                  className="order-1 ml-4 md:order-none"
                >
                  <GearIcon />
                </div>
              )}
            </div>

            <ProfileFollowingList
              posts={postsCount}
              followers={followersCount}
              following={followingCount}
            />

            <ProfileBio website={website} bio={bio} name={name} />
          </div>
        </header>
        <ProfileBio smallScreen website={website} bio={bio} name={name} />

        <ProfileFollowingList
          posts={postsCount}
          followers={followersCount}
          following={followingCount}
          smallScreen
        />

        <ProfileTabs
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          isOwner={isOwner}
        />

        {tabIndex === 1 && isOwner && <ProfileSave user={user} />}

        {tabIndex === 0 && (
          <>
            {user.posts.length === 0 ? (
              <ProfileNoPosts />
            ) : (
              <div className="grid grid-cols-1 p-4 gap-y-2 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
                {user.posts.map((item) => (
                  <GridPost key={item.id} {...item} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
      {showDialog && <OptionsDialog isProfile setShowDialog={setShowDialog} />}
    </Layout>
  );
};

export default ProfilePage;
