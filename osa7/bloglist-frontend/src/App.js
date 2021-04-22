import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Toggable"
import Notification from "./components/Notification"
import loginService from "./services/login"
import blogService from "./services/blogs"
import {
  createNotification,
  clearNotification
} from "./reducers/notificationReducer"
import { useSelector, useDispatch } from "react-redux"

const App = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [blogs, setBlogs] = useState([])
  const [, setNewBlog] = useState("")

  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const notification = useSelector((state) => state)

  const blogRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .catch((error) => {
        dispatch(createNotification(error, "failure"))
      })
      .then((blogs) => setBlogs(blogs))
  }, [notification])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      } catch (error) {
        dispatch(createNotification(error, "failure"))
      }
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))
      setUser(user)
      setUsername("")
      setPassword("")
    } catch (exception) {
      dispatch(createNotification(exception.statusText, "failure"))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
    }
  }

  const addLike = async (event) => {
    event.preventDefault()

    let likedObj = blogRef.current.getObj()
    likedObj.likes++

    let toBeUpdated = {
      user: likedObj.user.id,
      likes: likedObj.likes,
      author: likedObj.author,
      title: likedObj.title,
      url: likedObj.url
    }

    console.log(toBeUpdated)

    try {
      await blogService.update(likedObj.id, toBeUpdated)
      dispatch(createNotification("Liked", "success"))
      setTimeout(() => [dispatch(clearNotification())], 2000)
    } catch (error) {
      dispatch(createNotification(error))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 2000)
      console.log(error)
    }
  }

  const addBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title,
        author,
        url
      })
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
        blogService.create(newBlog).then((returnedBlog) => {
          setBlogs(blogs.concat(returnedBlog))
          setNewBlog("")
        })
      }, 2000)
    } catch (error) {
      dispatch(createNotification(error, "failure"))
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
        await blogService.remove(likedObj.id)
        dispatch(createNotification("Removed succesfully", "success"))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 2000)
      } catch (error) {
        dispatch(createNotification(error, "failure"))
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
        setUser(null)
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
          {blogs
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
