'use strict';

require('dotenv').config();
const express = require('express'); 
const app = express();

const notFoundHandler = require('./handlers/404');
const errorHandler = require('./handlers/500');

app.get('/', renderHome);
app.get('/data', renderData);
app.get('/bad', (req, res, next) => {
  next('ruh-roh');
});
app.use('*', notFoundHandler);
app.use(errorHandler);

function renderHome(req, res){
  res.status(200).send('Hello World');
}
function renderData(req, res){
  const outputObj = {
    10: "even",
    5: "odd",
    "time": new Date()
  }
  res.status(200).json(outputObj);
}
function start(port) {
  app.listen(port, () => console.log(`server listen ${port}`)); 
}
module.exports = {
  app: app,
  start: start
}
