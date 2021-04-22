/* eslint-disable indent */

import blogService from "../services/blogs"




const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT":
      state = action.data
      return state
    case "NEWBLOG":
      return [...state,action.data]
    case "DELETEBLOG":
      return state
    default:
      return state
  }
}

export const getBlogs = () => {
    return async dispatch => {
        const response =  await blogService.getAll()
        dispatch({
            type : "INIT",
            data : response
        })
    }
}

export const addNewBlog = newBlog => {
    return async dispatch => {
        const response = blogService.create(newBlog)
        dispatch({
            type: "NEWBLOG",
            data : response
        })
    }
}

export default blogReducer
