const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const token = req.cookies.accessToken
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                console.log('Authrization failed');
                console.log('accessToken:', token);
                return res.sendStatus(403)
            }
            console.log(token);
            req.username = decoded.userInfo.username
            req.userclass = decoded.userInfo.userclass
            next()
        }
    )
}

module.exports = verifyJWT