function AddTask({ newTask, setNewTask, addTask}) {
    return(
        <div className="adding">
        <input
          className="main-input"
          value={newTask}
          placeholder="Добавить задачу"
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
        ></input>
        <button className="add-btn" onClick={addTask}>
          +
        </button>
      </div>
    )
}

export default AddTask;