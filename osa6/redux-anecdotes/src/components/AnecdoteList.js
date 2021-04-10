import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import {
  likedNotification,
  restoreNotification,
} from "../reducers/notificationReducer"

const btnStyle = {
  borderRadius: 12,
  color: " #44443e ",
  marginLeft: 5,
  backgroundColor: "#fcf913",
}

const Anecdote = ({ anecdote, handleLikeClicked }) => {
  return (
    <li>
      {anecdote.content}
      <br></br>
      has {anecdote.votes} votes
      <button style={btnStyle} onClick={handleLikeClicked}>
        vote
      </button>
    </li>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ filters, anecdotes }) => {
    if (filters) {
      return anecdotes.sort((x, y) => y.votes > x.votes).filter(anecdote => anecdote.content.includes(filters.content))
    }
    return anecdotes.sort((x, y) => y.votes > x.votes)
  })

  const addLike = (anecdote) => {
    dispatch(vote(anecdote.id))
    dispatch(likedNotification(anecdote.content))
    setTimeout(() => {
      dispatch(restoreNotification())
    }, 5000)
  }

  return (
    <>
      <ul>
        {anecdotes.map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleLikeClicked={() => addLike(anecdote)}
          />
        ))}
      </ul>
    </>
  )
}
export default AnecdoteList
