import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import userReducer from "./reducers/userReducer"
import allUsersReducer from "./reducers/allUsersReducer"
import commentReducer from "./reducers/commentReducer"


const reducer = combineReducers({
  notification: notificationReducer,
  blog : blogReducer,
  user : userReducer,
  users : allUsersReducer,
  comments : commentReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
