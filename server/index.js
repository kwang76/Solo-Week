const express = require('express')
const parser = require('body-parser')
const axios = require('axios')
const bcrypt = require('bcrypt')
const path = require('path')
const db = require('../database/index.js')

const app = express()

app.use(express.static(__dirname + '/../client/dist'))
app.use(parser.json())

var session = require('express-session')({
  secret: 'i can haz workout',
})

app.use(session)

app.get('/isloggedin', (req, res) => {
  res.send(!!req.session && !!req.session.user)
})

app.post('/signup', (req, res) => {
  let firstName = req.body.firstName
  let lastName = req.body.lastName
  let username = req.body.username
  let password = req.body.password
  let email = req.body.email
  // console.log('this mah body', req.body)
  if (firstName === null || lastName === null || username === null || password === null || email === null) {
    res.send('Sorry can\'t leave this field blank')
  }
  let salt
  db.findUser(username)
    .then((dbres) => {
      if (dbres.length > 0) {
        throw('Sorry username aleady exists')
      }
      return bcrypt.genSalt(10)
    })
    .then((saltResult) => {
      salt = saltResult
      return bcrypt.hash(password, salt)
    })
    .then((hash) => {
      return db.createUser(firstName, lastName, username, hash, salt, email)
    })
    .then((dbres) => {
      return req.session.regenerate((err) => {
        if (err) {
          console.log('Error regenerating the session')
        }
        req.session.user = username
        console.log('User was successfully signed up', username)
        res.send('User was signed up')
      });
    })
    .catch((err) => {
      console.error('Error in signing user up', err)
      res.send('Error signing up new user')
    })
})

app.post('/login', (req, res) => {
  let username = req.body.username
  let password = req.body.password

  let hashedPassword
  db.findUser(username)
    .then((dbRes) => {
      if (dbRes.length === 0) {
        throw('Username does not exist')
      }
      hashedPassword = dbRes[0].password
      return bcrypt.hash(password, dbRes[0].salt)
    })
    .then((hashResult) => {
      if (hashedPassword !== hashResult) {
        throw('Sorry wrong password, try again')
      }
      req.session.regenerate(function(){
        req.session.user = username
        res.send('Session was created')
      });
    })
    .catch((err) => {
      console.error('There was an errror logging in', err)
      res.send('Error logging in')
    })
})

app.post('/logout', (req, res) => {
  if (req.session === undefined || req.session.user === undefined) {
    res.send('Cannot logout without an active session')
    return;
  }
  req.session.destroy()
  res.send('You were logged out')
})

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/dist/index.html'))
})

/*
==================================================================================================
*/














app.post('/addExercise', function(req, res) {

})

app.get('/exercises', function(req, res) {
  db.getExercises()
    .then((response)=> {
      console.log('response from db is', response)
      res.send(response)
    })
    .catch((err) =>{
      console.log('Error in getting exercises in server')
    })
})






const port = 3000

app.listen(3000, function() {
  console.log('Listening in on port', `${port}`)
})
