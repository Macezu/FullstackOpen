import { useLazyQuery } from "@apollo/client"
import { FILTERED_BOOKS } from "./queries"
import React, { useState, useEffect } from "react"

const Preferred = ({ show, user }) => {
  const [getPref, result] = useLazyQuery(FILTERED_BOOKS)
  const [books, setBooks] = useState(null)

  const setFilter = (genre) => {
    console.log(genre)
    getPref({ variables: { genrefilter: genre } })
  }

  useEffect(() => {
    if (user) {
      setFilter(user.data.me.favoriteGenre)
    }
  }, []) // eslint-disable-line

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result]) // eslint-disable-line

  if (!show) {
    return null
  }

  if (!books) return <div>loading user profile...</div>
  if (!user.data.me.favoriteGenre)
    return <div>You have not set a favorite genre</div>

  return (
    <div>
      <h2>
        Welcome {user.data.me.username} these are our recommendations based on
        your favorite genre: <u>{user.data.me.favoriteGenre}</u>
      </h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Preferred
