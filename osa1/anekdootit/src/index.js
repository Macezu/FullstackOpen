import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick,text}) =>( <button onClick={handleClick}>{text}</button>)

const MVP = ({mvotes,anecdotesl})=>{
  let highest = 0
  let inx = 0
  const keys = Object.keys(mvotes)
  keys.forEach((key,index) =>{
    if (highest < mvotes[key]){
      highest = mvotes[key]
      inx = index
    }
  })
  return <p>{anecdotes[inx]}</p>
}

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(anecdotes[0])
  const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4:0, 5:0})
  const [rands, setRand] = useState(0)
  const length = anecdotes.length

  const loadNxt = (newVal) => {
    setRand(newVal)
    setSelected(anecdotes[newVal])  
  }

  const handleVote = ()=>{
    console.log(rands)
    setVotes({...votes, [rands] : votes[rands] += 1})  
    console.log(votes)
  }


  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{selected}</p>
      <Button handleClick={()=>loadNxt(Math.floor(Math.random()* length))} text="next anecdote"/>
      <button onClick={handleVote}>Vote</button>
      <h1>Anecdote with most votes</h1>
      <MVP mvotes={votes} anecdotesl={anecdotes} />
    </div>
  )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)