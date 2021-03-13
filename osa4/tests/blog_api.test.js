const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { response } = require('express')
let token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjYwNGNmMjY0YmRmYTdlNmRkYzIwNDA5OCIsImlhdCI6MTYxNTY1NTUyNCwiZXhwIjoxNjE1NjU5MTI0fQ.w0lmtWVcerq8HFY2X0dG-lDBI_4sfbgUsMPpOVIK7hg'

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
    console.log('cleared')

    const passwordHash = await bcrypt.hash('sekret',10)
    const user = new User({ username: 'root',passwordHash })
    await user.save()


    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)


    console.log('done')
})



describe('Basic checking',() => {
    test('blogs are returned as json',async () => {
        console.log('entered test')
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type',/application\/json/)
            .catch((error) => console.log(error))
    })

    test('all Blogs are returned',async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('all Users are returned ',async () => {
        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(helper.initialUsers.length)
    })


    test('a specific blog is within the returned Blogs',async () => {
        const response = await api.get('/api/blogs')

        const titles = response.body.map(r => r.title)
        expect(titles).toContain(
            'Second Blog')
    })

    test('id is in correct format ',async () => {
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd[0].id).toBeDefined()
    })
});

describe('Login',() => {
    test('user should log in',async () => {

        const usersAtStart = await helper.usersInDb()
        //604cef5afa4d9468e455eed9

        var user = {
            "username": "root",
            "password": "sekret"
        }

        console.log(user)
        await api
            .post('/api/login/')
            .send(user)
            .expect(200)
    })

});




describe('POST blogs',() => {
    test('a valid blog can be added',async () => {

        var userobj = {
            "username": "root",
            "password": "sekret"
        }


        const response = await api.get('/api/login',userobj)
    

        const newBlog = {
            "title": "Test Blog",
            "author": "Timothy Tester",
            "url": "www.wetestcuzweneed.fi",
            "likes": 540,
        }


        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization',token)
            .expect(200)
            .expect('Content-Type',/application\/json/)




        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        const titles = blogsAtEnd.map(n => n.title)
        expect(titles).toContain(
            'Test Blog'
        )
    })



    test('Blog without user is not added',async () => {
        const newBlog = {
            thiscantbeAccepted: true,
            "user": ""
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization',token)
            .expect(401)

    })

    test('Blog without likes defaults to zero ',async () => {
        const newBlog = {
            "title": "I dont have likes",
            "author": "Unpopular Untamo",
            "url": "www.pressFtopayrescpects.fi",
            "user": "604b4efba0a05f10709371c8"
        }


        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization',token)
            .expect(200)
            .expect('Content-Type',/application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        const likes = blogsAtEnd.map(n => n.likes)
        const zero = likes[likes.length - 1]
        expect(zero === 0)
    })

});


describe('PUT blogs',() => {
    test('blog updates accordingly',async () => {
        const response = await api.get('/api/blogs')
        const duplicate = response.body[0]
        duplicate.likes = 666

        await api
            .put(`/api/blogs/${duplicate.id}`)
            .send(duplicate)
            .expect(200)
            .expect('Content-Type',/application\/json/)

    });
});





afterAll(() => {
    mongoose.connection.close()
})