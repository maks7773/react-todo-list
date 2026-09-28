import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");
  const [isLocalLoaded, setIsLocalLoaded] = useState(false);
  const [filter, setFilter] = useState(null);

  function addTask() {
    if (newTask.trim() === "") {
      return;
    }
    setTasks([
      ...tasks,
      {
        text: newTask,
        completed: false,
        id: crypto.randomUUID(),
      },
    ]);
    setNewTask("");
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        } else {
          return task;
        }
      }),
    );
  }

  function deleteTask(id) {
    setTasks(
      tasks.filter((task) => {
        return task.id !== id;
      }),
    );
  }

  function saveTask(id) {
    if (editText.trim() === "") {
      alert("Напиите что нибудь");
    } else {
      setTasks(
        tasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              text: editText,
            };
          } else {
            return task;
          }
        }),
      );
      setEditingTask(null);
    }
  }

  function saveToLocal() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tasks"))) {
      setTasks(JSON.parse(localStorage.getItem("tasks")));
      setIsLocalLoaded(true);
    } else {
      setTasks([]);
      setIsLocalLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLocalLoaded) {
      saveToLocal();
    }
  }, [tasks, isLocalLoaded]);

  let filteredTasks = [];

  if (filter === "all") {
    filteredTasks = tasks;
  } else if (filter === "completed") {
    filteredTasks = tasks.filter((task) => task.completed);
  } else if (filter === "active") {
    filteredTasks = tasks.filter((task) => !task.completed);
  } else {
    filteredTasks = tasks;
  }

  return (
    <>
      <div className="adding">
        <input
          className="main-input"
          value={newTask}
          placeholder="Добавить задачу"
          onChange={(e) => setNewTask(e.target.value)}
        ></input>
        <button className="add-btn" onClick={addTask}>
          +
        </button>
      </div>

      <div className="filters-menu">
        <button className="filter-btn" onClick={() => setFilter("all")}>
          All
        </button>
        <button className="filter-btn" onClick={() => setFilter("completed")}>
          Completed
        </button>
        <button className="filter-btn" onClick={() => setFilter("active")}>
          Active
        </button>
      </div>

      <div className="tasks-block">
        {filteredTasks.map((task, index) => {
          return (
            <div
              className={task.completed ? "task completed" : "task"}
              onClick={() => {
                toggleTask(task.id);
              }}
              key={task.id}
            >
              {task.id === editingTask ? (
                <input
                  className="edit-input"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                ></input>
              ) : (
                <p>{task.text}</p>
              )}

              <div className="btn-menu">
                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(task.id);
                  }}
                >
                  Delete
                </button>
                {task.id === editingTask ? (
                  <button
                    className="save-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      saveTask(task.id);
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingTask(task.id);
                      setEditText(task.text);
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
