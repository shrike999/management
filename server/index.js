require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const { list, weekly, total, userList } = require('./model/tableData')
const PORT = process.env.PORT || 3000
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const { loginHandler } = require('./controllers/authController')
const { registerHandler } = require('./controllers/registerController')
const refreshHandler = require('./controllers/refershTokenController')
const logOutHandler = require('./controllers/logOutController')
const nameCheckHandler = require('./controllers/nameCheckController')
const verifyJWT = require('./middleware/verifyJWT')
const path = require('path')
const { logger } = require('./middleware/logEvents')
const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(logger)
app.use(cors(corsOptions))

app.post('/namecheck', nameCheckHandler)
app.get('/refresh', refreshHandler)
app.post('/register', registerHandler)
app.post('/login', loginHandler)
app.get('/logout', logOutHandler)

app.get('/userList', (req, res) => {
    res.status(200).json(userList)
})
app.get('/list', (req, res) => {
    res.status(200).json(list)
})
app.get('/weekly', (req, res) => {
    res.status(200).json(weekly)
})
app.get('/total', (req, res) => {
    res.status(200).json(total)
})
app.use(verifyJWT)

app.get('/menu', (req, res) => {
    if (req.userclass === 'admin') {
        res.sendFile(path.join(__dirname, 'model', 'menu2.json'))
    } else if (req.userclass === 'super_admin') {
        res.sendFile(path.join(__dirname, 'model', 'menu1.json'))
    }
})

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendStatus(404)
    } else if (req.accepts('json')) {
        res.json({ error: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})