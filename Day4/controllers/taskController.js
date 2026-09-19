const getTasks = (req, res) => {
  res.json([
    {
      id: 1,
      title: "Learn Node.js"
    },
    {
      id: 2,
      title: "Learn Express"
    }
  ]);
};

const getTaskById = (req, res) => {
  const taskId = req.params.id;

  res.json({
    id: taskId,
    message: "Task found"
  });
};

module.exports = {
  getTasks,
  getTaskById
};