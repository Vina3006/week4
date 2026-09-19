import { useEffect, useState } from "react";

import Header from "./components/HeaderTemp";
import TaskForm from "./components/TaskForm";
import TaskStats from "./components/TaskStats";
import TaskFilters from "./components/TaskFilters";
import TaskList from "./components/TaskList";

const API_URL = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // GET - Load tasks from Express API
  useEffect(() => {
    async function loadTasks() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        const formattedData = data.map((task) => ({
          id: task.id,
          text: task.title,
          completed: task.completed
        }));

        setTasks(formattedData);
      } catch (error) {
        console.error("Error loading tasks:", error);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  // POST - Add task
  async function addTask(text) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: text
        })
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();

      // Convert API "title" to frontend "text"
      const formattedTask = {
        id: newTask.id,
        text: newTask.title,
        completed: newTask.completed
      };

      setTasks((currentTasks) => [
        ...currentTasks,
        formattedTask
      ]);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  // PUT - Toggle task
  async function toggleTask(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT"
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === updatedTask.id
            ? {
                ...task,
                completed: updatedTask.completed
              }
            : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  }

  // DELETE - Delete task
  async function deleteTask(id) {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      await response.json();

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.text
      .toLowerCase()
      .includes(search.toLowerCase());

    if (!matchesSearch) {
      return false;
    }

    if (filter === "active") {
      return !task.completed;
    }

    if (filter === "completed") {
      return task.completed;
    }

    return true;
  });

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          Loading tasks...
        </h2>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-10">

      <div className="max-w-3xl mx-auto">

        <Header />

        <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-5 sm:p-8">

          <TaskForm onAddTask={addTask} />

          <TaskStats tasks={tasks} />

          <div className="mb-5">
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search tasks..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <TaskFilters
            filter={filter}
            onFilterChange={setFilter}
          />

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Your Tasks
            </h2>
          </div>

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />

        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Built with React, Tailwind CSS & Express
        </p>

      </div>

    </main>
  );
}

export default App;