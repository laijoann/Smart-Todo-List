"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("tododb")
      .where('usersid', 1)
      .then((results) => {
        res.json(results);
    }); //sample homepage

  });

  //TODO: 3 files for response-request
  //TODO: all except for buttons on /:userid

  return router;
}
