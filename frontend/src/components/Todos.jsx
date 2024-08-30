import React, { useState } from 'react';

const Todos = ({ todos }) => {
  const [completedTodos, setCompletedTodos] = useState(new Set());

  const handleButtonClick = (index) => {
    setCompletedTodos((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  return (
    <div>
      {todos.map((todo, index) => {
        const isCompleted = completedTodos.has(index);

        return (
          <div key={index}>
            <h1>{todo.title}</h1>
            <p>{todo.description}</p>
            <button onClick={() => handleButtonClick(index)}>
              {isCompleted ? 'Completed' : 'Mark as complete'}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
