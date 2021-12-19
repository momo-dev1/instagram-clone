import { gql } from "@apollo/client";

export const MY_DATA_PROFILE = gql`
  subscription me($userId: String) {
    users(where: { user_id: { _eq: $userId } }) {
      id
      name
      username
      user_id
      profile_image
      last_checked
      created_at
      followers {
        users {
          id
          user_id
          name
        }
      }
      following {
        users {
          id
          user_id
          name
        }
      }
      notifications(order_by: { created_at: desc }) {
        id
        type
        created_at
        post {
          id
          media
        }
        user {
          id
          user_id
          username
          profile_image
        }
      }
    }
  }
`;
export const GET_POST = gql`
  subscription getPost($postId: uuid!) {
    posts_by_pk(id: $postId) {
      id
      created_at
      caption
      media
      user {
        id
        user_id
        username
        profile_image
        name
      }
      likes_aggregate {
        aggregate {
          count
        }
      }
      saved_posts {
        id
        user_id
      }
      comments(order_by: { created_at: desc }) {
        id
        content
        created_at
        user {
          username
          profile_image
          saved_post {
            id
            user_id
          }
        }
      }
      likes {
        id
        post_id
        user_id
      }
    }
  }
`;
