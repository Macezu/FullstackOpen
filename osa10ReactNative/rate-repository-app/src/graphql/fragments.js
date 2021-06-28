import { gql } from "@apollo/client";

export const REPOSITORY_CORE = gql`
  fragment RepositoryDetails on Repository {
    id
    ownerAvatarUrl
    fullName
    description
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
