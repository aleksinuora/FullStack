require('dotenv').config()

const dbug = process.env.DBUG

if (dbug) console.log('käynnistetään...')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')
const app = express()

morgan.token('postBody', (req) => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postBody'))
app.use(cors())

//backend-logiikka

app.get('/', (req, res) => {
  res.send('<h1>I changed the copypasted Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  if (dbug) console.log('gettaillaan puh-luettelo...')
  Person.find({}).then(persons => {
    if (dbug) console.log('löydettiin: ', persons)
    res.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  if (dbug) console.log(`gettaillaan id ${request.params.id}...`)
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  if (dbug) console.log('poistotesti')
  if (dbug) console.log(`yritetään poistaa id ${request.params.id}...`)
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      if (dbug) console.log('poistettiin(?)')
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons/', (request, response, next) => {
  if (dbug) console.log(`yritetään lisätä ${request.body.name}...`)
  if (!request.body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  if (!request.body.name) {
    return response.status(400).json({
      error: 'name missing'
    })
  }
  if (!request.body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  const person = new Person({
    name: request.body.name,
    number: request.body.number,
  })
  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  if (dbug) console.log('päivitetään henkilöä', request.body)
  const body = request.body

  const personNew = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, personNew, { new: true, runValidators: true })
    .then((updatedPerson) => {
      if (dbug) console.log('päivitettiin', updatedPerson.name)
      response.json(updatedPerson)
    })
    .catch((error) => next(error))
})

app.get('/info', (req, res) => {
  if (dbug) console.log('gettaillaan info-sivua...')
  const date = new Date()
  Person.count().then (numberOf => {
    if (dbug) console.log(numberOf)
    res.send(`<p>Phonebook has info for ${numberOf} people</p>
                    ${date}`)
  })
})

//errorHandler viimeiseksi middlewareksi
const errorHandler = (error, request, response, next) => {
  if (dbug) console.log('---------------käsitellään virhe:---------')
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformed id' })
  } else if (error.name === 'ValidationError') {
    if (dbug) console.log('saatiin ValidationError', error.message)
    return response.status(400).json({ error: error.message, type: error.name })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})