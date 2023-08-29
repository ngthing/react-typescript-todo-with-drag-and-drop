import React, { useState } from 'react';
import './App.css';

interface TodoItemProps extends Todo {
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
interface Todo {
    content: string; isCompleted: boolean
}
interface TodoListProps {
    name: string;
    todos: Todo[];
    onNameChange: (name: string) => void;
    setTodos: (todos: Todo[]) => void;
}
const TodoList = (ps: TodoListProps) => {
    const todoName = ps.name;
    const todos = ps.todos;
    const setTodos = ps.setTodos;
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
        setTodos(todos.slice(0, i).concat(todos.slice(i + 1)))
    }
    const toggleTodoCompleteAtIndex = (i: number) => {
        const newTodos = [...todos];
        newTodos[i].isCompleted = !newTodos[i].isCompleted;
        setTodos(newTodos);
    }
    return (
        <>
            <div className='todo-list-name'>
                <input type="text" value={todoName}
                    onChange={(e) => ps.onNameChange(e.target.value)} />
            </div>
            <div className="todo-list-container">
                <ul className="todo-list">
                    {ps.todos.map((todo, i) => (
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
        </>
    )
}

function App() {
    const [todoName, setTodoName] = useState('Todo')
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
    ] as Todo[]);

    return (
        <div className="app">
            <TodoList todos={todos} name={todoName} onNameChange={setTodoName} setTodos={setTodos} />
        </div >
    );
}

export default App;