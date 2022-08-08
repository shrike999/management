const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const nameCheckHandler = (req, res) => {
    const { name } = req.body
    const duplicate = usersDB.users.find(account => account.username === name)
    if (duplicate) return res.sendStatus(409)
    res.sendStatus(200)
}

module.exports = nameCheckHandler