import anecdoteService from "../services/anecdotes"

const reducer = (state = [], action) => {
  //console.log("state now: ", state)
  //console.log("action", action)
  switch (action.type) {
    case "INIT":
      return action.data
    case "VOTE":
      const likedAnecdote = state.find((n) => n.id === action.data.id)
      return state.map((anecdote) =>
        anecdote.id !== action.data.id ? anecdote : likedAnecdote
      )
    case "ADDNEW":
      return [...state, action.data]
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT",
      data: anecdotes,
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: "ADDNEW",
      data: newAnecdote,
    })
  }
}

export const vote = (content) => {
  content.votes ++
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.update(content.id, content)
    dispatch({
      type: "VOTE",
      data: updatedAnecdote,
    })
  }
}

export default reducer
