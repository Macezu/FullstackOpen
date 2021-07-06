import React from "react";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPO } from "../graphql/queries";

const useRepository = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: "cache-and-network",
    variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables
      }
    });
  };

  return {
    repository: data?.repository,
    fetchMore: handleFetchMore,
    loading,
    ...result
  };
};

export default useRepository;
