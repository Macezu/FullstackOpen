/* eslint-disable indent */

import blogService from "../services/blogs"

const commentReducer = (state = [], action) => {
  switch (action.type) {
    case "INITCOMMENTS":
      return (state = action.data)
    case "ADDCOMMENT":
      return [...state, action.data]
    default:
      return state
  }

}

export const getComments = () => {
    return async (dispatch) => {
      const response = await blogService.getComments()
      console.log(`response ${response}`)
      dispatch({
        type: "INITCOMMENTS",
        data: response
      })
    }
  }


export const addComment = (textObj) => {
    return async (dispatch) => {
      const response = await blogService.comment(textObj)
      dispatch({
        type : "ADDCOMMENT",
        data : response
      })
    }
  }

export default commentReducer
