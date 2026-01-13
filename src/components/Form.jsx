

import { useEffect, useState } from "react";
import styles from "./form.module.css";

export default function Form({ todos, setTodos }) {
  const [todo, setTodo] = useState({ name: "", done: false });
  const [error, setError] = useState("");

 
  function handleSubmit(e) {
    e.preventDefault();

    const trimmedName = todo.name.trim();

    if (!trimmedName) {
      setError("Task cannot be empty");
      return;
    }

    if (trimmedName.includes(".") || trimmedName.includes(",")) {
      setError("Task cannot contain dots or commas");
      return;
    }

    const isDuplicate = todos.some(
      (t) => t.name.trim().toLowerCase() === trimmedName.toLowerCase()
    );
    if (isDuplicate) {
      setError("This task already exists");
      return;
    }

    setError("");
    setTodos([...todos, { name: trimmedName, done: false }]);
    setTodo({ name: "", done: false });
  }

  return (
    <form className={styles.todoform} onSubmit={handleSubmit}>
    
      <div className={styles.inputContainer}>
        <input
          className={`${styles.modernInput} ${error ? styles.error : ""}`}
          placeholder="Enter todo Item....."
          onChange={(e) => {
            setTodo({ name: e.target.value, done: false });
            setError("");
          }}
          value={todo.name}
          type="text"
        />

        <div className={styles.buttonErrorContainer}>
          <button className={styles.modernButton} type="submit">
            Add
          </button>
          {error && <div className={styles.errorMessage}>{error}</div>}
        </div>
      </div>
    </form>
  );
}
