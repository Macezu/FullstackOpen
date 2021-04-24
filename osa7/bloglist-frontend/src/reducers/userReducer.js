/* eslint-disable indent */

import loginService from "../services/login"
import storage from "../utils/localstrg"

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "INITUSER":
      return action.data
    case "LOGIN":
      return action.data
    case "LOGOUT":
      return null
    default:
      return state
  }
}

export const initUser = (user) => {
  return {
    type: "INITUSER",
    data: user
  }
}

export const logInUser = (credentials) => {
  return async (dispatch) => {
    const response = await loginService.login(credentials)
    storage.saveUser(response)
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
