import { useState } from "react";
import styles from './todoitem.module.css'

export default function TodoItem({ item, todos, setTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.name);

  function handleDelete(itemToDelete) {
    setTodos(todos.filter((todo) => todo !== itemToDelete));
  }

  function handleToggle(name) {
    const updated = todos.map((todo) =>
      todo.name === name ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updated);
  }

  function handleEditSubmit(e) {
    e.preventDefault();

    const updated = todos.map((todo) =>
      todo === item ? { ...todo, name: editText } : todo
    );

    setTodos(updated);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditText(item.name);
    setIsEditing(false);
  }

  const completedClass = item.done ? styles.completed : "";

  return (
    <div className={styles.item}>
      <div className={styles.itemName}>
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className={styles.editForm}>
            <input
              type="text"
              value={editText}      
              onChange={(e) => setEditText(e.target.value)}
              className={styles.editInput}
              autoFocus
            />
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.saveButton}>
                ✓
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={handleCancel}
              >
                ✕
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className={styles.checkboxContainer}>
              <div
                className={`${styles.checkbox} ${
                  item.done ? styles.checked : ""
                }`}
                onClick={() => handleToggle(item.name)}
              >
                {item.done && <span className={styles.checkmark}>✓</span>}
              </div>
            </div>

            <span
              className={completedClass}
              onClick={() => handleToggle(item.name)}
            >
              {item.name}
            </span>

            <div className={styles.buttonContainer}>
              <button
                className={styles.editButton}
                onClick={() => setIsEditing(true)}
              >
                ✎
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(item)}
              >
                ×
              </button>
            </div>
          </>
        )}
      </div>
      <hr className={styles.line} />
    </div>
  );
}
