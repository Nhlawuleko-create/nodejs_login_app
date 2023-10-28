const usersDB = {
	users: require("../model/users.json"),
	setUsers: function (data) {
		this.users = data;
	}
};

const getUsers = (req, res) => {
	res.json(usersDB.users);
};

module.exports = { getUsers };
