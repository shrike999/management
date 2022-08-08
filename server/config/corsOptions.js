const allowedOrigins = ['http://localhost:8080', 'http://localhost:3000']
const corsOptions = {
    credentials: true,
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowd by CORS'))
        }
    },
    optionSuccessStatus: 200
}

module.exports = corsOptions