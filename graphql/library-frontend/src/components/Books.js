import React, { useState, useEffect } from "react"
//import { useLazyQuery } from "@apollo/client"
//import { ALL_BOOKS } from "./queries"

const Genre = ({ genre }) => {
  return <button onClick={"// Tänne uus queryhaku"}>genre</button>
}

const Books = ({ show, books }) => {
  const [filter, setFilter] = useState(null)

  useEffect(() => {
    console.log(filter)
  }, [setFilter]) // eslint-disable-line

  if (!show) {
    return null
  }

  const genres = new Set(books.map((b) => b.genres).flat())

  console.log(genres)

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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul>
      {genres.forEach(a =>
        <li key={TÄMÄ}><Genre genre={a}/></li>
      )}
        
      </ul>
    </div>
  )
}

export default Books
