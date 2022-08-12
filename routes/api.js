const express = require('express');
const apiNotesRouter = require('./apiNotes');
const app = express();

app.use('/notes', apiNotesRouter)

module.exports = app;