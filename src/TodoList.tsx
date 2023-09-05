
import { Todo, DragableTodoItem } from './TodoItem';
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

interface TodoListNameProps {
    name: string;
    onNameChange: (name: string) => void;
}
const TodoListName = (ps: TodoListNameProps) => (
    <div className='todo-list-name'>
        <input type="text" value={ps.name} id='todoName' aria-label='todoName'
            onChange={(e) => ps.onNameChange(e.target.value)} />
    </div>
)
interface TodoListActionsProps {
    createTodo: () => void;
    deleteTodoList: () => void;
}
const TodoListActions = (ps: TodoListActionsProps) => (
    <div className="todo-btns-action">
        <button className="btn-action" aria-label='add-todo'
            style={{ 'fontSize': 'large', 'marginRight': '10px' }}
            onClick={() => ps.createTodo()}>&#43;</button>
        <button className="btn-action" aria-label='delete-todo-list'
            onClick={() => ps.deleteTodoList()}>&#x2715;</button>
    </div>
);

interface TodoListProps {
    name: string;
    todos: Todo[];
    onNameChange: (name: string) => void;
    setTodos: (todos: Todo[]) => void;
};

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
            id: `todo-${Date.now()}`,
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
            <TodoListName name={todoName} onNameChange={ps.onNameChange} />
            <DragDropContext onDragEnd={onDragEnd}>

                <Droppable droppableId='droppable'>
                    {provided => (
                        <div className="todo-list-container"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {ps.todos.map((todo, i) => (
                                <DragableTodoItem key={todo.id} index={i} {...todo}
                                    onChange={updateTodoAtIndex}
                                    handleKeyDown={handleKeyDown}
                                    handleDelete={deleteTodoAtIndex}
                                    toggleTodoCompleteAtIndex={toggleTodoCompleteAtIndex} />

                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <TodoListActions
                createTodo={() => createTodoAtIndex(todos.length)}
                deleteTodoList={() => setTodos([])} />
        </>
    )
}