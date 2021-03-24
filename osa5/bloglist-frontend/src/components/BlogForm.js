import React from 'react'

const BlogForm = ({
  onSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url
}) => {
  return (
    <div>
      <h3>Create New Blog</h3>
      <form onSubmit={onSubmit}>
        title
        <input
          value={title}
          onChange={handleTitleChange}
        />
        <br></br>
        author
        <input
          value={author}
          name="Author"
          onChange={handleAuthorChange}
        />
        <br></br>
        url
          <input
          value={url}
          name="Url"
          onChange={handleUrlChange}
        />
        <br></br>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm

