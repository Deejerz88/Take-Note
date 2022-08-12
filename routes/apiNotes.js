const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
const app = express();

app
  .route("/")
  .get((req, res) => {
    console.log(`${req.method} request for api/notes${req.url}`);
    fs.readFile("./db/db.json", (err, data) => {
      res.json(JSON.parse(data));
    });
  })
  .post((req, res) => {
    console.log(req.body);
    console.log(`${req.method} request for ${req.url}`);
    const newNote = req.body;
    newNote.id = uuidv4();
    fs.readFile("./db/db.json", "utf8", async (err, data) => {
      let parsedData = JSON.parse(data);
      parsedData.push(newNote);
      fs.writeFile("./db/db.json", JSON.stringify(parsedData), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("New note added to db.json");
          res.json(parsedData);
        }
      });
    });
  })
app.route("/:id")
  .delete((req, res) => { 
    console.log(`${req.method} request for ${req.url}`);
    fs.readFile("./db/db.json", "utf8", async (err, data) => {
      console.log(req.params.id)
      let parsedData = JSON.parse(data);
      parsedData = parsedData.filter(note => note.id !== req.params.id);
      console.log({ parsedData });
      fs.writeFile("./db/db.json", JSON.stringify(parsedData), (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Note deleted from db.json");
          res.json(parsedData);
        }
      }
      );
    }
    );
  });

module.exports = app;
