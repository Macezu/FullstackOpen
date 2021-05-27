import React from "react"
import { CoursePart } from "../App"
import { Part } from "./part"



const Content = ({courseParts}: {courseParts: CoursePart[]}) => {
  return (
    <div>
      <Part courseParts={courseParts} />
    </div>
  )
}

export default Content
