import { useState, useEffect } from "react";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    pollInterval: 4000
  });

  useEffect(() => {
    if (loading === false && data) {
      setRepositories(data.repositories);
    }
  }, [data, loading]);

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error}`;
  else {
    return { repositories, loading, refetch: () => refetch() };
  }
};

export default useRepositories;
