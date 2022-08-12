const express = require('express');
const path = require('path');
const app = express();

app.get('/', (req, res) => {
  console.log(`${req.method} request for notes${req.url}`);
  res.sendFile(path.join(__dirname, '../public/notes.html'));
})

module.exports = app;