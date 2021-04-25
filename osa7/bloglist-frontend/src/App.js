import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import User from "./components/User"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Toggable"
import Notification from "./components/Notification"
import {
  createNotification,
  clearNotification
} from "./reducers/notificationReducer"
import {
  getBlogs,
  addNewBlog,
  updateBlog,
  deleteBlog
} from "./reducers/blogReducer"
import { getAllUsers } from "./reducers/allUsersReducer"
import { initUser, logInUser, logOutUser } from "./reducers/userReducer"
import storage from "./utils/localstrg"
import { useSelector, useDispatch } from "react-redux"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const dispatch = useDispatch()
  const allBlogs = useSelector((state) => state.blog)
  const allUsers = useSelector((state) => state.users)
  const user = useSelector((state) => state.user)

  const blogRef = useRef()

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(initUser(user))
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllUsers())
    console.log(allUsers)
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(logInUser({ username, password }))
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatch(createNotification(exception.statusText, "failure"))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
    }
  }

  const handleUserClicked = (id) => {
    console.log(`ID: ${id}`)
  }

  const addLike = async (id) => {
    const foundObj = allBlogs.find((b) => b.id === id)
    foundObj.likes++

    try {
      dispatch(updateBlog(id, foundObj))
      dispatch(createNotification("Liked", "success"))
      setTimeout(() => [dispatch(clearNotification())], 2000)
    } catch (error) {
      dispatch(createNotification(error.response.data, "failure"))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 2000)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = {
        title,
        author,
        url
      }
      setTitle("")
      setAuthor("")
      setUrl("")
      dispatch(
        createNotification(
          `${title} written by ${author} was added!`,
          "success"
        )
      )
      setTimeout(() => {
        dispatch(clearNotification())
      }, 2000)
      dispatch(addNewBlog(newBlog))
    } catch (error) {
      dispatch(createNotification(error.response.data, "failure"))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
    }
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    let likedObj = blogRef.current.getObj()
    let really = window.confirm(`Sure you want to delete ${likedObj.title}?`)

    if (really) {
      try {
        dispatch(deleteBlog(likedObj.id))
        dispatch(createNotification("Removed succesfully", "success"))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 2000)
      } catch (error) {
        dispatch(createNotification(error.response.data, "failure"))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 2000)
      }
    }
  }

  const logOut = () => (
    <button
      type="submit"
      onClick={() => {
        dispatch(logOutUser())
        storage.logoutUser()
      }}
    >
      log out
    </button>
  )

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog">
      <BlogForm
        title={title}
        author={author}
        url={url}
        handleTitleChange={({ target }) => setTitle(target.value)}
        handleAuthorChange={({ target }) => setAuthor(target.value)}
        handleUrlChange={({ target }) => setUrl(target.value)}
        onSubmit={addBlog}
      />
    </Togglable>
  )

  const blogListed = (blog) => {
    return (
      <Blog
        key={blog.id}
        blog={blog}
        handleLikeClicked={addLike}
        handleRemoveClicked={removeBlog}
        ref={blogRef}
      />
    )
  }

  const userListed = (user) => {
    return (
      <User key={user.id} user={user} handleUserClicked={handleUserClicked} />
    )
  }

  const Home = () => (
    <div>
      {user === null ? (
        <div>{loginForm()}</div>
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {logOut()}
          <br></br>
          <br></br>
          {blogForm()}
          {allBlogs
            .sort((y, x) => x.likes > y.likes)
            .map((blog) => (
              <li key={blog.id}>{blogListed(blog)}</li>
            ))}
        </div>
      )}
    </div>
  )

  const Users = () => {
    if (!user) {
      return loginForm()
    }
    return (
      <>
        <div>
          <p>{user.name} logged in</p>
          {logOut()}
          {allUsers === null ? (
            <div>No Users Found</div>
          ) : (
            <div>
              <h3>Users</h3> <h5 style={{ marginLeft: 100 }}>blogs created</h5>
              {allUsers.map((user) => (
                <li key={user.id}>{userListed(user)}</li>
              ))}
            </div>
          )}
        </div>
      </>
    )
  }

  const UserDetailed = () => {
    const id = useParams().id
    const user = allUsers.find(n => n.id === id)
    console.log(`HHAHAHA ${user.blogs}`)
    if (!allUsers === null) {    return null  }
    return (
      <div>
        <h2>{user.name}</h2>
        <p>added blogs :{user.blogs.length}</p>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </div>
    )
  }

  return (
    <div>
      <Router>
        <div>
          <h2>Blogs</h2>
          <Notification />
        </div>
        <Switch>
          <Route path="/users/:id">
            <UserDetailed />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
