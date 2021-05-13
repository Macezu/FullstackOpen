const { ApolloServer, UserInputError, gql } = require("apollo-server")
const config = require('./utils/config')
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')
const { v1: uuid } = require("uuid")


console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => {
      if (Object.keys(args).includes("author"))
        return books.filter((a) => a.author === args.author)
      if (Object.keys(args).includes("genre"))
        return books.filter((a) => a.genres.includes(args.genre))
      else return Book.find({})
    },
    allAuthors: () => Author.find({})
  },
  Book: {
    author: (root) => {
      return {
        name: root.name,
        born: root.born
      }
    }
  },
  Author: {
    bookCount: (root) => books.filter((x) => x.author === root.name).length
  },
  Mutation: {
    addBook: (root, args) => {
      const book = new Book({...args})
      const author = authors.find((a) => a.name === args.author)
      if (!author) {
        author = new Author({ name: args.author, born: null })
        author.save()
      }
      return book.save()
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      if (!author) {
        return null
      }
      author.born = args.born
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
