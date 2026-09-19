import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  return (
    <div>
      <h1>Task Tracker</h1>

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>

          <p>
            Status: {task.completed ? "Completed" : "Pending"}
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;