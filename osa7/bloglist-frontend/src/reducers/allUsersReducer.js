/* eslint-disable indent */

import usersService from "../services/users"

const allUserReducer = (state = [], action) => {
  switch (action.type) {
    case "INITALLUSERS":
      return action.data
    default:
      return state
  }
}

export const getAllUsers = () => {
  return async (dispatch) => {
      const request = await usersService.getAUsers()
      dispatch({
        type : "INITALLUSERS",
        data : request
      })
  }
}

export default allUserReducer
