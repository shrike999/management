const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const bcrypt = require('bcrypt')
const path = require('path')
const fsPromise = require('fs').promises

const registerHandler = async (req, res) => {
    const { username, password, userclass } = req.body
    if (!username || !password || !userclass) {
        return res.sendStatus(400)
    }
    const duplicate = usersDB.users.find(user => user.username === username)
    if (duplicate) {
        return res.sendStatus(409)
    }
    try {
        const hashedPwd = await bcrypt.hash(password, 10)
        const currentUser = {
            'username': username,
            'userclass': userclass,
            'password': hashedPwd
        }
        const otherUsers = usersDB.users
        usersDB.setUsers([...otherUsers, currentUser])
        await fsPromise.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(usersDB.users)
        )
        res.sendStatus(201)
    } catch (error) {
        console.error(error)
    }
}

module.exports = { registerHandler }