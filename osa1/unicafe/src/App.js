import React, { useState } from 'react'

const App = () => {
  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        handleClick={() => setGood(good+1)}
        text='good'
      />
      <Button
        handleClick={() => setNeutral(neutral+1)}
        text='neutral'
      />
      <Button
        handleClick={() => setBad(bad+1)}
        text='bad'
      />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
      />
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

// Produce statistics as individual lines. Used up to ex. 1.10.
const StatisticLine = (props) => {
  return (
    <>
    {props.text} {props.value}<br/>
    </>
  )
}

// Produce statistics as rows. Used for ex. 1.11.
const StatisticRow = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}


const Statistics = ({ good, neutral, bad }) => {
  const sumOfAll = good+neutral+bad
  const average = sumOfAll / 3
  const positive = good / 3

  if (sumOfAll == 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  else return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticRow text={'good'} value={good}/>
          <StatisticRow text={'neutral'} value={neutral}/>
          <StatisticRow text={'bad'} value={neutral}/>
          <StatisticRow text={'all'} value={sumOfAll}/>
          <StatisticRow text={'average'} value={average}/>
          <StatisticRow text={'positive'} value={positive}/>
        </tbody>
      </table>
    </div>
  )
}

export default App