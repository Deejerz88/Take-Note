const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
uuidv4();
const app = express();

app
  .route("/")
  .get((req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
      res.json(JSON.parse(data));
    });
  })
  .post((req, res) => {
    console.log(req.body);
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
  });
app.route("/:id").delete((req, res) => {
  fs.readFile("./db/db.json", "utf8", async (err, data) => {
    console.log(req.params.id);
    let parsedData = JSON.parse(data);
    parsedData = parsedData.filter((note) => note.id !== req.params.id);
    console.log({ parsedData });
    fs.writeFile("./db/db.json", JSON.stringify(parsedData), (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Note deleted from db.json");
        res.json(parsedData);
      }
    });
  });
});

module.exports = app;
