const { ApolloServer, UserInputError, AuthenticationError, gql } = require("apollo-server")
const config = require("./utils/config")
const mongoose = require("mongoose")
const Book = require("./models/Book")
const Author = require("./models/Author")
const User = require("./models/User")
const jwt = require("jsonwebtoken")

const JWT_SECRET = "NEED_HERE_A_SECRET_KEY"

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

  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    userCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(username: String!, fGenre: String): User
    login(username: String!, password: String!): Token
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    userCount: () => User.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (Object.keys(args).includes("author")) {
        const author = await Author.findOne({ name: args.author })
        console.log(author)
        return Book.find({ author: author._id })
      }
      if (Object.keys(args).includes("genre"))
        return Book.find({ genres: { $in: [args.genre] } })
      return Book.find({})
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author)
      return {
        name: author.name,
        born: author.born
      }
    }
  },
  Author: {
    bookCount: (root) => Book.find({ author: root._id }).countDocuments() || 0 //books.filter((x) => x.author === root.name).length
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {      
        throw new AuthenticationError("not authenticated")    
      }

      const book = new Book({ ...args })
      let nAuthor = await Author.findOne({ name: args.author })
      if (!nAuthor) {
        nAuthor = new Author({ name: args.author, born: args.born || null })
        try {
          await nAuthor.save()
        } catch (error) {
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
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {     
       throw new AuthenticationError("not authenticated")    
      }
      
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
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
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.fGenre || null
      })

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      console.log(`USER ${user}`)
      if (!user || args.password !== "secret") {
        throw new UserInputError("wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
