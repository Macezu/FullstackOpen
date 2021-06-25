import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {GET_REPOSITORIES} from "../graphql/queries";

const useRepositories = async () => {
  const [repositories, setRepositories] = useState();

  const data = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network"
    // Other options
  });

  console.log("kissa",data);




  useEffect(() => {
    setRepositories(data.repositories);
  }, [data]);
};

export default useRepositories;
