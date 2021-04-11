import React from "react"
import { connect } from "react-redux"
import { createFilter } from "../reducers/filterReducer"

const Filter = (props) => {

  const handleChange = (event) => {
    let content = event.target.value
    props.createFilter(content)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  createFilter,
}

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    filter: state.filter,
  };
};
const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Filter)

export default ConnectedNotes


