function FilterButton(props) {
    return (
      <button 
        type="button"
        className="btn toggle-btn"
        aria-pressed="true"
        onClick={() => props.setFilter(props.name)}
      >
        <span>{props.name}</span>
      </button>
    );
  }
export default FilterButton;
  