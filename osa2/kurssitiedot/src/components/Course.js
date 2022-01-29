import React from 'react'
// set to true to turn on console logs
const dbug = true

const Header = ({ course }) => {
  return (
    <>
      <h2>{course.name}</h2>
    </>
  )
}

const Total = ({ parts }) => {
  const exList = parts.map(part => part.exercises)
  if (dbug) console.log(exList)
  const exSum = exList.reduce((prev, next) => prev + next)
  if (dbug) console.log(exSum)

  return (
    <>
      <b>
        Total number of exercises {exSum}
      </b>
    </>
  )
}

const Course2 = ({ course, parts }) => {
  if (dbug) console.log('Course2')
  return (
    <div>
      <Header course={course}/>
      <ul>
        {parts.map(part => 
          <li key={part.id}>
            {part.name} {part.exercises}
          </li>
        )}
      </ul>
      <Total parts={course.parts}/>
    </div>
  )
}

const Course = ({ courses }) => {
  if (dbug) console.log('main loop', courses)
  return (
    <div>
      {courses.map(course => 
      <Course2 key={course.id} course={course} parts={course.parts}/>
      )}    
    </div>
  )
}

export default Course