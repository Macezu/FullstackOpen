import { useState, useEffect } from "react";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_SINGLE_REPO } from "../graphql/queries";

const useRepository = ({id}) => {
  const [repository, setRepo] = useState();
  const { data, loading, error } = useQuery(GET_SINGLE_REPO, {
    fetchPolicy: "cache-and-network",
    variables: { id },
  });
  console.log(data);

  useEffect(() => {
    if (loading === false && data) {
      setRepo(data.repository);
    }
  }, [data, loading]);

  if (loading) return <div>Loading...</div>;
  if (error) return `Error! ${error}`;
  else {
    return { repository, loading };
  }
};

export default useRepository;
