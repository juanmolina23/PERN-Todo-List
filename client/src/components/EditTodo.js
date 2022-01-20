import React, { useState } from "react"
import axios from "axios"
import { Modal, Button, Form } from "react-bootstrap"

function EditTodo(props) {
  const { show, setShow, todoId, todoDescription, setAllTodos, setShowAlert, setAlertMessage, setAlertVariant } = props

  const [newDescription, setNewDescription] = useState(todoDescription)
  const [errorMessage, setErrorMessage] = useState("")
  const [showError, setShowError] = useState(false)

  const handleClose = () => setShow(false)

  const onClickHandleEdit = async () => {
    const editData = { description: newDescription }
    if (validateUpdate()) {
      try {
        await axios.put(`http://localhost:5000/todos/${todoId}`, editData)
        const newTodoArr = await axios.get(`http://localhost:5000/todos/`)
        setAllTodos(newTodoArr.data)
        setShowAlert(true)
        setAlertMessage("The todo item was updated")
        setAlertVariant("success")
      } catch (err) {
        console.log(err)
      }
      handleClose()
    }
  }

  const validateUpdate = editData => {
    if (newDescription === "") {
      setShowError(true)
      setErrorMessage("The todo description cannot be blank")
      return false
    }
    if (newDescription === todoDescription) {
      setShowError(true)
      setErrorMessage("No changes were detected")
      return false
    }

    return true
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit todo</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p hidden={!showError}>{errorMessage}</p>
        <Form className="d-flex ">
          <Form.Control type="text" placeholder="Todo description" defaultValue={todoDescription} onChange={e => setNewDescription(e.target.value)} />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onClickHandleEdit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default EditTodo
