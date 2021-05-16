import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const FILTERED_BOOKS = gql`
  query allGenreBooks($genrefilter: String!) {
    allBooks(genre: $genrefilter) {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`

export const CREATE_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
      published
      author {
        name
        born
      }
    }
  }
`

export const EDIT_BIRTH = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`

export const LOGIN = gql`
  mutation login($userN: String!, $passwd: String!) {
    login(username: $userN, password: $passwd) {
      value
    }
  }
`
