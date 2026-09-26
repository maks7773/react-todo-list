import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

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

  return (
    <>
      <div className="adding">
        <input
          value={newTask}
          placeholder="Добавить задачу"
          onChange={(e) => setNewTask(e.target.value)}
        ></input>
        <button className="add-btn" onClick={addTask}>
          +
        </button>
      </div>

      <div className="tasks-block">
        {tasks.map((task, index) => {
          return (
            <div
              className= {task.completed ? "task completed" : "task"}
              onClick={() => {
                toggleTask(task.id);
              }}
              key={task.id}
            >
              <p>{task.text}</p>
              <button
                className="delete-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTask(task.id);
                }}
              >
                Удалить
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
