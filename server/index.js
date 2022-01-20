const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")

//middlewares
app.use(cors())
app.use(express.json())

//Routes

//create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body
    const newTodo = await pool.query(`INSERT INTO todo (todo_description) VALUES ($1) RETURNING *`, [description])

    res.json(newTodo.rows)
  } catch (err) {
    console.error(err)
  }
})

//get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo ORDER BY todo_id ASC")
    res.json(allTodos.rows)
  } catch (err) {
    console.error(err)
  }
})

//get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
    res.json(todo.rows[0])
  } catch (err) {
    console.error(err)
  }
})

//update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { description } = req.body
    const todo = await pool.query(`UPDATE todo SET todo_description = $1 WHERE todo_id = $2 RETURNING *`, [description, id])

    res.json(todo.rows)
  } catch (err) {
    console.error(err)
  }
})

//delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params
    const todo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
    res.json("todo was deleted")
  } catch (err) {
    console.error(err)
  }
})

app.listen(5000, () => {
  console.log("Server has started on port 5000")
})
