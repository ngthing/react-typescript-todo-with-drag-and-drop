import { Ref } from 'react';
import { Draggable } from "react-beautiful-dnd";

export interface Todo {
    id: string; content: string; isCompleted: boolean
}

interface TodoItemProps extends Todo {
    index: number;
    onChange: (content: string, i: number) => void;
    handleDelete: (i: number) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLElement>, i: number) => void;
    toggleTodoCompleteAtIndex: (i: number) => void;
    mRef?: Ref<HTMLDivElement> | null;
};

export const TodoItem = (ps: TodoItemProps) => (
    <div className={`todo ${ps.isCompleted && 'todo-is-completed'}`} ref={ps.mRef}>
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
const todoTextareaHeight = (content: string): number => {
    // it works! muahaha - why these formula and numbers - no comment. 
    // but 25px is the min width i want to set.
    const x = 25 + Math.floor(content.length * 15 / window.innerWidth) * 25;
    // console.log([window.innerWidth, content.length, x])
    return x;
}

export const DragableTodoItem = (ps: TodoItemProps) => (
    <Draggable key={ps.id} draggableId={ps.id} index={ps.index}>
        {(provided) => (
            <div key={ps.id} className={`todo ${ps.isCompleted && 'todo-is-completed'}`}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <span className='todo-index'>#{ps.index + 1} </span>
                <div className="checkbox" onClick={() => ps.toggleTodoCompleteAtIndex(ps.index)}>
                    {ps.isCompleted && (
                        <span>&#x2714;</span>
                    )}
                </div>
                <div className="todo-text">
                    <textarea className='todoTextarea' wrap="off" value={ps.content} id={`todo-input-${ps.index}`} aria-label={`todo-input-${ps.index}`}
                        style={{ height: todoTextareaHeight(ps.content) }}
                        onKeyDown={(e) => ps.handleKeyDown(e, ps.index)}
                        onChange={(e) => ps.onChange(e.target.value, ps.index)} />
                </div>
                <button className="btn-action btn-delete-todo" aria-label='delete-todo' onClick={() => ps.handleDelete(ps.index)}>&#x2715;</button>
            </div>
        )}
    </Draggable>
) 