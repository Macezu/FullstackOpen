import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm handleTitleChange={createBlog}/>
  )

  
  const form = document.forms[0];
  const input = form.querySelector('input[name="Title"]')
  const inputA = form.querySelector('input[name="Author"]')

  fireEvent.change(input, { 
    target: { value: 'testing of forms could be easier' } 
  })

 
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].target.value).toBe('testing of forms could be easier' )

})