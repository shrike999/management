const usersDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const jwt = require('jsonwebtoken')
const fsPromise = require('fs').promises
const path = require('path')
const bcrypt = require('bcrypt')
const process = require('process')

const loginHandler = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ 'message': 'Username and password are required' })
    }
    let users = require('../model/users.json')
    console.log(users);
    const userAccount = users.find(acc => acc.username === username)
    if (!userAccount) {
        console.log('no such user:', username);
        return res.sendStatus(401)
    }
    const match = await bcrypt.compare(password, userAccount.password)
    if (!match) {
        console.log('wrong password');
        return res.sendStatus(401)
    }
    const accessToken = jwt.sign(
        {
            'userInfo': {
                'username': userAccount.username,
                'userclass': userAccount.userclass
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '300s' }
    )
    const refreshToken = jwt.sign(
        {
            'username': username
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
    )

    const otherUsers = usersDB.users.filter(person => person.username !== username)
    const currentUser = { ...userAccount, refreshToken }
    usersDB.setUsers([...otherUsers, currentUser])
    await fsPromise.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(usersDB.users)
    )
    res
        .status(201)
        .set('Access-Control-Allow-Credentials', true)
        .cookie('accessToken', accessToken, { httpOnly: true, maxAge: 60 * 60 * 1000, sameSite: 'None', domain: 'localhost', secure: true })
        .cookie('refreshToken', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None', domain: 'localhost', secure: true })
        .json({ accessToken })
}

module.exports = { loginHandler }