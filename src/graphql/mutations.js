import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUsers(
    $userId: String!
    $name: String!
    $userName: String!
    $email: String!
    $bio: String!
    $website: String!
    $profileImage: String!
    $phoneNumber: String!
  ) {
    insert_users(
      objects: {
        user_id: $userId
        name: $name
        username: $userName
        email: $email
        bio: $bio
        website: $website
        profile_image: $profileImage
        phone_number: $phoneNumber
      }
    ) {
      affected_rows
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser(
    $userId: String!
    $name: String!
    $userName: String!
    $bio: String!
    $website: String!
    $phoneNumber: String!
  ) {
    update_users(
      where: { user_id: { _eq: $userId } }
      _set: {
        name: $name
        phone_number: $phoneNumber
        website: $website
        bio: $bio
        username: $userName
      }
    ) {
      affected_rows
    }
  }
`;
export const EDIT_USER_AVATAR = gql`
  mutation editUserAvatar($userId: String!, $profileImage: String!) {
    update_users(
      where: { user_id: { _eq: $userId } }
      _set: { profile_image: $profileImage }
    ) {
      affected_rows
    }
  }
`;
export const CHECK_NOTIFICATIONS = gql`
  mutation checkNotifications($userId: String!, $lastChecked: String!) {
    update_users(
      where: { user_id: { _eq: $userId } }
      _set: { last_checked: $lastChecked }
    ) {
      affected_rows
    }
  }
`;

export const CREAT_USER_POST = gql`
  mutation creatUserPost($userId: String!, $media: String!, $caption: String) {
    insert_posts(
      objects: { user_id: $userId, media: $media, caption: $caption }
    ) {
      affected_rows
    }
  }
`;

export const SAVE_POST = gql`
  mutation savePost($userId: String!, $postId: uuid!) {
    insert_saved_posts(objects: { user_id: $userId, post_id: $postId }) {
      affected_rows
    }
  }
`;

export const UNSAVE_POST = gql`
  mutation unsavePost($userId: String!, $postId: uuid!) {
    delete_saved_posts(
      where: { user_id: { _eq: $userId }, post_id: { _eq: $postId } }
    ) {
      affected_rows
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($userId: String!, $postId: uuid!, $profileId: String!) {
    insert_likes(objects: { user_id: $userId, post_id: $postId }) {
      affected_rows
    }
    insert_notifications(
      objects: {
        user_id: $userId
        post_id: $postId
        profile_id: $profileId
        type: "like"
      }
    ) {
      affected_rows
    }
  }
`;

export const UNLIKE_POST = gql`
  mutation unlikePost($userId: String!, $postId: uuid!, $profileId: String!) {
    delete_likes(
      where: { user_id: { _eq: $userId }, post_id: { _eq: $postId } }
    ) {
      affected_rows
    }
    delete_notifications(
      where: {
        user_id: { _eq: $userId }
        post_id: { _eq: $postId }
        profile_id: { _eq: $profileId }
        type: { _eq: "like" }
      }
    ) {
      affected_rows
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($userId: String!, $postId: uuid!, $content: String!) {
    insert_comments(
      objects: { user_id: $userId, post_id: $postId, content: $content }
    ) {
      affected_rows
    }
  }
`;

export const FOLLOW_USER = gql`
  mutation followUser($userIdToFollow: String!, $currentUserId: String!) {
    insert_followers(
      objects: { user_id: $userIdToFollow, profile_id: $currentUserId }
    ) {
      affected_rows
    }
    insert_following(
      objects: { user_id: $currentUserId, profile_id: $userIdToFollow }
    ) {
      affected_rows
    }
    insert_notifications(
      objects: {
        user_id: $currentUserId
        profile_id: $userIdToFollow
        type: "follow"
      }
    ) {
      affected_rows
    }
  }
`;

export const UNFOLLOW_USER = gql`
  mutation followUser($userIdToFollow: String!, $currentUserId: String!) {
    delete_followers(
      where: {
        user_id: { _eq: $userIdToFollow }
        profile_id: { _eq: $currentUserId }
      }
    ) {
      affected_rows
    }
    delete_following(
      where: {
        user_id: { _eq: $currentUserId }
        profile_id: { _eq: $userIdToFollow }
      }
    ) {
      affected_rows
    }
    delete_notifications(
      where: {
        user_id: { _eq: $currentUserId }
        profile_id: { _eq: $userIdToFollow }
        type: { _eq: "follow" }
      }
    ) {
      affected_rows
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postId: uuid!, $userId: String!) {
    delete_posts(where: { id: { _eq: $postId }, user_id: { _eq: $userId } }) {
      affected_rows
    }
    delete_likes(where: { post_id: { _eq: $postId } }) {
      affected_rows
    }
    delete_saved_posts(where: { post_id: { _eq: $postId } }) {
      affected_rows
    }
    delete_notifications(where: { post_id: { _eq: $postId } }) {
      affected_rows
    }
  }
`;
