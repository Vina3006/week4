const express = require("express");

const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const PORT = 5000;


app.use(express.json());


app.get("/", (req, res) => {
  res.send("Project Structure Server is running!");
});


app.use("/tasks", taskRoutes);


app.get("/error", (req, res, next) => {
  next(new Error("This is a test error"));
});


app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`Day 4 server running at http://localhost:${PORT}`);
});