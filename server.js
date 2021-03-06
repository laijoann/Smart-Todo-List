"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const path    = require("path");
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  secret: 'cookieKey'
}))
const bcrypt = require('bcrypt');
const wikipedia = require("node-wikipedia");

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");

const wikiQuery = require('./wikiAPI.js');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.

app.use(morgan('dev'));
// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
// Mount all resource routes
app.use("/user/dashboard", usersRoutes(knex));

app.get("/", (req, res) => {
  if (req.session.userId) {
    res.redirect('/dashboard');
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
}); //homepage aka log in page

app.get("/dashboard", (req, res) => {
  if (req.session.userId) {
    res.sendFile(__dirname + "/public/dashboard.html");
  } else {
    res.redirect('/');
  };
}); //dashboard

app.post("/", (req, res) => {
  const cookieEmail = req.body.email;
  const cookiePassword = req.body.password;

  knex.select('name', 'id', 'password')
  .from('usersdb')
  .where('email', cookieEmail)
  .then((resultsArr) => {
    try {
      if ( bcrypt.compareSync(req.body.password, resultsArr[0]['password']) ) {
        req.session.userId = resultsArr[0]['id'];
        res.redirect("/dashboard");
      } else {
        res.status(403).send('Log in failed :3')
      }
    } catch (e) {
      res.status(403).send('Log in failed :(');
    }
  })
  .catch(console.error);
}); //log in validation and redir to user dashboard

app.get('/updateprofile', (req, res) => {
  if (req.session.userId) {
    res.sendFile(__dirname + "/public/updateProfile.html");
  } else {
    res.redirect('/');
  }
})

app.post('/updateprofile', (req, res) => {
  console.log("updating..") //
  knex
  .select('id')
  .from('usersdb')
  .where('email', req.session.userId)
  .then((results) => {
    knex('usersdb')
    .where('id', req.session.userId)
    .update({name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password, 10)})
    .then(() => { console.log("updated profile"); res.json("Profile updated!")})
    .catch(console.error)
  })
})

app.post('/delete/:delItem/:delCat', (req, res) => {
  console.log("deleting")
  console.log(req.session.userId)
  knex('tododb')
  .where('usersid', req.session.userId)
  .andWhere('todo', req.params.delItem)
  .del()
  .then(() => {
    knex('tododb')
    .select()
    .where('usersid', req.session.userId)
    .andWhere('category', req.params.delCat)
    .then((catObj) => {
      res.json(catObj)
    })
  })
})

app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
}) //logout and redirect to log in page

app.post('/register', (req, res) => {
  knex
  .select('*')
  .from('usersdb')
  .where('email', req.body.email)
  .then((results) => {
    if (results.length > 0) {
      res.status(403).send('Account already exists')
    } else {
      knex('usersdb')
      .insert({name: req.body.name, email: req.body.email, password: bcrypt.hashSync(req.body.password, 10)})
      .returning('id')
      .then( (arr) => {
        req.session.userId = arr[0];
        console.log(arr[0])
        res.redirect('/dashboard');
      })
    }
  })
  .catch(console.error)
})

app.post('/todo', (req, res) => {
  wikiQuery(req.body.text)
  .then((category) => {
    knex('tododb')
    .insert({todo: req.body.text, category: category, usersid: req.session.userId})
    .returning('category')
    .then((categoryArr) => {
      console.log(categoryArr)
      knex('tododb')
      .select()
      .where('category', categoryArr[0])
      .andWhere('usersid', req.session.userId)
      .then((results) => {
        console.log('bout to send', results)
        res.json(results)
      })
    })
  })
  .catch(console.error);
}); //queries wikipedia for the category it belongs to, then inserts the todo into the db, and sends back all todos that belongs in that category that this user has

app.post('/update/:newCat/:id', (req, res) => {
  console.log("recategorizing")
  knex('tododb')
  .where('id', req.params.id)
  .update('category', req.params.newCat)
  .then(() => {
    res.json("recategorized")
  })
})

app.use(express.static("public"));

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
