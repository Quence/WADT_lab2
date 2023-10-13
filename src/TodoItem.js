import React from 'react';

function TodoItem({ todo, toggleComplete, removeTodo }) {
  const handleCheckboxChange = () => {
    toggleComplete(todo.id);
  };

  return (
    <div className={`TodoItem ${todo.completed ? 'completed' : ''}`}>
      <div className="item-content">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxChange}
        />
        <div className="item-details">
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
        </div>
      </div>
      <div className="button-container">
        <button className="remove-button" onClick={() => removeTodo(todo.id)}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
