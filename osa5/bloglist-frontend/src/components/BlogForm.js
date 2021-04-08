import React from "react"

const BlogForm = ({
  onSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url,
}) => {
  return (
    <div className="formDiv">
      <h3>Create New Blog</h3>
      <form onSubmit={onSubmit}>
        title
        <input
          id="addTitle"
          value={title}
          name="Title"
          onChange={handleTitleChange}
        />
        <br></br>
        author
        <input id="addAuthor" value={author} name="Author" onChange={handleAuthorChange} />
        <br></br>
        url
        <input id="addUrl" value={url} name="Url" onChange={handleUrlChange} />
        <br></br>
        <button id="saveBlog" type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm
