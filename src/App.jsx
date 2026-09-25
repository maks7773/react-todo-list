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

  return (
    <>
      <div className="adding">
        <input
          value={newTask}
          placeholder="Добавить задачу"
          onChange={(e) => setNewTask(e.target.value)}
        ></input>
        <button className="add-btn" onClick={addTask}>+</button>
      </div>

      <div className="tasks-block">
        {tasks.map((task, index) => {
          return (
            <div className="task"
              onClick={() => {
                toggleTask(task.id);
              }}
              key={task.id}
            >
              {task.text}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
