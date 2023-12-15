import { useState } from 'react'

const Stats = ({text, allClicks, text1}) => (
  <tr>
    <td>{text}</td>
    <td>{allClicks}{text1}</td>
  </tr>
)

const Display = ({text}) => <h1>{text}</h1>

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // enregistrer les clics de chaque bouton dans un état différent
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const totalClicks = good + neutral + bad

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  let statsContent = (
    <>
    <table>
      <tbody>
        <Stats text='Good' allClicks={good}/>
        <Stats text='Neutral' allClicks={neutral}/>
        <Stats text='Bad' allClicks={bad}/>
        <Stats text='All' allClicks={totalClicks}/>
        <Stats text='Average' allClicks={((1*good + 0*neutral + (-1*bad))/totalClicks)}/>
        <Stats text='Positive' allClicks={(good*100)/totalClicks} text1='%'/>
      </tbody>
    </table>
    </>
  )

  if (totalClicks === 0) {
    statsContent = <div>No feedback given</div>
  }

  return (
    <div>
      <Display text='Give feedback'/>
      <Button handleClick={handleGoodClick} text='Good'/>
      <Button handleClick={handleNeutralClick} text='Neutral'/>
      <Button handleClick={handleBadClick} text='Bad'/>
      <Display text='Statistics'/>
      {statsContent}
    </div>
  )
}

export default App
