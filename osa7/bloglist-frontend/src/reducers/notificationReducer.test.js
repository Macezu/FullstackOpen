import notificationReducer from "./notificationReducer.test"
import deepFreeze from "deep-freeze"

describe("noteReducer", () => {
  test("returns new state with action NEW_NOTE", () => {
    const state = []
    const action = {
      type: "NEW_NOTIFICATION",
      data: "kissa",
    }

    deepFreeze(state)
    const newState = notificationReducer(state, action)
    expect(newState).toContainEqual(action.data)
  })
})
