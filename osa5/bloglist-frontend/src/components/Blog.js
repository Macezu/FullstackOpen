
import React,{ useState,useImperativeHandle } from "react"

const Blog = React.forwardRef((props,ref) => {
  const [visible,setVisible] = useState(false)

  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const getObj = () => {
    return props.blog
  }


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const btnStyle = {
    "borderRadius": 12,
    "borderColor": "#4CAF50"
  }

  const btnRStyle = {
    "borderRadius": 12,
    "color": " #fefcfc ",
    "backgroundColor": "#990f02"
  }

  useImperativeHandle(ref,() => {
    return { getObj }
  })

  return (
    <div style={blogStyle}>
      <div>
        {props.blog.title} {props.blog.author} <button style={btnStyle} onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible}>
        {props.blog.url}
        <br />
        Likes: {props.blog.likes} <button style={btnStyle} onClick={props.handleLikeClicked} >likes</button>
        <br />
        {props.blog.user.name}
        <br />
        <button style={btnRStyle} onClick={props.handleRemoveClicked}>Remove</button>
      </div>
    </div>
  )

})

Blog.displayName = "Blog"

export default Blog