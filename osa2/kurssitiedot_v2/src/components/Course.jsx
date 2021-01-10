import React from 'react'

const Course = ({courses}) =>{
  return (
    <>
    {courses.map(course =>
      <>
      <h1>{course.name}</h1>
      <ul>{course.parts.map(val => 
        <li key ={val.id}>
          {val.name} {val.exercises}
        </li>
        )}
      </ul>    
      <h3>Total of {course.parts.map(val => val.exercises).reduce((a,b) => a+b)} exercises </h3>
      </>
    )}

    </>
  )

}
export default Course