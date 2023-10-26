const usersDB = {
	users: require("../model/users"),
	setUsers: function (data) {
		this.users = data;
	}
};

const path = require("path");
const fsPromises = require("fs/promises");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleLogin = async (req, res) => {
	const { user, pwd } = req.body;

	const foundUser = usersDB.users.find((person) => person.username === user);
	if (!foundUser) return res.sendStatus(401);

	const match = await bcrypt.compare(pwd, foundUser.password);
	if (match) {
		const accessToken = jwt.sign(
			{ username: user },
			process.env.ACCESS_TOKEN_SECRET
		);

		const refreshToken = jwt.sign(
			{ username: user },
			process.env.REFRESH_TOKEN_SECRET,
			{ expiresIn: "1d" }
		);

		const otherUsers = usersDB.users.filter(
			(person) => person.username !== foundUser.username
		);
		const currentUser = { ...foundUser, refreshToken };

		usersDB.setUsers([...otherUsers, currentUser]);
		await fsPromises.writeFile(
			path.join(__dirname, "..", "model", "users.json"),
			JSON.stringify(usersDB.users)
		);

		res.cookie("jwt", refreshToken, {
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000
		});
		res.json({ accessToken });
	} else {
		res.sendStatus(401);
	}
};

module.exports = { handleLogin };
