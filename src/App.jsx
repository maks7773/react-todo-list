import { useEffect, useState } from "react";
import "./App.css";
import TaskItem from "./assets/TaskItem";
import FilterMenu from "./assets/FilterMenu";
import AddTask from "./assets/AddTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");
  const [isLocalLoaded, setIsLocalLoaded] = useState(false);
  const [filter, setFilter] = useState("all");

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

  function clearCompleted() {
    setTasks(tasks.filter((task) => !task.completed));
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

  let filteredTasks = tasks.filter((task) => {
    if (filter === "all") {
      return true;
    } else if (filter === "completed") {
      return task.completed;
    } else if (filter === "active") {
      return !task.completed;
    }
  });

  const countAll = tasks.length;
  const countCompleted = tasks.filter((task) => task.completed).length;
  const countActive = tasks.filter((task) => !task.completed).length;

  return (
    <>
      <AddTask newTask={newTask} setNewTask={setNewTask} addTask={addTask} />

      <FilterMenu filter={filter} setFilter={setFilter} />

      <div className="info-menu">
        <p className="info-text">Всего: {countAll}</p>
        <p className="info-text">Выполнено: {countCompleted}</p>
        <p className="info-text">Активных: {countActive}</p>
      </div>

      <div className="tasks-block">
        {filteredTasks.map((task, index) => {
          return (
            <TaskItem
              task={task}
              toggleTask={toggleTask}
              deleteTask={deleteTask}
              saveTask={saveTask}
              editingTask={editingTask}
              editText={editText}
              setEditingTask={setEditingTask}
              setEditText={setEditText}
            />
          );
        })}
      </div>
      <button className="clear-btn" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </>
  );
}

export default App;
