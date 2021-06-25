import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = async () => {
  const [repositories, setRepositories] = useState();

  const {loading, error, data} = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network"
    // Other options
  });
  console.log(loading);
  console.log(error);
  console.log(data);

  const json = await data.json();

  
  useEffect(() => {
    setRepositories(json);
  }, [data]);

  return repositories;
};

export default useRepositories;
