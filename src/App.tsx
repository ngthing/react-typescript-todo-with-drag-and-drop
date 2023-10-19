import { useEffect, useState } from 'react';
import { Todo } from './TodoItem';
import { TodoList } from './TodoList';
import { sampleTodos } from './data';

import './App.css';


function App() {
    const storedTodoName = localStorage.getItem('todoName') ?? 'Toododo';
    const storedTodos = (JSON.parse(localStorage.getItem('todos') ?? '[]')) as Todo[];

    const [todoName, setTodoName] = useState(storedTodoName.length ? storedTodoName : 'Toododo')
    const [todos, setTodos] = useState(storedTodos.length ? storedTodos : sampleTodos);
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })
        }

        // Attach the event listener to the window object
        window.addEventListener('resize', handleResize);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        localStorage.setItem('todoName', todoName)
    }, [todoName]);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    return (
        <div className="app" data-width={dimensions.width}>
            <TodoList todos={todos} name={todoName} onNameChange={setTodoName} setTodos={setTodos} />
            <footer>
                <div className='footerText'>🌱 Inspired by the <a href='https://github.com/ngthing/toododo' target='blank'>Internet</a>.
                    Made by <a href='https://justthinguyen.com' target='blank'>Thi Nguyen</a>. Thanks for stopping by and have a beautiful day! 🌱</div>
            </footer>
        </div >
    );
}

export default App;