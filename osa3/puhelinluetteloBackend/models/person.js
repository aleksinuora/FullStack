require('dotenv').config()
const dbug = process.env.DBUG

const mongoose = require('mongoose')

if (dbug) console.log('haetaan tietokannasta', process.env.DB_URI)
const url = process.env.DB_URI
//    `mongodb+srv://fullstack:${password}@cluster0.0qyle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error while connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'Name required']
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        return /(\d{2}-\d{6,})|(\d{3}-\d{5,})/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'Phone number required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)