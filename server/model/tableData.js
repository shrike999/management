const Mock = require('mockjs')
const Random = Mock.Random

let list = []
let weekly = { lastWeek: [], thisWeek: [] }
let total = [
    { value: 277, name: 'html' },
    { value: 200, name: 'css' },
    { value: 324, name: 'javascript' },
    { value: 298, name: 'vue' },
    { value: 177, name: 'http' },
]
let userList = []
for (let i = 0; i < 7; i++) {
    list.push({
        html: Math.floor(Math.random() * 100 + 30),
        css: Math.floor(Math.random() * 100 + 30),
        javascript: Math.floor(Math.random() * 100 + 30),
        vue: Math.floor(Math.random() * 100 + 30),
        http: Math.floor(Math.random() * 100 + 30),
    })
    //
    weekly.lastWeek.push(Math.floor(Math.random() * 5 + 5))
    weekly.thisWeek.push(Math.floor(Math.random() * 5 + 5))
    //
}
for (let i = 0; i < 500; i++) {
    userList.push({
        name: Random.cname(),
        age: Math.floor(Math.random() * 20 + 18),
        gender: (Math.random() > 0.5) ? '男' : '女',
        birthdate: Random.datetime('yyyy-MM-dd'),
        address: Random.county(true)
    })
}

module.exports = { list, weekly, userList, total }