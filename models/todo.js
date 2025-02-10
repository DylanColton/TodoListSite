const pool = require("../db");

const getTodos = async (user_id) => {
	const result = await pool.query("SELECT * FROM todos WHERE user_id=$1 ORDER BY id ASC", [user_id]);
	return result.rows;
};

const getTodoById = async (id) => {
	const result = await pool.query("SELECT * FROM todos WHERE id = $1", [id]);
	return result.rows[0];
};

const createTodo = async (task, userID) => {
	const result = await pool.query("INSERT INTO todos (user_id, task) VALUES ($1, $2) RETURNING *", [task, userID]);
	return result.rows[0];
};

const updateTodo = async (id) => {
	const result = await pool.query(
		"UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *",
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
