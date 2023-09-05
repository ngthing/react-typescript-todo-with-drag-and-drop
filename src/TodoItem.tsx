
export interface Todo {
    id: string; content: string; isCompleted: boolean
}

interface TodoItemProps extends Todo {
    index: number;
    onChange: (content: string, i: number) => void;
    handleDelete: (i: number) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, i: number) => void;
    toggleTodoCompleteAtIndex: (i: number) => void;
};

export const TodoItem = (ps: TodoItemProps) => (
    <div className={`todo ${ps.isCompleted && 'todo-is-completed'}`}>
        <span className='todo-index'>#{ps.index + 1} </span>
        <div className="checkbox" onClick={() => ps.toggleTodoCompleteAtIndex(ps.index)}>
            {ps.isCompleted && (
                <span>&#x2714;</span>
            )}
        </div>
        <input type="text" value={ps.content} id={`todo-input-${ps.index}`} aria-label={`todo-input-${ps.index}`}
            onKeyDown={(e) => ps.handleKeyDown(e, ps.index)}
            onChange={(e) => ps.onChange(e.target.value, ps.index)} />
        <button className="btn-action" aria-label='delete-todo' onClick={() => ps.handleDelete(ps.index)}>&#x2715;</button>
    </div>
)