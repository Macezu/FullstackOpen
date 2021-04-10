import React from "react"

import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notifiations from "./components/Notification"
import Filter from "./components/Filter"

const brackFridayBunduru = {
  backgroundColor: "#c2c5c5",
}

const App = () => {
  return (
    <div style={brackFridayBunduru}>
      <Notifiations />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
