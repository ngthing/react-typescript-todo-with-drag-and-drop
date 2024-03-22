import { createContext, useContext, useReducer } from "react";
import { Todo } from "./TodoItem";

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
	switch (action.type) {
		case "added": {
			const newTodos = [...todos];
			if (action.index !== undefined)
				newTodos.splice(action.index, 0, {
					id: `todo-${Date.now()}`,
					content: "",
					isCompleted: false,
				});
			return newTodos;
		}
		case "deleted": {
			return todos.filter((t, index) => index !== action.index);
		}
		case "updated_content": {
			return todos.map((t, index) =>
				index === action.index
					? { ...t, content: action.content ?? t.content }
					: t
			);
		}
		case "toggled_complete":
			return todos.map((t, index) =>
				index === action.index
					? { ...t, isCompleted: !t.isCompleted }
					: t
			);
		case "checked_all":
			return todos.map((t) => ({ ...t, isCompleted: true }));
		case "unchecked_all":
			return todos.map((t) => ({ ...t, isCompleted: false }));
		case "reordered": {
			if (action.index && action.endIndex) {
				const newTodos = [...todos];
				const [removed] = newTodos.splice(action.index, 1);
				newTodos.splice(action.endIndex, 0, removed);
				return newTodos;
			} else return todos;
		}
		case "deleted_all":
			return [];
		case "get_state":
			return todos;
		default: {
			throw new Error("Unknown action: " + action.type);
		}
	}
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
