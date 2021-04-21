var _ = require('lodash');

const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.map(a => a.likes).reduce((a,b) => a + b,0)
}

const favoriteBlog = (blogs) => {
  blogs.sort((a,b) => b.likes - a.likes)
  return blogs[0]
}

const mostBlogs = (blogs) => {
  let sorted = _.orderBy(blogs,"author","desc")
  let filtered = sorted.filter(a => a.author === sorted[0].author).map(a => a.author)
  //sorted.forEach(a => console.log(a.author))
  var obj = { "author": filtered[0],"blogs": filtered.length }
  return obj
}

const mostLikes = (blogs) => {
  let ordered = _.orderBy(blogs,['author','likes'],['desc','desc']);
  var arr = []
  let obj = { "author": ordered[0].author,"likes": 0 }
  ordered.forEach(ele => {
    if (ele.author === obj.author) {
      obj.likes += ele.likes
    } else {
      arr.push(obj)
      obj.author = ele.author
      obj.likes = 0
      obj.likes += ele.likes
    }
  });
  let orderedagain = _.orderBy(arr,'likes','desc');

  return orderedagain[0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}