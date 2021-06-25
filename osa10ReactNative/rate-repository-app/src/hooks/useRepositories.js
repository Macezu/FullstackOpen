import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = () => {
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const { error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network"
    // Other options
  });
  console.log(loading);
  console.log(error);
  console.log(data);

  const fetchRepositories = async () => {
    setLoading(true);

    // Replace the IP address part with your own IP address!
    // const response = await fetch('http://10.37.110.80:5000/api/repositories');

    const json = await data.json();

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;
