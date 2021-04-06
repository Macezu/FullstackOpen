import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, fireEvent } from "@testing-library/react"
import { prettyDOM } from "@testing-library/dom"
import Blog from "./Blog"

const blog = {
  title: "No content to be found",
  author: "TestMan",
  url: "www.noneprovided.com",
  user: {
    name: "Timppa",
  },
}

test("renders content", () => {
  const component = render(<Blog blog={blog} />)
  const div = component.container.querySelector(".togglableContent")

  //component.debug()
  expect(div).toHaveStyle("display: none")
  expect(component.container).toHaveTextContent("No content to be found")
  expect(component.container).toHaveTextContent(blog.author)
  expect(component.container).toHaveTextContent(blog.title)
})

test("clicking the button calls event handler once and twice", async () => {
  const mockHandler = jest.fn()

  const component = render(<Blog blog={blog} handleLikeClicked={mockHandler} />)

  const button = component.getByText("likes")
  //component.debug()
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2) 
})

test("after clicking the button, children are displayed", () => {
  const component = render(<Blog blog={blog} />)
  const button = component.getByText("view")
  fireEvent.click(button)

  const div = component.container.querySelector(".togglableContent")
  expect(div).not.toHaveStyle("display: none")
})


