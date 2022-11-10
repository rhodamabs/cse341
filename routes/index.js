
const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Hello Rhoda Mabundu');
});

module.exports = routes;

