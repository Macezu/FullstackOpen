/* eslint-disable indent */

import loginService from "../services/login"

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "INIT":
      return action.data
    case "LOGIN":
      return action.data
    case "LOGOUT":
      return (state = {})
    default:
      return state
  }
}

export const initUser = (user) => {
  return {
    type: "INIT",
    data: user
  }
}

export const logInUser = (credentials) => {
  return async (dispatch) => {
    const response = await loginService.login(credentials)
    dispatch({
      type: "LOGIN",
      data: response
    })
  }
}

export const logOutUser = () => {
  return {
    type: "LOGOUT"
  }
}

export default userReducer
