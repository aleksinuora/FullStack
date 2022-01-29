import React, { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react/cjs/react.production.min'

const dbug = true

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPhrase, setFilter] = useState('')
  const [eventMessage, setEventMessage] = useState(null)
  const [messageType, setMessageType] = useState(true)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  useEffect(() => {
    if (dbug) console.log('hakee...')
    personService
      .getAll()
        .then(dataObject => {
          if (dbug) console.log('löytyi:', dataObject)
          setPersons(dataObject)
        })
  }, [])

  const flashMessage = (message, success) => {
    setMessageType(success)
    setEventMessage(message)
    setTimeout(() => {
      setEventMessage(null)
    }, 3000)
  }
  

  const addName = (event) => {
    event.preventDefault()
    if (dbug) console.log('lisätään arvoa', event.target)
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.some(person => person.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, 
                      replace number?`)) {
        if (dbug) console.log('päivitetään numeroa...')
        const id = persons.find(p => p.name === newName).id
        personService
          .update(id, personObject)
            .then(returnedPerson => {
              setPersons(persons.filter(p => p.id !== id).concat(returnedPerson))
              setNewName('')
              setNewNumber('')
              flashMessage(`Number updated to ${returnedPerson.number} for ${returnedPerson.name}`, true)
            })
            .catch(error => {
              setPersons(persons.filter(p => p.id !== id))
              flashMessage(`Error: Looks like ${personObject.name} was already deleted`, false)
            })
      } else {
        if (dbug) console.log('lisäys peruttu')
      }
    } else {
      personService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setMessageType(true)
            flashMessage(`${returnedPerson.name} added to phonebook`, true)
          })

      }
    }

  const deletePerson = id => {
    if (window.confirm('Are you sure you want to remove this name?')) {
      if (dbug) console.log(`poistetaan arvolla id:${id}...`)

      personService
        .deleteName(id)
          .then(() => {
            setPersons(persons.filter(p => p.id !== id))
            setMessageType(true)
            flashMessage(`Name succesfully removed from phonebook`, true)
            })
      
      if (dbug) console.log('poisto näytti onnistuneen')
    } else {
      if (dbug) console.log('käyttäjä perui poiston')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterPhrase={filterPhrase} handleFilterChange={handleFilterChange}/>
      <h2>add a new person</h2>
      <AddForm addName={addName} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
      <Notification message={eventMessage} success={messageType}/>
      <h2>Numbers</h2>
        <RenderBook persons={persons} filterPhrase={filterPhrase}
          deletePerson={deletePerson}/>
    </div>
  )
}

const Notification = ({ message, success }) => {
  if (message === null) {
    return null
  }

  const textColor = success ? 'green'
                            : 'red'

  const notificationStyle = {
    color: textColor,
    backgroundColor: 'yellow',
    fontSize: 20,
    border: '5px solid',
    padding: 10,
    marginBottom: 10
  }


  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const Filter = (props) => {
  return (
    <>
    show names containing: 
    <input
      value={props.filterPhrase}
      onChange={props.handleFilterChange}
      />
    </>
  )
}

const AddForm = (props) => {
  return (
    <form onSubmit={props.addName}>
        <div>
          name: <input 
                  value={props.newName}
                  onChange={props.handleNameChange}/>
        </div>
        <div>
          number: <input
                    value={props.newNumber}
                    onChange={props.handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}


const RenderBook = ({ persons, filterPhrase, deletePerson }) => {
  const people = (filterPhrase === '')
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase()
                    .includes(filterPhrase.toLowerCase()))
  return (
    <div>
    {people.map(person =>
      <p key={person.id}>
        {person.name} {person.number}
        <button onClick={() => {
          if (dbug) console.log(`kutsutaan deletePerson(${person.id})...`)
          deletePerson(person.id)
          }}>delete</button>
      </p>
      )}
    </div>
  )
}

export default App