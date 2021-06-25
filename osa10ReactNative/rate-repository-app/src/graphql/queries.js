import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query GetRespositories{
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
  }
`;

// other queries...
