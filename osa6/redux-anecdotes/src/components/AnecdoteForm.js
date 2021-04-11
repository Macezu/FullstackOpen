import React from "react"
import { connect } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification} from "../reducers/notificationReducer"

const AnecdoteForm = (props) => {

  const AddAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdoteInput.value
    event.target.anecdoteInput.value = ""
    props.createAnecdote(content)
    props.setNotification(`you added '${content}'`, 3000)
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

const mapDispatchToProps = {
  createAnecdote,
  setNotification,
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const ConnectedAnecdoteForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm);

export default ConnectedAnecdoteForm;

