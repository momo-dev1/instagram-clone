import { gql } from "@apollo/client";
import { gridPostFields, userFields } from "./fragments";

export const GET_USER_EDIT_PROFILE = gql`
  query getUser($userId: String!) {
    users_by_pk(user_id: $userId) {
      user_id
      profile_image
      name
      website
      bio
      phone_number
      username
    }
  }
`;

export const GET_USER_PROFILE = gql`
  query getUserProfile($username: String!) {
    users(where: { username: { _eq: $username } }) {
      id
      user_id
      name
      username
      website
      bio
      profile_image
      posts_aggregate {
        aggregate {
          count
        }
      }
      followers_aggregate {
        aggregate {
          count
        }
      }
      following_aggregate {
        aggregate {
          count
        }
      }
      saved_post(order_by: { created_at: desc }) {
        post {
          ...gridPostFields
        }
      }
      posts(order_by: { created_at: desc }) {
        ...gridPostFields
      }
    }
  }
  ${gridPostFields}
`;

export const SEARCH_USERS = gql`
  query searchUsers($searchValue: String) {
    users(
      where: {
        _or: [
          { username: { _ilike: $searchValue } }
          { name: { _ilike: $searchValue } }
        ]
      }
    ) {
      ...userFields
    }
  }
  ${userFields}
`;

export const SUGGEST_USERS = gql`
  query suggestUsers(
    $limit: Int!
    $followerIds: [String!]!
    $createdAt: timestamptz!
  ) {
    users(
      limit: $limit
      where: {
        _or: [
          { user_id: { _in: $followerIds } }
          { created_at: { _gt: $createdAt } }
        ]
      }
    ) {
      ...userFields
    }
  }
  ${userFields}
`;

export const EXPLORE_POSTS = gql`
  query explorePosts($feedIds: [String!]!) {
    posts(
      order_by: {
        created_at: desc
        likes_aggregate: { count: desc }
        comments_aggregate: { count: desc }
      }
      where: { user_id: { _nin: $feedIds } }
    ) {
      ...gridPostFields
    }
  }
  ${gridPostFields}
`;

export const GET_MORE_POSTS_FROM_USER = gql`
  query getMorePostsFromUser($userId: String!, $postId: uuid!) {
    posts(
      limit: 6
      where: { user_id: { _eq: $userId }, _not: { id: { _eq: $postId } } }
    ) {
      ...gridPostFields
    }
  }
  ${gridPostFields}
`;

export const GET_POST = gql`
  query getPost($postId: uuid!) {
    posts_by_pk(id: $postId) {
      id
      user {
        id
        user_id
        username
      }
    }
  }
`;

export const GET_FEED = gql`
  query getFeed(
    $limit: Int!
    $feedIds: [String!]!
    $lastTimestamp: timestamptz
  ) {
    posts(
      limit: $limit
      where: { user_id: { _in: $feedIds }, created_at: { _lt: $lastTimestamp } }
      order_by: { created_at: desc }
    ) {
      id
      caption
      created_at
      media

      user {
        id
        user_id
        username
        name
        profile_image
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      likes {
        id
        user_id
      }
      saved_posts {
        id
        user_id
      }
      comments_aggregate {
        aggregate {
          count
        }
      }
      comments(order_by: { created_at: desc }, limit: 2) {
        id
        content
        created_at
        user {
          username
        }
      }
    }
  }
`;
