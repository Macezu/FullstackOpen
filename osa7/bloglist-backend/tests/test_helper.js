const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        "title": "First Blog",
        "author": "Firmino First",
        "url": "www.firsttestcuzweneed.fi",
        "likes": 140
    },
    {
        "title": "Second Blog",
        "author": "Simon Second",
        "url": "www.secondisnoshame.fi",
        "likes": 90
    }
]

const initialUsers = []


const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon',date: new Date() })
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }

module.exports = {
    initialBlogs,
    initialUsers,
    nonExistingId,
    blogsInDb,
    usersInDb
}