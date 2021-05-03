import React,{ useState, useImperativeHandle } from "react"
import PropTypes from "prop-types"

const Togglable = React.forwardRef((props,ref) => {
  const [visible,setVisible] = useState(false)
  console.log(visible)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(
    ref,
    () => {
      toggleVisibility()
    },
  )

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  return (
    <div >
      <div style={hideWhenVisible}>
        <button className="genericBtn" onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible} className="toggable">
        {props.children}        <button className="genericBtn" onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = "Togglable"

export default Togglable