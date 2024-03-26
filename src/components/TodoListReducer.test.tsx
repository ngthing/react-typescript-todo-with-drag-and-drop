import { Todo } from "./TodoItem";
import { todoListReducer, TodoListAction } from "./TodoListContext";

describe("todoListReducer", () => {
	const initialState: Todo[] = [
		{ id: "1", content: "Todo 1", isCompleted: false },
		{ id: "2", content: "Todo 2", isCompleted: true },
	];

	it("adds a todo", () => {
		const action: TodoListAction = { type: "added", index: 1 };
		const newTodos = todoListReducer(initialState, action);
		expect(newTodos.length).toBe(initialState.length + 1);
		expect(newTodos[1].content).toBe("");
		expect(newTodos[1].isCompleted).toBe(false);
	});

	it("deletes a todo", () => {
		const action: TodoListAction = { type: "deleted", index: 0 };
		const newTodos = todoListReducer(initialState, action);
		expect(newTodos.length).toBe(initialState.length - 1);
		expect(newTodos.findIndex((todo) => todo.id === "1")).toBe(-1);
	});

	it("updates a todo's content correctly", () => {
		const action: TodoListAction = {
			type: "updated_content",
			index: 0,
			content: "updated content",
		};
		const newTodos = todoListReducer(initialState, action);
		expect(newTodos.length).toBe(initialState.length);
		expect(newTodos[0].content).toBe("updated content");
	});

	it("toggles a todo's is complete value correctly", () => {
		const action: TodoListAction = {
			type: "toggled_complete",
			index: 0,
		};
		const newTodos = todoListReducer(initialState, action);
		expect(newTodos.length).toBe(initialState.length);
		expect(newTodos[0].isCompleted).toEqual(!initialState[0].isCompleted);
	});

	it("checks all todo complete", () => {
		const action: TodoListAction = {
			type: "checked_all",
		};
		const newTodos = todoListReducer(initialState, action);
		expect(newTodos.every((todo) => todo.isCompleted === true)).toEqual(
			true
		);
	});

	it("unchecks all todo complete", () => {
		const action: TodoListAction = {
			type: "unchecked_all",
		};
		const newTodos = todoListReducer(initialState, action);
		expect(newTodos.every((todo) => todo.isCompleted === false)).toEqual(
			true
		);
	});

	it("deletes all todo", () => {
		const action: TodoListAction = {
			type: "deleted_all",
		};
		const newTodos = todoListReducer(initialState, action);
		expect(newTodos.length).toBe(0);
	});

	it("reorders the todo item correctly", () => {
		const action: TodoListAction = {
			type: "reordered",
			index: 0,
			endIndex: 1,
		};
		const newTodos = todoListReducer(initialState, action);

		expect(newTodos[0]).toEqual(initialState[1]);
	});
});
