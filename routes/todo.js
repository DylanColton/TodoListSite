const express	= require("express");
const router	= express.Router();

const {
	getAllTodos,
	getTodo,
	createNewTodo,
	updateTodoStatus,
	deleteTodoById
} = require("../controllers/todo");

router.get("/todo", getAllTodos);
router.get("/todo/:id", getTodo);
router.post("/todo", createNewTodo);
router.put("/todo/:id", updateTodoStatus);
router.delete("/todo/:id", deleteTodoById);

module.exports = router;
