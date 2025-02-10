const bcrypt	= require("bcrypt");
const pool		= require("../db");

require("dotenv").config();

const createUser = async (username, email, password) => {
	try {
		if (!password) throw new Error("Password is required");
		const hashedPass = await bcrypt.hash(password, parseInt(process.env.hash));
		const result = await pool.query(
			`INSERT INTO users(username, email, password)
			 VALUES ($1, $2, $3)
			 RETURNING *;
			`, [username, email, hashedPass]
		);
		console.log(result.rows);
		if (result.rows == [])
			throw new Error("No entry made");

		return result.rows[0];
	} catch (err) {
		console.error("Error:", err);
	}
};

const getUserByEmail = async (email) => {
	const result = await pool.query(
		"SELECT * FROM users WHERE email = $1",
		[email]
	);
	return result.rows[0];
};

module.exports = {
	createUser,
	getUserByEmail
};
