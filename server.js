const express = require("express");
const app = express();
const api = require("./routes/api");
const notesRouter = require("./routes/notes");
const path = require("path");
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", api);
app.use("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app
  .listen(port, () => {
    console.log(`Server is running on port ${port}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
