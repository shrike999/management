const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const path = require('path')
const fsPromise = require('fs').promises
const logOutHandler = async (req, res) => {
    const token = req.cookies.refreshToken
    if (!token) return res.sendStatus(204)
    const userAccount = usersDB.users.find(account => account.refreshToken === token)
    if (!userAccount) return res.sendStatus(204)
    const currentUser = { ...userAccount, refreshToken: '' }
    const otherUsers = usersDB.users.filter(account => account.refreshToken !== currentUser.refreshToken)
    console.log(otherUsers);
    usersDB.setUsers([otherUsers, currentUser])
    console.log(currentUser);
    await fsPromise.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    )
    res
        .status(201)
        .clearCookie('refreshToken', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None', domain: 'localhost', secure: true })
        .clearCookie('accessToken', { httpOnly: true, maxAge: 60 * 60 * 1000, sameSite: 'None', domain: 'localhost', secure: true })
        .json({ 'msg': 'logged out' })
}

module.exports = logOutHandler