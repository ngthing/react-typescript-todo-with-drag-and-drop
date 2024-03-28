/* eslint-disable testing-library/no-debugging-utils */
import App from './App';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';

describe('App', () => {
    it('renders correctly', () => {
        const component = renderer.create(<App />);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it('renders App component and has a Todo list name and default action buttons', () => {
        render(<App />);
        expect(screen.getByLabelText('todoName')).toBeInTheDocument();
        expect(screen.getByLabelText('add-todo')).toBeInTheDocument();
        expect(screen.getByLabelText('delete-todo-list')).toBeInTheDocument();
        expect(screen.getByLabelText('check-all-todo')).toBeInTheDocument();
        expect(screen.getByLabelText('uncheck-all-todo')).toBeInTheDocument();
        expect(screen.getByLabelText('copy-list')).toBeInTheDocument();
    });
});
