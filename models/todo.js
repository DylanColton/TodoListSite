const pool = require("../db");

const getTodos = async () => {
	const result = await pool.query("SELECT * FROM todo ORDER BY id ASC");
	return result.rows;
};

const getTodoById = async (id) => {
	const result = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
	return result.rows[0];
};

const createTodo = async (task) => {
	const result = await pool.query("INSERT INTO todo (task) VALUES ($1) RETURNING *", [task]);
	return result.rows[0];
};

const updateTodo = async (id) => {
	const result = await pool.query(
		"UPDATE todo SET completed = NOT completed WHERE id = $1 RETURNING *",
		[id]
	);
	return result.rows[0];
};

const deleteTodo = async (id) => {
	await pool.query("DELETE FROM todo WHERE id = $1", [id]);
};

module.exports = {
	getTodos,
	getTodoById,
	createTodo,
	updateTodo,
	deleteTodo
};
