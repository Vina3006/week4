const express = require("express");
const logger = require("./middleware/logger");
const morgan = require("morgan");

const app = express();

const PORT = 5000;
app.use(logger);
app.use(morgan("dev"));
app.use(express.json());
app.get("/",(req, res) => {
    res.send("Day2 Middleware server is running!!!!");
});
app.get("/test",(req, res) => {
    res.send("Test route is working!!!!");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});