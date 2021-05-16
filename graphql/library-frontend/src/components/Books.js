import React, { useState, useEffect } from "react"
import { useLazyQuery } from "@apollo/client"
import { FILTERED_BOOKS, ALL_BOOKS } from "./queries"

const Genres = ({ genres, setFilter }) => {
  const buttonGenres = []
  for (let value of genres.values()) {
    buttonGenres.push(
      <button key={value} onClick={() => setFilter(value)}>
        {value}
      </button>
    )
  }
  return buttonGenres
}

const Books = ({ show, books }) => {
  const [book, setBooks] = useState(books)
  const [getFiltered, result] = useLazyQuery(FILTERED_BOOKS, {
    onError: (error) => {
      alert(error.message)
    },
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: FILTERED_BOOKS })
      store.writeQuery({
        query: FILTERED_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [...dataInStore.allBooks, response.data.allBooks]
        }
      })
    }
  })

  const setFilter = (genre) => {
    getFiltered({ variables: { genrefilter: genre } })
  }

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result])

  if (!show) {
    return null
  }

  if (getFiltered.loading){
    return <div>filtering...</div>
  }

  const genres = new Set(books.map((b) => b.genres).flat())

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {book.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Genres genres={genres} setFilter={setFilter} />
      </div>
    </div>
  )
}

export default Books
