'use strict'

const express = require('express')
const bodyParse = require('body-parser')
const visual = require('./resource/js/recognition')
const formidable = require('formidable')
const connection = require('./resource/js/connection')
const fs = require('fs')

const app = express()
app.use(bodyParse.urlencoded({ extended: false }))
app.use(bodyParse.json())
app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/resource'))
app.use(express.static(__dirname + '/node_modules'))
app.use(express.static(__dirname + '/favicon.ico'))

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

app.get('/favicon.ico', (req, res) => {
    res.writeHead(200, {'Content-Type': 'image/x-icon'} )
    res.end()
})

app.post('/save/file', (req, resp) => {
    var incoming = new formidable.IncomingForm()
    incoming.uploadDir = './uploads' 
    incoming.parse(req)   
    incoming.on('fileBegin', (name, file) => {
        file.path = 'uploads/' + file.name
        let sql = `insert into imagenes(nombre) values('${file.name}')`
        connection.query(sql, (err, result, fields) => {
            if (err) console.log(err)
            console.log(result)
        })        
    })

    incoming.on('file', (name, file) => {
        var params = {
            images_file: fs.createReadStream(file.path)
        }
        visual.classify(params, (err, res) => {
        if (err) {
            console.log(err)
            resp.send("upss!, ocurrio un problema")
        }
        else {
            resp.writeHead(200, { 'Content-Type': 'text/json' })
            resp.write(JSON.stringify(res, null, 2))
        }       
        resp.end()
        })        
    })
     
})

app.listen(3000, () => {
    console.log('Server running in port 3000')
})
