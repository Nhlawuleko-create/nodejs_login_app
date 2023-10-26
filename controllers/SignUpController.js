const usersDB = {
	users: require("../model/users"),
	setUsers: function (data) {
		this.users = data;
	}
};

const path = require("path");
const fsPromises = require("fs/promises");
const bcrypt = require("bcrypt");

const handleSignUp = async (req, res) => {
	const { user, pwd } = req.body;
	if (!user || !pwd)
		return res.status(400).send("Both username and password are required");

	const duplicate = usersDB.users.find((person) => person.username === user);
	if (duplicate) return res.sendStatus(409);

	try {
		const hashedPwd = await bcrypt.hash(pwd, 10);

		const newUser = { username: user, password: hashedPwd };

		usersDB.setUsers([...usersDB.users, newUser]);
		await fsPromises.writeFile(
			path.join(__dirname, "..", "model", "users.json"),
			JSON.stringify(usersDB.users)
		);
		console.log(usersDB.users);

		res.status(201).send(`User ${user} is now signed up.`);
	} catch (err) {
		res.status(500).send(`error: ${err.message}`);
	}
};

module.exports = { handleSignUp };
