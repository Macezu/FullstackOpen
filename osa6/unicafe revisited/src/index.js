import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const goodClicked = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }

  const okClicked = () => {
    store.dispatch({
      type: 'OK'
    })
  }

  const badClicked = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const resetClicked = () =>{
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={goodClicked}>good</button> 
      <button onClick={okClicked}>neutral</button> 
      <button onClick={badClicked}>bad</button>
      <button onClick={resetClicked}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)