"use strict";

const express = require('express');
const router  = express.Router();
const app         = express();
const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  secret: 'cookieKey'
}))

module.exports = (knex) => {

  router.get("/", (req, res) => {
    const userid = req.session.userId;
    knex
      .select("*")
      .from("tododb")
      .where('usersid', userid)
      .then((results) => {
        res.json(results);
    });
  });



  return router;

}
