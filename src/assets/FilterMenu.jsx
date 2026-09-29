function FilterMenu({ filter, setFilter}) {
    return(
        <div className="filters-menu">
        <button
          className={filter === "all" ? "choosen" : "filter-btn"}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "completed" ? "choosen" : "filter-btn"}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={filter === "active" ? "choosen" : "filter-btn"}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
      </div>
    )
}

export default FilterMenu