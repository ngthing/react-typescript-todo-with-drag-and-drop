/* eslint-disable testing-library/no-debugging-utils */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
	TodoListProvider,
	useTodoList,
	useTodoListDispatch,
} from "./TodoListContext";

// Mock initial todos
const initialTodos = [
	{ id: "todo-1", content: "Todo 1", isCompleted: false },
	{ id: "todo-2", content: "Todo 2", isCompleted: true },
];

// Mock child component to consume the context
const MockChildComponent = () => {
	const todos = useTodoList();
	const dispatch = useTodoListDispatch();

	return (
		<>
			<div data-testid="todos">{JSON.stringify(todos)}</div>
			<button
				onClick={() =>
					dispatch({ type: "added", index: 0 /* or any index */ })
				}
				data-testid="addTodoButton"
			>
				Add Todo
			</button>
			<button
				onClick={() =>
					dispatch({ type: "deleted", index: 0 /* or any index */ })
				}
				data-testid="delTodoButton"
			>
				Delete Todo
			</button>
		</>
	);
};

// Test case for context provider setting initial state
test("TodoListProvider sets initial state correctly", () => {
	render(
		<TodoListProvider initialTodos={initialTodos}>
			<MockChildComponent />
		</TodoListProvider>
	);

	const todos = screen.getByTestId("todos");
	expect(todos).toHaveTextContent(JSON.stringify(initialTodos));
});

// Test case for context provider providing correct values to children
test("TodoListProvider provides correct values to children", () => {
	render(
		<TodoListProvider initialTodos={initialTodos}>
			<MockChildComponent />
		</TodoListProvider>
	);

	const addTodoButton = screen.getByTestId("addTodoButton");
	const delTodoButton = screen.getByTestId("delTodoButton");

	// Simulate adding a todo
	fireEvent.click(addTodoButton);

	// Check if the todo is added
	let todos = JSON.parse(screen.getByTestId("todos")?.textContent ?? "");
	expect(todos.length).toEqual(initialTodos.length + 1);

	fireEvent.click(delTodoButton);
	todos = JSON.parse(screen.getByTestId("todos")?.textContent ?? "");
	expect(todos.length).toEqual(initialTodos.length);
});
