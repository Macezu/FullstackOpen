import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Text = ({headline2}) => ( <h2>{headline2}</h2>)

const PosButton = ({handleClick,text}) =>( <button onClick= {handleClick}>{text}</button>)

const NeutBtn = ({handleClick,text})=>( <button onClick={handleClick}>{text}</button>)

const BadBtn = ({handleClick,text}) => (<button onClick={handleClick}>{text}</button>)

const Statistics = ({text,value,prcnt}) => (<p>{text} {value} {prcnt}</p>)



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total,setTotal] = useState(0)
  const [positive,setPos] = useState(0)

  const setToValue = (newVal,setW,isPositive) =>{
    setTotal(total +1)
    if (isPositive){
      setPos(positive +1)
    }
    setW(newVal)
  }
  


 
  if (total >0){
    return (
      <>
      <Text headline2="GIVE FEEDBACK"/>
      <PosButton handleClick={() => setToValue(good +1,setGood,true)} text="good"/>
      <NeutBtn handleClick={() => setToValue(neutral +1,setNeutral,false)}text="neutral"/>
      <BadBtn handleClick={() => setToValue(bad +1,setBad,false)}text="bad"/>
      <Text headline2="Statistics"/>
      <Statistics text="good" value={good}/>
      <Statistics text="neutral" value={neutral}/>
      <Statistics text="bad" value={bad}/>
      <Statistics text="all" value= {total}/>
      <Statistics text="average" value={(good+(-bad))*1.0/total}/>
      <Statistics text="positive" value={(positive*1.0)/total*100} prcnt="%"/>
      </>
    )
  } else {
    return (
      <>
      <Text headline2="GIVE FEEDBACK"/>
      <PosButton handleClick={() => setToValue(good +1,setGood,true)} text="good"/>
      <NeutBtn handleClick={() => setToValue(neutral +1,setNeutral,false)}text="neutral"/>
      <BadBtn handleClick={() => setToValue(bad +1,setBad,false)}text="bad"/>
      <Text headline2="Statistics"/>
      <Statistics text="no feedback given" value=""/>
      </>
    )
  }

  
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)