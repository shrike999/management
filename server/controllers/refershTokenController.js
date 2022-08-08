const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}
const jwt = require('jsonwebtoken')

const refreshHandler = (req, res) => {
    const cookie = req.cookies
    if (!cookie) {
        console.log('no cookie has been sent');
        return res.sendStatus(401)
    }
    const userAccount = userDB.users.find(acc => acc.refreshToken === cookie.refreshToken)
    if (!userAccount) {
        return res.sendStatus(403)
    }
    jwt.verify(
        cookie.refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || userAccount.username !== decoded.username) {
                return res.sendStatus(403)
            }
            const accessToken = jwt.sign(
                {
                    'userInfo': {
                        'username': userAccount.username,
                        'userclass': userAccount.userclass
                    },
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '300s' },
            )
            res
                .status(201)
                .cookie('accessToken', accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, sameSite: 'None', domain: 'localhost', secure: true })
                .json({ 'msg': 'waaaat' })
        }
    )
}

module.exports = refreshHandler