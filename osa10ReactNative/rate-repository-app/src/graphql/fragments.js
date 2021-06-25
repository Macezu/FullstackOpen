import { gql } from '@apollo/client';

export const CORE_REPOSITORY_FIELDS = gql`
  fragment CoreRepository on Repository {
    repositories {
      edges {
        node {
          ownerAvatarUrl
          ownerName
          name
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
        }
      }
    }
`;

