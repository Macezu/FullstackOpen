import React, {useEffect} from 'react'
import AnecdoteForm from "./components/AnecdoteForm"
import AnecdoteList from "./components/AnecdoteList"
import Notifiations from "./components/Notification"
import Filter from "./components/Filter"

import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const brackFridayBunduru = {
  backgroundColor: "#c2c5c5",
}

const App = () => {
  const dispatch = useDispatch()  
  useEffect(() => {    
    dispatch(initializeAnecdotes())
    }, [dispatch])

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
