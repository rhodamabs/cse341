const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Hello Rhoda');
});

module.exports = routes;

const dotenv = require('dotenv');
dotenv.config();