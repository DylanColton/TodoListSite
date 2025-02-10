const express	= require("express");

const { authenticate } = require("../middleware/auth");

const router	= express.Router();

const {
	getAllTodos,
	getTodo,
	createNewTodo,
	updateTodoStatus,
	deleteTodoById
} = require("../controllers/todo");

router.get("/todo", authenticate, async (req, res) => {
	try {
		const userId = req.userId;
		const todos = await getAllTodos(req, res);
		res.json(todos);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.get("/todo/:id", authenticate, async (req, res) => {
	try {
		const userId = req.userId;
		const todos = await getTodo;
		res.json(todos);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.post("/todo", authenticate, async (req, res) => {
	try {
		const userId = req.userId;
		const todos = await createNewTodo;
		res.json(todos);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

router.put("/todo/:id", authenticate, updateTodoStatus);

router.delete("/todo/:id", authenticate, deleteTodoById);

module.exports = router;
