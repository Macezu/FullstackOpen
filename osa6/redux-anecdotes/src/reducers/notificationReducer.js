let initialNotification = "Welcome young padawan!"

const reducer = (state = initialNotification, action) => {
  console.log("state now: ", state)
  console.log("action", action)
  switch (action.type) {
    case "NEW":
      return `${action.data} has been added`
    case "LIKED":
      return `${action.data} has been liked by someone`
    case "RESTORE":
      return initialNotification
    default:
      return state
  }
}

export const newNotification = (content) => {
  return {
    type: "NEW",
    data: content,
  }
}

export const likedNotification = (content) => {
  return {
    type: "LIKED",
    data: content,
  }
}

export const restoreNotification = () => {
  return { type: "RESTORE" }
}

export default reducer
