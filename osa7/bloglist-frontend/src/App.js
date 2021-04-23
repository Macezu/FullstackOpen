import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Toggable"
import Notification from "./components/Notification"
import { createNotification, clearNotification } from "./reducers/notificationReducer"
import { getBlogs , addNewBlog , updateBlog , deleteBlog , setToken } from "./reducers/blogReducer"
import {  initUser, logInUser , logOutUser } from "./reducers/userReducer"
import { useSelector, useDispatch } from "react-redux"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")



  const dispatch = useDispatch()
  const allBlogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)

  const blogRef = useRef()

  useEffect(() => {
    dispatch(getBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON)
        dispatch(initUser(user))
        dispatch(setToken(user.token))
      } catch (error) {
        dispatch(createNotification(error, "failure"))
      }
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await dispatch(logInUser({
        username,
        password
      }))
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      dispatch(logInUser(user))
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatch(createNotification(exception.statusText, "failure"))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
    }
  }

  const addLike = async (id) => {


    const foundObj = allBlogs.find((b) => b.id === id)
    foundObj.likes++

    try {
      dispatch(updateBlog(id, foundObj))
      dispatch(createNotification("Liked", "success"))
      setTimeout(() => [dispatch(clearNotification())], 2000)
    } catch (error) {
      dispatch(createNotification(error.response.data,"failure"))
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
        window.localStorage.clear()
        dispatch(logOutUser)
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

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
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
}

export default App
