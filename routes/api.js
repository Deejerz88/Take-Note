const express = require('express');

const notesRouter = express.router()

notesRouter.get('/', (req, res) => { 
  console.log(`${req.method} request for ${req.url}`);
  
})