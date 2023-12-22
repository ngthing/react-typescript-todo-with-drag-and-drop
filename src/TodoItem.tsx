import { Draggable } from "react-beautiful-dnd";
import { Button, ItemContainer, ItemCheckbox, ItemIndex, ItemTextContainer, ItemText } from './StyledComponents';

export interface Todo {
    id: string; content: string; isCompleted: boolean
}

interface TodoItemProps extends Todo {
    index: number;
    onChange: (content: string, i: number) => void;
    handleDelete: (i: number) => void;
    handleKeyDown: (e: React.KeyboardEvent<HTMLElement>, i: number) => void;
    toggleTodoCompleteAtIndex: (i: number) => void;
};

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
            <ItemContainer key={ps.id} className={`${ps.isCompleted && 'todo-is-completed'}`}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <ItemIndex className='todo-index'>#{ps.index + 1} </ItemIndex>
                <ItemCheckbox className='checkbox' onClick={() => ps.toggleTodoCompleteAtIndex(ps.index)}>
                    {ps.isCompleted && (
                        <span>&#x2714;</span>
                    )}
                </ItemCheckbox>
                <ItemTextContainer>
                    <ItemText className="todoTextarea" wrap="off" value={ps.content} id={`todo-input-${ps.index}`} aria-label={`todo-input-${ps.index}`}
                        style={{ height: todoTextareaHeight(ps.content) }}
                        onKeyDown={(e) => ps.handleKeyDown(e, ps.index)}
                        onChange={(e) => ps.onChange(e.target.value, ps.index)} />
                </ItemTextContainer>
                <Button className="btn-delete-todo" aria-label='delete-todo' onClick={() => ps.handleDelete(ps.index)}>&#x2715;</Button>
            </ItemContainer>
        )}
    </Draggable>
) 