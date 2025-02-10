const bcrypt	= require("bcrypt");
const jwt		= require("jsonwebtoken");

const User		= require("../models/user");

const signup = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const newUser = await User.createUser(username, email, password);
		if (!newUser)
			throw new Error("No user created");
		res.status(201).json({ message: "User created", user: newUser});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.getUserByEmail(email);
		if (!user)
			return res.status(401).json({ error: "Invalid email or password" });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
		return res.status(401).json({ error: "Invalid email or password" });

		const token = jwt.sign(
			{ userID: user.id },
			process.env.JWT_SECRET,
			{ expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
		);
		res.json({ token });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	signup,
	login
};
