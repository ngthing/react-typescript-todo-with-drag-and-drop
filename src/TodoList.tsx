import { useState } from "react";
import { Todo, DragableTodoItem } from "./TodoItem";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { ListContainer, ListTitle, TitleInput } from "./StyledComponents";
import { TodoListActions } from "./TodoListActions";
import { MUISnackbar } from "./CustomizedMui";

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
	todos: Todo[];
	onNameChange: (name: string) => void;
	setTodos: (todos: Todo[]) => void;
}

export const TodoList = (ps: TodoListProps) => {
	const [showCopiedMessage, setShowCopiedMessage] = useState(false);
	const todoName = ps.name;
	const todos = ps.todos;
	const setTodos = ps.setTodos;
	const todoListStats = getTodoListStats(todos);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>, i: number) => {
		if (e.key === "Enter") createTodoAtIndex(i + 1);
	};
	const createTodoAtIndex = (i: number) => {
		const newTodos = [...todos];
		newTodos.splice(i, 0, {
			id: `todo-${Date.now()}`,
			content: "",
			isCompleted: false,
		});
		setTodos(newTodos);
		setTimeout(() => {
			(document.getElementById(`todo-input-` + i) as HTMLElement).focus();
		}, 0);
	};
	const updateTodoAtIndex = (content: string, i: number) => {
		const newTodos = [...todos];
		newTodos[i].content = content.replace(/[\n\r]/g, "");
		setTodos(newTodos);
	};
	const deleteTodoAtIndex = (i: number) => {
		setTodos(todos.slice(0, i).concat(todos.slice(i + 1)));
	};
	const toggleTodoCompleteAtIndex = (i: number) => {
		const newTodos = [...todos];
		newTodos[i].isCompleted = !newTodos[i].isCompleted;
		setTodos(newTodos);
	};

	// a little function to help us with reordering the result
	const reorder = (list: Todo[], startIndex: number, endIndex: number) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	const checkAll = () => {
		const newTodos = [...todos];
		newTodos.forEach((todo) => (todo.isCompleted = true));
		setTodos(newTodos);
	};
	const uncheckAll = () => {
		const newTodos = [...todos];
		newTodos.forEach((todo) => (todo.isCompleted = false));
		setTodos(newTodos);
	};

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return;
		const items = reorder(
			todos,
			result.source.index,
			result.destination.index
		);
		setTodos(items);
	};

	const copyList = () => {
		const listAsText = todos
			.map((todo) => (todo.isCompleted ? "✅ " : "👉 ") + todo.content)
			.join("\n");
		navigator.clipboard.writeText(listAsText);
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
							{ps.todos.map((todo, i) => (
								<DragableTodoItem
									key={todo.id}
									index={i}
									{...todo}
									onChange={updateTodoAtIndex}
									handleKeyDown={handleKeyDown}
									handleDelete={deleteTodoAtIndex}
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
				deleteTodoList={() => setTodos([])}
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
