import React from "react"

interface Parts{
    exerciseCount : number
}

const Footer = ({courseParts} : {courseParts : Array<Parts>}) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}

export default Footer
