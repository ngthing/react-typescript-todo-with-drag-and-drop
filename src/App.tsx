import React, { useEffect, useState } from 'react';
import { TodoList } from './TodoList';
import { sampleTodos } from './data';

import './App.css';


function App() {
    const storedTodoName = localStorage.getItem('todoName') ?? 'Toododo';
    const storedTodos = (JSON.parse(localStorage.getItem('todos') ?? '[]')) as Todo[];

    const [todoName, setTodoName] = useState(storedTodoName.length ? storedTodoName : 'Toododo')
    const [todos, setTodos] = useState(storedTodos.length ? storedTodos : sampleTodos);

    useEffect(() => {
        localStorage.setItem('todoName', todoName)
    }, [todoName]);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    return (
        <div className="app">
            <TodoList todos={todos} name={todoName} onNameChange={setTodoName} setTodos={setTodos} />
        </div >
    );
}

export default App;