const mysql = require('mysql')

var connection = mysql.createConnection({
    host     : '35.205.146.254',
    user     : 'user_test',
    password : '115jeferUFPS',
    database : 'recognition'
  })
   
connection.connect( (err) => {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return
    }     
    console.log('conexion establecida')
})

module.exports = connection