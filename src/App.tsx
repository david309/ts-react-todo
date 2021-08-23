/* eslint-disable jsx-a11y/no-redundant-roles */
import * as React from "react";
import { nanoid } from "nanoid";
import Todo from "./components/Todo";
import "./App.css";
import { User, TodoItem } from "./interfaces";

const defaultTodos = [
  { id: nanoid(), title: "make todo app", completed: false },
  { id: nanoid(), title: "eat crackers", completed: true },
  { id: nanoid(), title: "become king of the sea", completed: false },
];

interface AppProps {
  headerText: string;
  subHeading: string;
}

function App({ headerText, subHeading }: AppProps) {
  const [todos, setTodos] = React.useState<TodoItem[]>(defaultTodos);
  const [user, setUser] = React.useState<User | null>(null);
  const [newTodoTitle, setNewTodoTitle] = React.useState<string>("");

  /**
   * Toggle the status of a todo item
   * @param {String} id unique identifier of the todo item
   */
  const onToggleStatus = (id: string) => {
    const updatedTodos = todos.map((t) => {
      if (id === t.id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    });
    setTodos(updatedTodos);
  };

  /**
   * Delete a todo from the list
   * @param {String} id unique identifier of the todo item
   */
  const onDeleteTodo = (id: string) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
  };

  const onEditTodo = (id: string, newTitle: string) => {
    const updatedTodos = todos.map((t) => {
      if (t.id === id) {
        return { ...t, title: newTitle };
      }
      return t;
    });
    setTodos(updatedTodos);
  };

  /**
   * Event handler for new todo input item
   */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(e.target.value);
  };

  /**
   * Event handler for new todo form submission
   */
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodoTitle === "") return;

    setTodos([
      ...todos,
      { id: nanoid(), title: newTodoTitle, completed: false },
    ]);

    setNewTodoTitle((state) => "");
  };

  /**
   * Gets user details and updates the app state with them
   */
  const getUser = () =>
    setUser({
      name: "John Smith",
      age: 30,
      country: "United States",
      address: { street: "Main", number: 204, zip: 54321 },
      admin: false,
    });

  const todoList: JSX.Element[] = todos.map((t) => (
    <Todo
      key={t.id}
      id={t.id}
      title={t.title}
      completed={t.completed}
      toggleStatus={() => onToggleStatus(t.id)}
      removeTodo={() => onDeleteTodo(t.id)}
      editTodo={onEditTodo}
    />
  ));

  return (
    <div id="App">
      <div className="user">
        {!user ? (
          <button className="btn btn-primary" onClick={getUser}>
            Login
          </button>
        ) : (
          <p>
            Welcome <span className="user-name">{user.name}</span>
          </p>
        )}
      </div>

      <div className="head">
        <h1>{headerText}</h1>
        {subHeading && <h3>{subHeading}</h3>}
      </div>

      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="title">Create New Todo:</label>
        <input
          autoComplete="off"
          type="text"
          id="title"
          value={newTodoTitle}
          onChange={onChange}
        />

        <button
          className={`btn ${newTodoTitle === "" ? "inactive" : "btn-primary"}`}
          type="submit"
        >
          Add
        </button>
      </form>

      <h2 className="status-heading">
        {todos.filter((t) => t.completed).length} of {todos.length} todo
        {todos.length > 1 ? "s" : ""} complete
      </h2>

      <div className="list-wrapper">
        <ul className="todo-list" role="list">
          {todoList}
        </ul>
      </div>
    </div>
  );
}

export default App;
