require('dotenv').config()
const dbug = process.env.DBUG

const mongoose = require('mongoose')

if (dbug) process.argv.map(argument => console.log(argument))

if (process.argv.length<3) {
  process.exit(1)
}

if (dbug) console.log(process.env.DB_URI)
const url = process.env.DB_URI
//`mongodb+srv://fullstack:${password}@cluster0.0qyle.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length===3) {
  console.log('Phonebook:')
  Person.find({}).then(result => {
    result.forEach(p => {
      console.log(p.name, p.number)
    })
    mongoose.connection.close()
    process.exit(1)
  })
} else {
  if (dbug) console.log('loppuiko?', process.argv.length)

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
  })

  person.save().then(() => {
    console.log('tallennettu')
    mongoose.connection.close()
  })
}