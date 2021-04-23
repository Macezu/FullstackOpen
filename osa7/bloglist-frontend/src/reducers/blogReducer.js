/* eslint-disable indent */

import blogService from "../services/blogs"

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT":
      state = action.data
      return state
    case "NEWBLOG":
      return [...state, action.data]
    case "DELETEBLOG":
      return state.filter((x) => x.id !== action.id)
    case "LIKE": {
      const liked = action.data
      return state.map((a) => (a.id === liked.id ? liked : a))
    }
    default:
      return state
  }
}

export const getBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll()
    dispatch({
      type: "INIT",
      data: response
    })
  }
}

export const addNewBlog = (newBlog) => {
  return async (dispatch) => {
    const response = await blogService.create(newBlog)
    dispatch({
      type: "NEWBLOG",
      data: response
    })
  }
}

export const updateBlog = (id, updateObj) => {
  return async (dispatch) => {
    const response = await blogService.update(id, updateObj)
    dispatch({
      type: "LIKE",
      data : response,
    })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const response = await blogService.remove(id)
    dispatch({
      type: "DELETEBLOG",
      id: id,
      data: response
    })
  }
}

export const setToken = () => {
  blogService.setToken()
}

export default blogReducer
