import { useEffect, useRef, useState } from "react";

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


function Todo(props) {
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const editFieldRef = useRef(null);
  const editButtonRef = useRef(null);
  const wasEditing = usePrevious(isEditing);
  console.log(wasEditing);

  function handleChange(e) {
    setNewName(e.target.value);
  }

  function handleSave(e) {
    e.preventDefault();
    const nameToSave = newName.trim() ? newName : props.name;
    props.editTask(props.id, nameToSave);
    setNewName("");  // Clear the input after submitting
    setEditing(false);  // Turn off editing mode
  }

  const editingTemplate = (
    <form className="stack-small" onSubmit={handleSave}>
      <div className="form-group">
        <label className="todo-label" htmlFor={props.id}>
          原本的任務名稱： {props.name}
        </label>
        <input
          id={props.id}
          className="todo-text"
          type="text"
          defaultValue={props.name}
          onChange={handleChange}
          ref={editFieldRef}
        />
      </div>
      <div className="btn-group">
        <button type="button" className="btn todo-cancel" onClick={() => setEditing(false)}>
          取消
          <span className="visually-hidden">renaming {props.name}</span>
        </button>
        <button type="submit" className="btn btn__primary todo-edit">
          儲存
        </button>
      </div>
    </form>
  );

  const viewTemplate = (
    <div className="stack-small">
      {/* Checkmark & Task Name */}
      <div className="c-cb">
        <input
          id={props.id}
          type="checkbox"
          defaultChecked={props.completed}
          onChange={() => props.toggleTaskCompleted(props.id)}
        />
        <label className="todo-label" htmlFor={props.id}>
          {props.name}
        </label>
      </div>

      {/* Action buttons */}
      <div className="btn-group">
        {/* Edit button */}
        <button
          type="button"
          className="btn"
          onClick={() => setEditing(true)}
          ref={editButtonRef}
        >
          編輯 <span className="visually-hidden">{props.name}</span>
        </button>

        {/* Delete button */}
        <button
          type="button"
          className="btn btn__danger"
          onClick={() => props.deleteTask(props.id)}>
          刪除 <span className="visually-hidden">{props.name}</span>
        </button>
      </div>
    </div>
  );
  
  useEffect(() => {
  if (!wasEditing && isEditing) {
    editFieldRef.current.focus();
  } else if (wasEditing && !isEditing) {
    editButtonRef.current.focus();
  }
}, [wasEditing, isEditing]);
  

  return <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>;
}

export default Todo;