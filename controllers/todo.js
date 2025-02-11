const Todo = require("../models/todo");
const pool = require("../db.js");

const getAllTodos = async (req, res) => {
	try {
		const userID = await pool.query(`SELECT id FROM users WHERE username='${req.body.username}'`);
		if (userID.rows.length == 0) return res.status(400).json({ error: `No such username: ${req.body.username}` });
		const todos = await Todo.getTodos(userID.rows[0].id);
		res.status(200).json(todos);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getTodo = async (req, res) => {
	try {
		const { id } = req.params;
		const userID = await pool.query(`SELECT id FROM users WHERE username='${req.body.username}'`);
		if (userID.rows.length == 0) return res.status(400).json({ error: `No such username: ${req.body.username}` });
		const todo = await Todo.getTodoById(id, userID.rows[0].id);
		if (!todo) return res.status(404).json({ error: "Todo not found" });
		res.status(200).json(todo);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const createNewTodo = async (req, res) => {
	try {
		const { task, username } = req.body;
		const userID = await pool.query(`SELECT id FROM users WHERE username='${username}'`);
		if (userID.rows.length == 0) return res.status(400).json({ error: `No such username: ${username}` });
		if (!task) return res.status(400).json({ error: "Task is required" });
		const todo = await Todo.createTodo(task, userID.rows[0].id);
		res.status(201).json(todo);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateTodoStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const userID = await pool.query(`SELECT id FROM users WHERE username='${req.body.username}'`);
		if (userID.rows.length == 0) return res.status(400).json({ error: `No such username: ${req.body.username}` });

		const updatedTodo = await Todo.updateTodo(id);
		if (!updatedTodo) return res.status(404).json({ error: "Todo not found" });
		res.status(200).json(updatedTodo);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteTodoById = async (req, res) => {
	try {
		const { id } = req.params;
		const userID = await pool.query(`SELECT id FROM users WHERE username='${req.body.username}'`);
		if (userID.rows.length == 0) return res.status(400).json({ error: `No such username: ${req.body.username}` });
		await Todo.deleteTodo(id);
		res.status(204).json({ message: "Todo deleted successfully" });
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
