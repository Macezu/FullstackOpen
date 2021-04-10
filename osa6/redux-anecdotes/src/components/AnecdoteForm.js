import React from "react"
import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { newNotification, restoreNotification  } from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const AddAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ""
    dispatch(createAnecdote(content))
    dispatch(newNotification(content))
    setTimeout(() => {
      dispatch(restoreNotification())
    }, 5000);
    
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={AddAnecdote}>
        <div>
          <input name="anecdoteInput" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
