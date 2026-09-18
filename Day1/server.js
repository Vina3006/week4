  import express from "express";

const app = express();

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Task Tracker API is running!");
});

app.get("/tasks", (req, res) => {
  res.json([
    { id: 1, title: "Learn Node.js", completed: false },
    { id: 2, title: "Learn Express", completed: false }
  ]);
});

app.post("/tasks", (req, res) => {
  res.json({ message: "POST request received" });
});

app.put("/tasks/:id", (req, res) => {
  res.json({
    message: `PUT request received for task ${req.params.id}`
  });
});

app.delete("/tasks/:id", (req, res) => {
  res.json({
    message: `DELETE request received for task ${req.params.id}`
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});