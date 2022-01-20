import "./App.css"
import React, { useState, useEffect } from "react"
import axios from "axios"
import "bootstrap/dist/css/bootstrap.min.css"
import Container from "react-bootstrap/Container"
import Alert from "react-bootstrap/Alert"

import InputTodo from "./components/InputTodo"
import ListTodo from "./components/ListTodo"

function App() {
  const [allTodos, setAllTodos] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertVariant, setAlertVariant] = useState("")

  const getAllTodos = async () => {
    try {
      const todoArr = await axios.get("http://localhost:5000/todos")
      setAllTodos(todoArr.data)
    } catch (err) {
      console.log(err)
    }
  }

  getAllTodos()

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false)
      setAlertMessage("")
    }, 5000)
    return () => clearTimeout(timer)
  }, [showAlert])

  return (
    <Container>
      <h1 className="text-center mt-5">Pern Todo List</h1>
      <div className="w-100 height-50px mt-5">
        <Alert className="text-center" show={showAlert} variant={alertVariant}>
          {alertMessage}
        </Alert>
      </div>
      <InputTodo setAllTodos={todos => setAllTodos(todos)} setShowAlert={alert => setShowAlert(alert)} setAlertMessage={message => setAlertMessage(message)} setAlertVariant={variant => setAlertVariant(variant)} />
      <ListTodo allTodos={allTodos} setAllTodos={todos => setAllTodos(todos)} setShowAlert={alert => setShowAlert(alert)} setAlertMessage={message => setAlertMessage(message)} setAlertVariant={variant => setAlertVariant(variant)} />
    </Container>
  )
}

export default App
