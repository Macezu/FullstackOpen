/* eslint-disable indent */

import blogService from "../services/blogs"

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case "INITCOMMENTS":
      return action.data
    case "ADDCOMMENT":
      return [...state, action.data]
    default:
      return state
  }
}

export const InitComments = (data) => {
  console.log(data)
  return {
    type: "INITCOMMENTS",
    data : data
  }
}

export const addComment = (textObj) => {
  return async (dispatch) => {
    const response = await blogService.comment(textObj)
    dispatch({
      type: "ADDCOMMENT",
      data: response
    })
  }
}


export default commentReducer
