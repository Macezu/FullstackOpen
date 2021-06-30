import React, { useState, useEffect } from "react";
import { useParams } from "react-router-native";
import useRepository from "../../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";

export const RepositoryDetailed = () => {
  let { id } = useParams();
  const { repository } = useRepository(id);
  console.log(repository);

  if (repository) {
    return <RepositoryItem item={repository} />;
  } else {
    return <div>Loading..</div>;
  }
};
