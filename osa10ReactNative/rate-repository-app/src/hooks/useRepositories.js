import { useState, useEffect } from "react";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (variables) => {
  
  const [repositories, setRepositories] = useState();
  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  });
  

  useEffect(() => {
    if (loading === false && data) {
      setRepositories(data.repositories);
    }
  }, [data, loading]);

  return { repositories, refetch };
};

export default useRepositories;
