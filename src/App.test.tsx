import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


describe('App', () => {
    it('renders App component and has a default Todo list', () => {
        render(<App />);
        expect(screen.getByLabelText('todoName')).toBeInTheDocument();
        expect(screen.getByLabelText('todo-list')).toBeInTheDocument();
        expect(screen.getByLabelText('add-todo')).toBeInTheDocument();
        expect(screen.getByLabelText('delete-todo-list')).toBeInTheDocument();
        expect(screen.getAllByLabelText('delete-todo').length).toBe(4);
    });
});
