import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';

function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    return savedTodos || [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title, description) => {
    setTodos([...todos, { id: Date.now(), title, description, completed: false }]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="App">
      <h1>ToDo App</h1>
      <input
        type="text"
        placeholder="Title"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            e.target.nextSibling.focus();
          }
        }}
      />
      <textarea
        placeholder="Description"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const title = e.target.previousSibling.value;
            const description = e.target.value;
            if (title && description) {
              addTodo(title, description);
              e.target.previousSibling.value = '';
              e.target.value = '';
            }
          }
        }}
      />
      <button onClick={() => {
        const title = document.querySelector('input[type="text"]').value;
        const description = document.querySelector('textarea').value;
        if (title && description) {
          addTodo(title, description);
          document.querySelector('input[type="text"]').value = '';
          document.querySelector('textarea').value = '';
        }
      }}>Add Todo</button>
      <TodoList todos={todos} removeTodo={removeTodo} toggleComplete={toggleComplete} />
    </div>
  );
}

export default App;
