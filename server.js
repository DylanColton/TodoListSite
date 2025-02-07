const methodOverride	= require("method-override");
const bodyparser		= require("body-parser");
const express			= require("express");
const ejs				= require("ejs");

require("dotenv").config();

const PORT = (process.env.TEST == 1 ? process.env.TEST_PORT : process.env.PORT);

let app = express();
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
	try {
		res.status(200).send("Hello");
		/*
		const todos = await pool.query("SELECT * FROM todos ORDER BY id ASC");
		res.render("index", { todos: todos.rows });
		*/
	} catch (err) {
		res.status(500).send("Oops");
		console.error(err.message);
	}
});

process.on("SIGINT", () => {
	console.log("Closing server. Cleaning resources...");
	process.exit(0);
});
app.listen(PORT, () => {
	console.log("Listening on", PORT);
});
