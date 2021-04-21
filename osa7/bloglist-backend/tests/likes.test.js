const listHelper = require('../utils/list_helper')

describe('totalLikes',() => {

    const listWithMultipBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '5a422aa71b54a676485d17f8',
            title: 'Fantastic Life',
            author: 'Cajun M. Pepper',
            url: 'http://www.blogspot.com/CajunP',
            likes: 2,
            __v: 0
        }

    ]

    test('multiple likes added together?',() => {
        const result = listHelper.totalLikes(listWithMultipBlog)
        expect(result).toBe(7)
    })

    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog equals the likes of that',() => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })


    test('empty list of blogs is zero?',() => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

});

