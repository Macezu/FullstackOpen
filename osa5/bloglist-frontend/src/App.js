import React,{ useState,useEffect,useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Toggable'
import loginService from './services/login'
import blogService from './services/blogs'


const App = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')

  const [blogs,setBlogs] = useState([])
  const [newBlog,setNewBlog] = useState('')

  const [user,setUser] = useState(null)
  const [successMessage,setMessage] = useState(null)
  const [errorMessage,setError] = useState(null)

  const blogRef = useRef()

  useEffect(() => {
    blogService.getAll()
      .catch((error) => {
        setError(error)
      })
      .then(blogs =>
        setBlogs(blogs)
      )

  },[successMessage,errorMessage])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      try {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      } catch (error) {
        setError(error.statusText)
      }

    }
  },[])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser',JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setError(`Encountered an error: ${exception.statusText}`)
      setTimeout(() => {
        setError(null)
      },3000)
    }

  }

  const addLike = async (event) => {
    event.preventDefault()

    let likedObj = blogRef.current.getObj()
    likedObj.likes++

    let toBeUpdated = {
      'user': likedObj.user.id,
      'likes': likedObj.likes,
      'author': likedObj.author,
      'title': likedObj.title,
      'url': likedObj.url
    }

    console.log(toBeUpdated)


    try {
      await blogService.update(likedObj.id,toBeUpdated)
      setMessage("Liked!")
      setTimeout(() => [
        setMessage(null)
      ],2000)
    } catch (error) {
      setError(error)
      setTimeout(() => {
        setError(null)
      },2000)
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
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`${title} written by ${author} was added!`)
      setTimeout(() => {
        blogService
          .create(newBlog)
          .then(returnedBlog => {
            setBlogs(blogs.concat(returnedBlog))
            setNewBlog('')
          })
      },2000)

    } catch (error) {
      setError(`Encountered an error: ${error}`)
      setTimeout(() => {
        setError(null)
      },3000)
    }
  }

  const removeBlog = async (event) => {
    event.preventDefault()
    let likedObj = blogRef.current.getObj()
    let really = window.confirm(`Sure you want to delete ${likedObj.title}?`)


    if (really) {
      try {
        await blogService.remove(likedObj.id)
        setMessage("Removed succesfully")
        setTimeout(() => {
          setMessage(null)
        },2000)
      } catch (error) {
        setError(error)
        setTimeout(() => {
          setError(null)
        },2000)
      }
    }

  }



  const logOut = (event) => (
    <button type="submit" onClick={() => {
      window.localStorage.clear()
      setUser(null)
    }}> log out
    </button>
  )

  const Notification = ({ message }) => {
    return (message) ?
      <div className="success">
        {message}
      </div> :
      null
  }

  const Error = ({ message }) => {
    return (message) ?
      <div className="failure">
        {message}
      </div> :
      null
  }

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
    return <Blog key={blog.id} blog={blog} handleLikeClicked={addLike} handleRemoveClicked={removeBlog} ref={blogRef} />
  }





  return (
    <div>
      <h2>Blogs</h2>
      <Error message={errorMessage} />
      <Notification message={successMessage} />
      {user === null ?
        <div>
          {loginForm()}
        </div>
        :
        <div>
          <p>{user.name} logged in</p>
          {logOut()}
          <br></br><br></br>
          {blogForm()}
          {blogs.sort((y,x) => x.likes > y.likes).map(blog =>
            <li>{blogListed(blog)}</li>
          )}
        </div>
      }
    </div>
  )
}



export default App