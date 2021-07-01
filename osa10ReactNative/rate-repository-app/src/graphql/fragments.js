import { gql } from "@apollo/client";

export const REPOSITORY_CORE = gql`
  fragment RepositoryDetails on Repository {
    id
    ownerAvatarUrl
    fullName
    description
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            username
          }
        }
      }
    }
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    url
  }
`;

export const USER_CORE = gql`
  fragment UserDetails on User {
    id
    username
    createdAt
    reviewCount
  }
`;

export const REVIEW_CORE = gql`
  fragment ReviewDetails on Repository {
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
        }
      }
    }
  }
`;
