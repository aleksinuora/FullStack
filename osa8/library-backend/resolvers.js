const { PubSub } = require('graphql-subscriptions')
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const DBUG = true

const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (DBUG) console.log('fetching books, args:', args)
      let library = await Book.find({}).populate('author')
      if (args.author) {
        library = library.filter((book) => book.author.name === args.author)
      }
      if (args.genre && args.genre !== 'none') {
        library = library.filter((book) => book.genres.includes(args.genre))
      }
      if (DBUG) {
        let dbugString = library.map((book) => book.title)
        console.log(dbugString)
      }
      return library
    },
    allAuthors: async () => Author.find({}),
    allUsers: async () => User.find({}),
    me: async (root, args, context) => {
      if (DBUG) console.log('returning user:', context.currentUser)
      return await context.currentUser
    },
  },
  Author: {
    bookCount: async ({ name }) => {
      const author = await Author.findOne({ name: name })
      return (await Book.find({ author: author._id })).length
    },
    name: (root) => root.name,
    id: (root) => root.id,
    born: (root) => root.born,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { currentUser } = context

      if (DBUG) console.log('adding book', args)
      if (DBUG) console.log('authenticated?', currentUser)

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      let bookCopy = await Book.findOne({ title: args.title })

      if (bookCopy) {
        throw new GraphQLError('Title must be unique', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
          },
        })
      }

      let findAuthor = await Author.findOne({ name: args.author })
      if (DBUG) console.log('found author', findAuthor)

      if (!findAuthor) {
        console.log('creating author', args.author)
        try {
          findAuthor = new Author({ name: args.author })

          await findAuthor.save()
          findAuthor = await Author.findOne({ name: args.author })
        } catch (error) {
          throw new GraphQLError('Creating author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error,
            },
          })
        }
      }

      const book = new Book({ ...args, author: { ...findAuthor } })
      try {
        if (DBUG) console.log('saving book:', book)
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (DBUG) console.log('editing author as', currentUser)

      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving birth year failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error,
          },
        })
      }
      return author
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })

      return user.save().catch((error) => {
        throw (
          (new GraphQLError('Creating new user failed'),
          {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error,
            },
          })
        )
      })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      if (!user || args.password !== 'secret') {
        throw (
          (new GraphQLError('Bad credentials'),
          {
            extensions: {
              code: 'BAD_USER_INPUT',
            },
          })
        )
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      if (DBUG) console.log('logged in', user.username)

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = resolvers
