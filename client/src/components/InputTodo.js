import React, { useState } from "react"
import axios from "axios"
import { Button, Form } from "react-bootstrap"

function InputTodo(props) {
  const [description, SetDescription] = useState("")
  const { setAllTodos, setShowAlert, setAlertMessage, setAlertVariant } = props

  const onFormSubmit = async e => {
    e.preventDefault()
    const todoData = { description }
    if (validateTodo(todoData)) {
      try {
        await axios.post("http://localhost:5000/todos", todoData)
        const allTodos = await axios.get("http://localhost:5000/todos")
        setAllTodos(allTodos.data)
        setShowAlert(true)
        setAlertMessage("The todo item was added")
        setAlertVariant("success")
      } catch (err) {
        console.log(err)
      }
      //clear input field
      e.target[0].value = ""
      SetDescription("")
    }
  }

  const validateTodo = todoData => {
    if (!todoData.description) {
      setShowAlert(true)
      setAlertMessage("Please enter a todo description")
      setAlertVariant("danger")
      return false
    }

    return true
  }

  return (
    <Form className="d-flex mt-5" onSubmit={e => onFormSubmit(e)}>
      <Form.Control type="text" placeholder="Todo description" onChange={e => SetDescription(e.target.value)} />
      <Button variant="success" type="submit" className="mx-1">
        Add
      </Button>
    </Form>
  )
}

export default InputTodo
