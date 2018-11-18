const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://lolo:qwerty12@ds121183.mlab.com:21183/tictactoe', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})

app.post('/score', (req, res) => { //tied to 'action' in form. route is tied to action in form
  console.log('y: ' + req.body.yWin);
  console.log('x: ' + req.body.xWin);
  let xWinValue = parseFloat(req.body.xWin) // turned string into number here. cant add words so get number out of string
  let yWinValue = parseFloat(req.body.yWin) // "_Win" is the value that the user enters in "name" in form
  db.collection('messages').save({name: req.body.name, xWin: xWinValue, yWin: yWinValue}, (err, result) => { // 'save' creates a DOCUMENT inside of the collection
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/messages', (req, res) => { //ALL these changes have already happened in main.js. ALL this put is doing is updating the db to show the new values
  db.collection('messages')
  .findOneAndUpdate({name: req.body.name }, {
      $set: {
        xWin:req.body.xWin,
        yWin:req.body.yWin

      }
  },{
    sort: {_id: -1},
    upsert: false
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


app.delete('/messages', (req, res) => {
  db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
