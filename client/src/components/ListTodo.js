import React from "react"
import { Table } from "react-bootstrap"

import Todo from "./Todo"

function ListTodo(props) {
  const { allTodos, setAllTodos, setShowAlert, setAlertMessage, setAlertVariant } = props

  return (
    <Table className="mt-5">
      <thead>
        <tr>
          <th>Todo ID</th>
          <th>Todo Description</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {allTodos.map(todo => (
          <Todo key={todo.todo_id} todoData={todo} setAllTodos={filteredTodos => setAllTodos(filteredTodos)} setShowAlert={alert => setShowAlert(alert)} setAlertMessage={message => setAlertMessage(message)} setAlertVariant={variant => setAlertVariant(variant)} />
        ))}
      </tbody>
    </Table>
  )
}

export default ListTodo
