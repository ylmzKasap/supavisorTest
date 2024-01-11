const express = require('express');
const cors = require('cors');
const http = require('http');
const messageController = require('./message');

module.exports = (database) => {
  const app = express();
  const server = http.createServer(app);

  app.set('database', database);
  app.use(cors());
  app.use(express.json());

  app.get('/message', messageController);

  // Invalid route
  app.use('*', (req, res) => {
    return res.status(404).send({ errDesc: 'Invalid request' });
  });

  return server;
}