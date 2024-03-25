import { createContext, useContext, useReducer } from "react";
import { Todo } from "./TodoItem";

const saveTodosToLocalStorage = (todos: Todo[]): void => {
	localStorage.setItem("todos", JSON.stringify(todos));
};

export interface TodoListAction {
	type:
		| "added"
		| "deleted"
		| "updated_content"
		| "toggled_complete"
		| "checked_all"
		| "unchecked_all"
		| "deleted_all"
		| "reordered"
		| "get_state";
	index?: number;
	endIndex?: number;
	content?: string;
	newTodos?: Todo[];
}

export const todoListReducer = (
	todos: Todo[],
	action: TodoListAction
): Todo[] => {
	let newTodos: Todo[] = [];

	switch (action.type) {
		case "added": {
			newTodos = [...todos];
			if (action.index !== undefined)
				newTodos.splice(action.index, 0, {
					id: `todo-${Date.now()}`,
					content: "",
					isCompleted: false,
				});
			break;
		}
		case "deleted": {
			newTodos = todos.filter((t, index) => index !== action.index);
			break;
		}
		case "updated_content": {
			newTodos = todos.map((t, index) =>
				index === action.index
					? { ...t, content: action.content ?? t.content }
					: t
			);
			break;
		}
		case "toggled_complete":
			newTodos = todos.map((t, index) =>
				index === action.index
					? { ...t, isCompleted: !t.isCompleted }
					: t
			);
			break;
		case "checked_all":
			newTodos = todos.map((t) => ({ ...t, isCompleted: true }));
			break;
		case "unchecked_all":
			newTodos = todos.map((t) => ({ ...t, isCompleted: false }));
			break;
		case "reordered": {
			if (action.index !== undefined && action.endIndex !== undefined) {
				newTodos = [...todos];
				const [removed] = newTodos.splice(action.index, 1);
				newTodos.splice(action.endIndex, 0, removed);
			} else {
				newTodos = todos;
			}
			break;
		}
		case "deleted_all":
			newTodos = [];
			break;
		default: {
			throw new Error("Unknown action: " + action.type);
		}
	}

	// Save todos to localStorage whenever they are updated
	saveTodosToLocalStorage(newTodos);

	return newTodos;
};

const TodoListContext = createContext<Todo[] | null>(null);
const TodoListDispatchContext =
	createContext<React.Dispatch<TodoListAction> | null>(null);

export function TodoListProvider({
	initialTodos,
	children,
}: {
	initialTodos: Todo[];
	children: React.ReactNode;
}) {
	const [todos, dispatch] = useReducer(todoListReducer, initialTodos);
	return (
		<TodoListContext.Provider value={todos}>
			<TodoListDispatchContext.Provider value={dispatch}>
				{children}
			</TodoListDispatchContext.Provider>
		</TodoListContext.Provider>
	);
}
export const useTodoList = () => {
	const context = useContext(TodoListContext);
	if (context === null) {
		throw new Error("useTodoList must be used within a TodoListProvider");
	}
	return context;
};

export const useTodoListDispatch = () => {
	const context = useContext(TodoListDispatchContext);
	if (context === null) {
		throw new Error(
			"useTodoListDispatch must be used within a TodoListProvider"
		);
	}
	return context;
};
