import React from "react"
import Header from "./components/header"
import Content from "./components/content"
import Footer from "./components/footer"


interface CoursePartBase {
  name: string
  exerciseCount: number
  type: string
}

interface CoursePartBaseII extends CoursePartBase {
  description: string
}

interface CourseNormalPart extends CoursePartBaseII {
  type: "normal"
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject"
  groupProjectCount: number
}

interface CourseSubmissionPart extends CoursePartBaseII {
  type: "submission"
  exerciseSubmissionLink: string
}
interface CourseSpecialPart extends CoursePartBaseII {
  type: "special"
  requirements: Array<string>
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart

const App = () => {
  const courseName = "Half Stack application development"

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Footer courseParts={courseParts} />
    </div>
  )
}

export default App
