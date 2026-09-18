const express = require("express");

const app = express();

const PORT = 5000;
app.use(express.json());


app.get("/tasks/:id", (req, res) => {
  const taskId = req.params.id;

  res.send(`You requested task with ID: ${taskId}`);
});
app.get("/search", (req, res) => {
    const keyword = req.query.keyword;
    res.send(`You searched for: ${keyword}`);
});
app.post("/tasks", (req, res) => {
    const task = req.body;

    res.json({
        message: "Task received successfully",
        task: task
    });
});
app.listen(PORT, () => {
  console.log(`Day 3 server running at http://localhost:${PORT}`);
});