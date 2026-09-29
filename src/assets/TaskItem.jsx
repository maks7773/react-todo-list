function TaskItem({
  task,
  toggleTask,
  deleteTask,
  saveTask,
  editingTask,
  editText,
  setEditingTask,
  setEditText,
}) {
  return (
    <div
      className={task.completed ? "task completed" : "task"}
      onClick={() => {
        toggleTask(task.id);
      }}
      
    >
      {task.id === editingTask ? (
        <input
          className="edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              saveTask(task.id);
            }
          }}
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
}

export default TaskItem