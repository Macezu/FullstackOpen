/* eslint-disable indent */

const notificationReducer = (state = {}, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      state = action.data
      return state
    case "CLEAR":
      state = ""
      return state
    default:
      return state
  }
}

export const createNotification = (msg, styleClass) => {
  return {
    type: "NEW_NOTIFICATION",
    data: {
      msg: msg,
      class: styleClass
    }
  }
}

export const clearNotification = () => {
  return { type: "CLEAR" }
}

export default notificationReducer
