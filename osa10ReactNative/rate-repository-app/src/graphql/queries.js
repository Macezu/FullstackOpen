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
  query Repository($id: String) {
    repository(id: $id) {
      ...repositoryDetails
    }
  }
  ${REPOSITORY_CORE}
`;
