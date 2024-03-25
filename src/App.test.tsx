/* eslint-disable testing-library/no-debugging-utils */
import App from "./App";
import React from "react";
import { render, screen } from "@testing-library/react";

describe("App", () => {
	it("renders App component and has a Todo list name and default action buttons", () => {
		render(<App />);
		expect(screen.getByLabelText("todoName")).toBeInTheDocument();
		expect(screen.getByLabelText("add-todo")).toBeInTheDocument();
		expect(screen.getByLabelText("delete-todo-list")).toBeInTheDocument();
		expect(screen.getByLabelText("check-all-todo")).toBeInTheDocument();
		expect(screen.getByLabelText("uncheck-all-todo")).toBeInTheDocument();
		expect(screen.getByLabelText("copy-list")).toBeInTheDocument();
	});
});
