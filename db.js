const Mock = require('mockjs')
const Random = Mock.Random
module.exports = ()=>{
    let data = { 
        list: [], 
        weekly: {lastWeek: [], thisWeek: []}, 
        total:[
            { value:277, name: 'html'},
            { value:200, name: 'css'},
            { value:324, name: 'javascript'},
            { value:298, name: 'vue'},
            { value:177, name: 'http'}
        ],
        userList: [],
        // Admin:[
        //     {
        //         type: super_admin,
        //         account: '123',
        //         password: '123'
        //     }
        // ] 
    }
    for(let i = 0; i < 7; i++){
        data.list.push({
            html: Math.floor(Math.random() * 100 + 30),
            css: Math.floor(Math.random() * 100 + 30),
            javascript: Math.floor(Math.random() * 100 + 30),
            vue: Math.floor(Math.random() * 100 + 30),
            http: Math.floor(Math.random() * 100 + 30),
        })
        //
        data.weekly.lastWeek.push(Math.floor(Math.random() * 5 + 5))
        data.weekly.thisWeek.push(Math.floor(Math.random() * 5 + 5))
        //
    }
    for(let i = 0; i < 30; i++){
        data.userList.push({
            name: Random.cname(),
            age: Math.floor(Math.random() * 20 + 18),
            gender: (Math.random() > 0.5)? '男':'女',
            birthdate: Random.datetime('yyyy-MM-dd'),
            address: Random.county(true)
        })
    }
    return data
}