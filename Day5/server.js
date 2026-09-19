const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;
app.use(cors());
app.use(express.json());

const tasks = [
  {
    id: 1,
    title: "Learn React",
    completed: true
  },
  {
    id: 2,
    title: "Learn Express",
    completed: false
  },
  {
    id: 3,
    title: "Connect React with API",
    completed: false
  }
];

app.get("/", (req, res) => {
  res.send("Day 5 API is running!");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Day 5 API running at http://localhost:${PORT}`);
});