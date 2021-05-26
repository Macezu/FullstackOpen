import { CoursePart } from "../App"

export const Part = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  courseParts.forEach((part) => {
    switch (part.type) {
      case "normal":
        return part
      case "groupProject":
        return part
      case "submission":
        return part
      default:
        return assertNever(part)
    }
  })

  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    )
  }
}

