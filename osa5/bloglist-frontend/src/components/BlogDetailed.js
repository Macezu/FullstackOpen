import React from 'react'
const BlogDetail = ({blog})=> (
    <div>
        {blog.url}
        <br/>
        Likes: {blog.likes}
        <br/>
        {blog.author}
    </div>
)

export default BlogDetail