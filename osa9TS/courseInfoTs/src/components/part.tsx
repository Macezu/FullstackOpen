import React from 'react'
import { CoursePart } from "../App"

export const Part = ({ courseParts} : {courseParts: Array<CoursePart>} ) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  return ( 
<div>

    {courseParts.map(part => {
      switch (part.type) {
        case "normal":
          return <p key={part.name} >{part.name}, {part.exerciseCount}. {part.description}</p> 
        case "groupProject":
          return  <p key={part.name} >{part.name}, {part.exerciseCount}. {part.groupProjectCount}</p>
        case "submission":
          return <p key={part.name} >{part.name}, {part.exerciseCount}. <i>{part.description}</i>. Submit to: {part.exerciseSubmissionLink}</p>
        case "special":
          return <p key={part.name}>{part.name} {part.exerciseCount} {part.description}. required skills: {part.requirements.join(", ")}</p>
        default:
          return assertNever(part) ;
      }
  
    })} 
      
      </div>

  )
  
};

