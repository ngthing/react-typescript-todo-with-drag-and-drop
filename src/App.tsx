import React, { useState } from 'react';
import './App.css';

interface TodoItemProps {
  content: string;
  isCompleted: boolean;
  index: number;
  onChange: (content: string, i: number) => void;
  handleDelete: (i: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, i: number) => void;
  toggleTodoCompleteAtIndex: (i: number) => void;
};

const TodoItem = (ps: TodoItemProps) => (
  <div className={`todo ${ps.isCompleted && 'todo-is-completed'}`}>
    <div className="checkbox" onClick={() => ps.toggleTodoCompleteAtIndex(ps.index)}>
      {ps.isCompleted && (
        <span>&#x2714;</span>
      )}
    </div>
    <input type="text" value={ps.content} id={`todo-input-${ps.index}`}
      onKeyDown={(e) => ps.handleKeyDown(e, ps.index)}
      onChange={(e) => ps.onChange(e.target.value, ps.index)} />
    <button className="btn-action" onClick={() => ps.handleDelete(ps.index)}>&#x2715;</button>
  </div>
)
function App() {
  const [todos, setTodos] = useState([
    {
      content: '"Enter" in any todo to add a new todo below it',
      isCompleted: true,
    },
    {
      content: 'Or Click + to add a todo in the bottom of the list',
      isCompleted: false,
    },
    {
      content: 'Build a todo app in React',
      isCompleted: false,
    }
  ]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === 'Enter') createTodoAtIndex(i + 1);
  }
  const createTodoAtIndex = (i: number) => {
    const newTodos = [...todos];
    newTodos.splice(i, 0, {
      content: '',
      isCompleted: false,
    });
    setTodos(newTodos);
    setTimeout(() => {
      (document.getElementById(`todo-input-` + i) as HTMLElement).focus();
    }, 0);
  }
  const updateTodoAtIndex = (content: string, i: number) => {
    const newTodos = [...todos];
    newTodos[i].content = content;
    setTodos(newTodos);
  }
  const deleteTodoAtIndex = (i: number) => {
    setTodos(todos => todos.slice(0, i).concat(todos.slice(i + 1)))
  }
  const toggleTodoCompleteAtIndex = (i: number) => {
    const newTodos = [...todos];
    newTodos[i].isCompleted = !newTodos[i].isCompleted;
    setTodos(newTodos);
  }
  return (
    <div className="app">
      <div className="todo-list-container">
        <ul className="todo-list">
          {todos.map((todo, i) => (
            <TodoItem key={`todo-` + i} {...todo} index={i}
              onChange={updateTodoAtIndex}
              handleKeyDown={handleKeyDown}
              handleDelete={deleteTodoAtIndex}
              toggleTodoCompleteAtIndex={toggleTodoCompleteAtIndex} />
          ))}
        </ul>

        <button className="btn-action" style={{ 'fontSize': 'large' }}
          onClick={() => createTodoAtIndex(todos.length)}>&#43;</button>
      </div>
    </div >
  );
}

export default App;