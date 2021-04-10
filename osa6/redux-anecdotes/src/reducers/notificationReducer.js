let initialNotification = "Welcome young padawan!"

const reducer = (state = initialNotification, action) => {
  switch (action.type) {
    case "NEW":
      return `${action.data}`
    case "RESTORE":
      return initialNotification
    default:
      return state
  }
}

export const setNotification = (content, timeout) => {
  return async (dispatch) => {
    dispatch({
      type: "NEW",
      data: content,
    })
    setTimeout(() => {
      dispatch({
        type: "RESTORE",
      })
    }, timeout)
  }
}

export default reducer
