import React, { useState } from "react"
import axios from "axios"
import { Button } from "react-bootstrap"
import EditTodo from "./EditTodo"

function Todo(props) {
  const { todo_id: todoId, todo_description: todoDescription } = props.todoData
  const { setAllTodos, setShowAlert, setAlertMessage, setAlertVariant } = props

  const [show, setShow] = useState(false)

  const handleShow = () => setShow(true)

  const handleOnClick = () => {
    handleShow()
  }

  const onClickDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/todos/${todoId}`)
      const todoArr = await axios.get("http://localhost:5000/todos")
      const data = todoArr.data
      setAllTodos(data)
      setShowAlert(true)
      setAlertMessage("The todo item was deleted")
      setAlertVariant("danger")
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <tr>
      <td>{todoId}</td>
      <td>{todoDescription}</td>
      <td>
        <Button variant="primary" onClick={() => handleOnClick()}>
          Edit
        </Button>
      </td>
      <td>
        <Button variant="danger" onClick={onClickDelete}>
          Delete
        </Button>
      </td>

      <EditTodo show={show} setShow={b => setShow(b)} todoId={todoId} todoDescription={todoDescription} setAllTodos={editedTodos => setAllTodos(editedTodos)} setShowAlert={alert => setShowAlert(alert)} setAlertMessage={message => setAlertMessage(message)} setAlertVariant={variant => setAlertVariant(variant)} />
    </tr>
  )
}

export default Todo
