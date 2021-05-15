import React, { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from "./components/Login"
import { ALL_AUTHORS, ALL_BOOKS } from "./components/queries"


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS,{pollInterval: 2000})
  const books = useQuery(ALL_BOOKS,{pollInterval: 2000})
  const client = useApolloClient()

  if (authors.loading || books.loading){
    return <div>loading...</div>
  }

  const logout = () =>{
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }

  if (!token){
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>log in</button>
        </div>
  
        <Authors
          show={page === 'authors'}
          authors = {authors.data.allAuthors}
        />
  
        <Books
          show={page === 'books'}
          books = {books.data.allBooks}
        />
  
  
        <Login
          show={page === 'login'}
          setToken={setToken}
          setPage={setPage}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => logout()}>log out</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors = {authors.data.allAuthors}
      />

      <Books
        show={page === 'books'}
        books = {books.data.allBooks}
      />

      <NewBook
        show={page === 'add'}
      />
    </div>
  )
}

export default App