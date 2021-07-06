import { gql } from "@apollo/client";
import { REPOSITORY_CORE } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $first: Int
    $after: String
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      first: $first
      after: $after
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
    }
  }
  ${REPOSITORY_CORE}
`;

export const GET_AUTHORIZATION = gql`
  query AuthorizedUser {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_SINGLE_REPO = gql`
query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryDetails
      reviews(first: $first, after: $after) {
        edges {
          cursor
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_CORE}
`;
