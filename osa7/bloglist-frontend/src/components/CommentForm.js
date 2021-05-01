import React from "react"

const commentForm = ({ handleCommentSubmitted, handleCommentChanged, comment, id }) => {
  return (
    <div>
      <form onSubmit={() => handleCommentSubmitted(event,id)}>
        <input id="Comment" value={comment} onChange={handleCommentChanged} />
        <button id="comment-button" type="submit">
          add comment
        </button>
      </form>
    </div>
  )
}

export default commentForm