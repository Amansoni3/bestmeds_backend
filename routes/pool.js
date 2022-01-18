var mysql = require("mysql")
pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '123',
    database: 'bestmeds',
    connectionLimit: 100
})

module.exports = pool