import React from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"



export const blogListed = (blog) => {
  return <Blog key={blog.id} blog={blog} />
}

const commentsListed = (comment) => {
  return <Comment key={comment.id} comment={comment} />
}


const Comment = ({ comment }) => {
  return <div>{comment.content}</div>
}



export const BlogDetailed = ({ handleLikeClicked, handleRemoveClicked, commentForm }) => {
  const allBlogs = useSelector((state) => state.blog)
  const allComments = useSelector((state) => state.comments)

  const btnStyle = {
    borderRadius: 12,
    borderColor: "#4CAF50"
  }

  const btnRStyle = {
    borderRadius: 12,
    color: " #fefcfc ",
    backgroundColor: "#990f02"
  }

  const id = useParams().id
  const blog = allBlogs.find((x) => x.id === id)
  const comments = allComments.filter((x) => x.blog === blog.id)
  console.log(allComments)
  console.log(comments)
  if (!allBlogs === null) {
    return null
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <br />
      Likes: {blog.likes}{" "}
      <button style={btnStyle} onClick={() => handleLikeClicked(id)}>
        likes
      </button>
      <br />
      {blog.user.name}
      <br />
      <button
        className="removeBlog"
        style={btnRStyle}
        onClick={() => handleRemoveClicked(id)}
      >
        Remove
      </button>
      <div>
        <br /> <br />
        <h4>Comments</h4>
        {commentForm(id)}
        {comments === null ? (
          <br />
        ) : (
          comments.map((comment) => (
            <li key={comment.id}>{commentsListed(comment)}</li>
          ))
        )}
      </div>
    </div>
  )
}

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className="blog" style={blogStyle}>
      <div>
        <Link to={`blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  )
}

export default Blog
