const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

let tasks = [
  {
    id: 1,
    title: "Learn React",
    completed: false
  },
  {
    id: 2,
    title: "Learn Express",
    completed: false
  }
];


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.get("/", (req, res) => {
  res.send("Task Tracker API is running!");
});


app.get("/tasks", (req, res) => {
  res.json(tasks);
});


app.post("/tasks", (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({
      message: "Title is required"
    });
  }

  const newTask = {
    id: tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1,
    title: title,
    completed: false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});


app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const task = tasks.find(task => task.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  task.completed = !task.completed;

  res.json(task);
});


app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Task not found"
    });
  }

  const deletedTask = tasks.splice(index, 1)[0];

  res.json(deletedTask);
});

 
app.listen(PORT, () => {
  console.log(`Day 6 server running at http://localhost:${PORT}`);
});