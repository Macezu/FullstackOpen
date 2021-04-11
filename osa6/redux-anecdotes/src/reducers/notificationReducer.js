let initialNotification = "Welcome young padawan!"
let cooldown

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

export const setNotification = (content, sec) => {
  clearTimeout(cooldown);
  
  return async (dispatch) => {
    dispatch({
      type: "NEW",
      data: content,
    })
    setTimeout(() => {
      dispatch({
        type: "RESTORE",
      })
    }, sec * 2)
  }
}

export default reducer
