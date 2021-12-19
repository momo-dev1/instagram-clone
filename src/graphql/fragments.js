import { gql } from "@apollo/client";

export const userFields = gql`
  fragment userFields on users {
    id
    user_id
    username
    name
    profile_image
  }
`;

export const gridPostFields = gql`
  fragment gridPostFields on posts {
    id
    media
    likes_aggregate {
      aggregate {
        count
      }
    }
    comments_aggregate {
      aggregate {
        count
      }
    }
  }
`;
