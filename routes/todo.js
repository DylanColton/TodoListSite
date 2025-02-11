const express	= require("express");
const pool		= require("../db.js");

const { authenticate } = require("../middleware/auth");

const router	= express.Router();

const {
	getAllTodos,
	getTodo,
	createNewTodo,
	updateTodoStatus,
	deleteTodoById
} = require("../controllers/todo");

router.get("/todo", authenticate, getAllTodos);

router.get("/todo/:id", authenticate, getTodo);

router.post("/todo", authenticate, createNewTodo);

router.put("/todo/:id", authenticate, updateTodoStatus);

router.delete("/todo/:id", authenticate, deleteTodoById);

module.exports = router;
