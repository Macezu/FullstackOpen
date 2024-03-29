const blogsRouter = require("express").Router()
const { request } = require("express")
const jwt = require("jsonwebtoken")
const Blog = require("../models/blog")
const User = require("../models/user")
const Comment = require("../models/comment")
const logger = require("../utils/logger")
const userExtractor = require("../utils/middleware").userExtractor
const blog = require("../models/blog")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 }).populate("comments",{content:1})
  response.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog.toJSON())
  } else {
    response.status(404).end()
  }
})

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(blog)
})

blogsRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body

  try {
    const user = request.user
    if (body.title || body.url !== undefined) {
      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
      })

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.json(savedBlog.toJSON())
    } else response.status(401).end()
  } catch (error) {
    return response.status(401).json({ error: "token missing or invalid" })
  }
})

blogsRouter.delete("/:id", userExtractor, async (req, res) => {
  try {
    const user = req.user
    const blog = await Blog.findById(req.params.id)
    if (blog.user.toString() === user.id.toString()) {
      await Blog.findByIdAndRemove(req.params.id)
      res.status(204).end()
    } else {
      res.status(401).json({ error: "wrong user tried to remove" })
    }
  } catch (error) {
    res.status(404).end()
  }
})

blogsRouter.get("/comments", async (request, response) => {
  const comments = await Comment.find({}).populate("blog",{"title" : 1})
  console.log(comments)
  response.json(comments.map((blog) => blog.toJSON()))
})

blogsRouter.post("/:id/comments", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    const body = req.body

    if (body.content !== undefined) {
      const comment = new Comment({
        content: body.content,
        blog : body.id

      })

      const savedComment = await comment.save()
      blog.comments = blog.comments.concat(savedComment._id)
      const savedBlog = await blog.save()

      res.json(savedComment.toJSON())
    }

  } catch (error) {
    res.status(401).end()
  }
})



module.exports = blogsRouter
