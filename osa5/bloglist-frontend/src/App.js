import React,{ useState,useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'


const App = () => {
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [title,setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')
  const [blogs,setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [successMessage,setMessage] = useState(null)
  const [errorMessage,setError] = useState(null)

  useEffect(() => {
    blogService.getAll()
      .catch((error) => {
        console.log("Kissa")
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

  const handleCreate = async (event) => {
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
        setMessage(null)
      },3000)

    } catch (error) {
      setError(`Encountered an error: ${error}`)
      setTimeout(() => {
        setError(null)
      },3000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const createForm = () => (
    <form onSubmit={handleCreate}>
      <div>
        title
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

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



  if (user === null) {
    return (
      <div>
      <Error message={errorMessage} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification message={successMessage} />
      <Error message={errorMessage} />
      <h2>blogs</h2>
      <p>{user.name} logged in {logOut()}</p>
      <h3>Create New Blog</h3>
      {createForm()}
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App