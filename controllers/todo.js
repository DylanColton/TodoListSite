const Todo = require("../models/todo");

const getAllTodos = async (req, res) => {
	try {
		const todos = await Todo.getTodos();
		res.json(todos);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const todo = await Todo.getTodoById(id);
		if (!todo) return res.status(404).json({ error: "Todo not found" });
		res.json(todo);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const createNewTodo = async (req, res) => {
	try {
		const { task } = req.body;
		if (!task) return res.status(400).json({ error: "Task is required" });
		const todo = await Todo.createTodo(task);
		res.status(201).json(todo);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateTodoStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedTodo = await Todo.updateTodo(id);
		if (!updatedTodo) return res.status(404).json({ error: "Todo not found" });
		res.json(updatedTodo);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteTodoById = async (req, res) => {
	try {
		const { id } = req.params;
		await Todo.deleteTodo(id);
		res.json({ message: "Todo deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	getAllTodos,
	getTodo,
	createNewTodo,
	updateTodoStatus,
	deleteTodoById
};
