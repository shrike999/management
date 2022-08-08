const fsPromise = require('fs').promises
const path = require('path')
const fs = require('fs');

const logEvents = async (message, fileName) => {
    const dateTime = new Date()
    const logItem = `${message}\t${dateTime}\n`

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromise.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromise.appendFile(
            path.join(__dirname, '..', 'logs', fileName),
            logItem
        )
    } catch (error) {
        console.log(error);
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    console.log(req.method, req.path);
    next()
}

module.exports = { logEvents, logger }