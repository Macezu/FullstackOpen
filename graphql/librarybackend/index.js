const { ApolloServer, UserInputError, gql } = require("apollo-server")
const config = require("./utils/config")
const mongoose = require("mongoose")
const Book = require("./models/Book")
const Author = require("./models/Author")
const { v1: uuid } = require("uuid")

console.log("connecting to", config.MONGODB_URI)

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message)
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
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    addAuthor(name: String!, born: Int): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (root, args) => {
      if (Object.keys(args).includes("author"))
        return Book.find({ author: { $in: [args.author] } })
      //books.filter((a) => a.author === args.author)
      if (Object.keys(args).includes("genre"))
        return Book.find({ genres: { $in: [args.genre] } })
      //books.filter((a) => a.genres.includes(args.genre))
      else {
        let books = Book.find({})
        return books
      }
    },
    allAuthors: () => Author.find({})
  },
  Book: {
    author: (root) => {
      const author = Author.findById({ name: root.author })
      console.log(author)
      return {
        name: author.name,
        born: author.born
      }
    }
  },
  Author: {
    bookCount: (root) => Book.find({ author: root.name }).countDocuments() //books.filter((x) => x.author === root.name).length
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args })
      let nAuthor = await Author.findOne({ name: args.author })
      if (!nAuthor) {
        nAuthor = new Author({ name: args.author })
        console.log(nAuthor)
        try {
          await nAuthor.save()
        } catch (error) {
          console.log(error)
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }
      try {
        book.author = nAuthor._id
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.born
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return author
    },
    addAuthor: async (root, args) => {
      let author = await Author.findOne({ author: args.name })
      if (!author) {
        author = new Author({ ...args })
        try {
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
        return author
      }
      return author
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
