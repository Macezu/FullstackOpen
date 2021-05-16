import React, { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from "./components/Login"
import Preferred from "./components/Preferred"
import { ALL_AUTHORS, ALL_BOOKS, ME } from "./components/queries"


const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS,{pollInterval: 5000})
  const books = useQuery(ALL_BOOKS,{pollInterval: 5000})
  const user = useQuery(ME)
  const client = useApolloClient()

  if (authors.loading || books.loading || user.loading){
    return <div>loading site...</div>
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
        <button onClick={() => setPage('preferred')}>preferred</button>
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

      <Preferred
        show={page === 'preferred'}
        user = {user}
      />
    </div>
  )
}

export default App