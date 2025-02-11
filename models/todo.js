const pool = require("../db");

const getTodos = async (user_id) => {
	const result = await pool.query(`SELECT * FROM todos WHERE userid=${user_id} ORDER BY id ASC`);
	return result.rows;
};

const getTodoById = async (id, user_id) => {
	const result = await pool.query(`SELECT * FROM todos WHERE id=${id} AND userid=${user_id}`);
	return result.rows[0];
};

const createTodo = async (task, userID) => {
	const result = await pool.query(`INSERT INTO todos (userid, task) VALUES (${userID}, '${task}') RETURNING *`);
	return result.rows[0];
};

const updateTodo = async (id) => {
	const result = await pool.query(`UPDATE todos SET completed=NOT completed WHERE id=${id} RETURNING *`);
	return result.rows[0];
};

const deleteTodo = async (id) => {
	await pool.query(`DELETE FROM todos WHERE id=${id}`);
};

module.exports = {
	getTodos,
	getTodoById,
	createTodo,
	updateTodo,
	deleteTodo
};
