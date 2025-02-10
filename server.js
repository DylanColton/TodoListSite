const methodOverride	= require("method-override");
const bodyparser		= require("body-parser");
const express			= require("express");
const cors				= require("cors");
const ejs				= require("ejs");

const todoRoutes		= require("./routes/todo");
const userRoutes		= require("./routes/user");

require("dotenv").config();

const PORT = (process.env.TEST == 1 ? process.env.TEST_PORT : process.env.PORT);

let app = express();
app.use(cors());
app.use(express.json());
app.use("/api", todoRoutes);
app.use("/api", userRoutes);
app.use(bodyparser.urlencoded({ extended: true }));

process.on("SIGINT", () => {
	console.log("Closing server. Cleaning resources...");
	process.exit(0);
});
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Listening on http://0.0.0.0:${PORT}/`);
});
