import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { setContext } from "apollo-link-context"
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';


import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache
} from "@apollo/client"

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log('graphQLErrors', graphQLErrors);
  }
  if (networkError) {
    console.log('networkError', networkError);
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("phonenumbers-user-token")
  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000/' })

const concattedLink = authLink.concat(httpLink)

const link = ApolloLink.from([errorLink, concattedLink]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)
