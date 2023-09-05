import { Todo, TodoItem } from './TodoItem';

interface TodoListProps {
    name: string;
    todos: Todo[];
    onNameChange: (name: string) => void;
    setTodos: (todos: Todo[]) => void;
}
export const TodoList = (ps: TodoListProps) => {
    const todoName = ps.name;
    const todos = ps.todos;
    const setTodos = ps.setTodos;
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
        if (e.key === 'Enter') createTodoAtIndex(i + 1);
    }
    const createTodoAtIndex = (i: number) => {
        const newTodos = [...todos];
        newTodos.splice(i, 0, {
            id: `todo-${todos.length + 1}`,
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

    // a little function to help us with reordering the result
    const reorder = (list: Todo[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const items = reorder(todos, result.source.index, result.destination.index);
        setTodos(items);

    };

    return (
        <>
            <div className='todo-list-name'>
                <input type="text" value={todoName} id='todoName' aria-label='todoName'
                    onChange={(e) => ps.onNameChange(e.target.value)} />
            </div>
            <div className="todo-list-container">
                <ul className="todo-list" aria-label="todo-list">
                    {ps.todos.map((todo, i) => (
                        <TodoItem key={`todo-` + i} {...todo} index={i}
                            onChange={updateTodoAtIndex}
                            handleKeyDown={handleKeyDown}
                            handleDelete={deleteTodoAtIndex}
                            toggleTodoCompleteAtIndex={toggleTodoCompleteAtIndex} />

                    ))}
                </ul>
            </div>
            <div className="todo-btns-action">
                <button className="btn-action" aria-label='add-todo'
                    style={{ 'fontSize': 'large', 'marginRight': '10px' }}
                    onClick={() => createTodoAtIndex(todos.length)}>&#43;</button>
                <button className="btn-action" aria-label='delete-todo-list'
                    onClick={() => setTodos([])}>&#x2715;</button>
            </div>
        </>
    )
}