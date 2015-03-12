"use strict"

const levelup = require('levelup')
const db = levelup('./mydb')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const through2 = require('through2')
app.use('/', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const resWriter = function(res){
  res.writeHead(200, {"Content-Type": "application/json"})
  let stream = db.createReadStream()
  let result = []
  stream.on('data', function(data){
    result.push({
      author: data.key,
      text: data.value
    })
  })
  stream.on('end', function(){
    res.end(JSON.stringify(result))
  })
}
app.get('/comments.json', function(req, res) {
  resWriter(res)
})

app.post('/comments.json', function(req, res) {
  db.put(req.body.author, req.body.text, function(err){
    resWriter(res)
  })
})

app.listen(3000, function(){
  console.log('Server started: http://localhost:3000/')
})

