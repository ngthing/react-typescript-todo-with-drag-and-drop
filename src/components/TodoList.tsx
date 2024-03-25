import { useState } from "react";
import { Todo, DragableTodoItem } from "./TodoItem";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { ListContainer, ListTitle, TitleInput } from "./StyledComponents";
import { TodoListActions } from "./TodoListActions";
import { MUISnackbar } from "./CustomizedMui";
import { useTodoList, useTodoListDispatch } from "./TodoListContext";

interface TodoListNameProps {
	name: string;
	onNameChange: (name: string) => void;
}

const TodoListName = (ps: TodoListNameProps) => (
	<ListTitle>
		<TitleInput
			type="text"
			value={ps.name}
			id="todoName"
			aria-label="todoName"
			onChange={(e) => ps.onNameChange(e.target.value)}
		/>
	</ListTitle>
);
interface TodoListStatsProps {
	completed: number;
	total: number;
}
const TodoListStats = (ps: TodoListStatsProps) => (
	<div className="todo-list-stats">
		{ps.total > 0 ? (
			ps.completed > 0 && (
				<span>
					Completed {ps.completed} / {ps.total}
				</span>
			)
		) : (
			<span>Add something to do 🎯</span>
		)}
		{ps.completed > 0 && <span className="completedCheck">&#x2714;</span>}
		{ps.completed === ps.total && ps.total > 0 && (
			<span className="allDone"> well done!! 👏 🤩</span>
		)}
	</div>
);
const getTodoListStats = (todos: Todo[]): TodoListStatsProps => {
	const completed = todos.reduce(
		(completed, todo) => (completed += todo.isCompleted ? 1 : 0),
		0
	);
	return { completed: completed, total: todos.length };
};

interface TodoListProps {
	name: string;
	onNameChange: (name: string) => void;
}

export const TodoList = (ps: TodoListProps) => {
	const [showCopiedMessage, setShowCopiedMessage] = useState(false);
	const todoName = ps.name;
	const todos = useTodoList();
	const dispatch = useTodoListDispatch();
	const todoListStats = getTodoListStats(todos);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, i: number) => {
		if (e.key === "Enter") createTodoAtIndex(i + 1);
	};
	const createTodoAtIndex = (i: number) => {
		dispatch({ type: "added", index: i });
		setTimeout(() => {
			(
				document.getElementById(`todo-input-` + i) as HTMLElement
			)?.focus();
		}, 10);
	};
	const updateTodoAtIndex = (content: string, i: number) =>
		dispatch({
			type: "updated_content",
			index: i,
			content: content.replace(/[\n\r]/g, ""),
		});

	const deleteTodo = (i: number) => dispatch({ type: "deleted", index: i });

	const toggleTodoCompleteAtIndex = (i: number) =>
		dispatch({
			type: "toggled_complete",
			index: i,
		});

	const checkAll = () => dispatch({ type: "checked_all", index: 0 });
	const uncheckAll = () => dispatch({ type: "unchecked_all", index: 0 });

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;
		dispatch({
			type: "reordered",
			index: result.source.index,
			endIndex: result.destination.index,
		});
	};

	const copyList = () => {
		const listAsText = todos
			.map((todo) => (todo.isCompleted ? "✔️ " : "👉 ") + todo.content)
			.join("\n");
		navigator.clipboard.writeText(todoName + "\n " + listAsText);
		setShowCopiedMessage(true);
	};

	return (
		<>
			<TodoListName name={todoName} onNameChange={ps.onNameChange} />
			<TodoListStats
				completed={todoListStats.completed}
				total={todoListStats.total}
			/>
			{todoListStats.total > 0 &&
				todoListStats.completed === todoListStats.total && (
					<div className="uncheck-all">
						<button onClick={() => uncheckAll()}>
							Uncheck All ♻️
						</button>
					</div>
				)}
			<DragDropContext onDragEnd={onDragEnd}>
				<StrictModeDroppable droppableId="droppable">
					{(provided) => (
						<ListContainer
							ref={provided.innerRef}
							{...provided.droppableProps}
						>
							{todos.map((todo, i) => (
								<DragableTodoItem
									key={todo.id}
									index={i}
									{...todo}
									onChange={updateTodoAtIndex}
									handleKeyDown={handleKeyDown}
									handleDelete={deleteTodo}
									toggleTodoCompleteAtIndex={
										toggleTodoCompleteAtIndex
									}
								/>
							))}
							{provided.placeholder}
						</ListContainer>
					)}
				</StrictModeDroppable>
			</DragDropContext>
			<TodoListActions
				checkAll={checkAll}
				uncheckAll={uncheckAll}
				createTodo={() => createTodoAtIndex(todos.length)}
				deleteTodoList={() => dispatch({ type: "deleted_all" })}
				copyList={copyList}
			/>
			<MUISnackbar
				open={showCopiedMessage}
				message="Todo list is copied to clipboard!"
				type="success"
				setOpen={setShowCopiedMessage}
			></MUISnackbar>
		</>
	);
};
