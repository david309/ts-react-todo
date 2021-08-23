import * as React from "react";
import { TodoItem } from "../interfaces";

interface TodoProps extends TodoItem {
  toggleStatus: any;
  removeTodo: any;
  editTodo: any;
}

const Todo = ({
  id,
  title,
  completed,
  toggleStatus,
  removeTodo,
  editTodo,
}: TodoProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [newTitle, setNewTitle] = React.useState(title);

  const onEditTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const onSubmitEdit = () => {
    editTodo(id, newTitle);
    setIsEditing(false);
  };

  const viewTemplate = (
    <>
      <input type="checkbox" checked={completed} onChange={toggleStatus} />
      <p>{title}</p>

      <div>
        <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={removeTodo}>
          Delete
        </button>
      </div>
    </>
  );

  const editTemplate = (
    <>
      <input type="checkbox" checked={completed} onChange={toggleStatus} />
      <input
        type="text"
        className="todo-edit"
        onChange={onEditTitle}
        value={newTitle}
      />

      <div>
        <button className="btn btn-primary" onClick={onSubmitEdit}>
          Save
        </button>
        <button className="btn btn-danger" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    </>
  );

  return (
    <li id={`todo-${id}`} className="todo">
      {isEditing ? editTemplate : viewTemplate}
    </li>
  );
};

export default Todo;
