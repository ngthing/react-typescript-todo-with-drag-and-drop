import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { Todo } from './components/TodoItem';
import { TodoList } from './components/TodoList';
import { sampleTodos } from './data';
import { Footer, FooterText } from './components/StyledComponents';
import { TodoListProvider } from './components/TodoListContext';

import './App.css';

function App() {
    const storedTodoName = localStorage.getItem('todoName') ?? 'Toododo';
    const storedTodos = JSON.parse(
        localStorage.getItem('todos') ?? '[]',
    ) as Todo[];

    const [todoName, setTodoName] = useState(
        storedTodoName.length ? storedTodoName : 'Toododo',
    );

    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth,
    });
    useEffect(() => {
        const handleResize = () => {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth,
            });
        };

        // Attach the event listener to the window object
        window.addEventListener('resize', handleResize);

        // Remove the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    useEffect(() => {
        localStorage.setItem('todoName', todoName);
    }, [todoName]);

    return (
        <Container className="app" data-width={dimensions.width}>
            <TodoListProvider
                initialTodos={storedTodos.length ? storedTodos : sampleTodos}
            >
                <Box className="main-container">
                    <TodoList name={todoName} onNameChange={setTodoName} />
                </Box>
            </TodoListProvider>

            <Footer>
                <FooterText>
                    🌱 Inspired by the{' '}
                    <a href="https://github.com/ngthing/toododo" target="blank">
                        Internet
                    </a>
                    . Made by{' '}
                    <a href="https://justthinguyen.com" target="blank">
                        Thi Nguyen
                    </a>
                    . Thanks for stopping by and have a beautiful day! 🌱
                </FooterText>
            </Footer>
        </Container>
    );
}

export default App;
