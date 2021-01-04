import React from 'react'
import ReactDOM from 'react-dom'


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content content={course}/>
      <Total exerCount={course}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <div>
      <p>
         {props.course.name}
      </p>
    </div>
  )
}
const Content = (props) =>{
  return(
    <div>
      -{props.content.parts[0].name}<br/> 
      -{props.content.parts[1].name}<br/> 
      -{props.content.parts[2].name}<br/> 
    </div>
  )
}

const Total = (props) =>{
  return(
    <div>
      <h3> Total amount of tasks</h3>
      
      {props.exerCount.parts[0].exercises+props.exerCount.parts[1].exercises+props.exerCount.parts[2].exercises}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))