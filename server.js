const fs = require('fs');
const path = require('path');
const express = require('express');
const mainDir = path.join(__dirname, "/public");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//GET routes
app.get("/notes", function (req, res) {
    res.sendFile(path.join(mainDir, "notes.html"));
  });
  
app.get("/api/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.get("/api/notes/:id", function (req, res) {
  let notesDB = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  res.json(notesDB[Number(req.params.id)]);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(mainDir, "index.html"));
});

//post new note 
app.post("/api/notes", function (req, res) {
  let notesDB = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let newNote = req.body;
  let id = notesDB.length.toString();
  newNote.id = id;
  notesDB.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(notesDB));
  res.json(notesDB);
});

//delete single note by ID
app.delete("/api/notes/:id", function (req, res) {
  let notesDB = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let noteID = req.params.id;
  let newID = 0

  notesDB = notesDB.filter((currNote) => {
    return currNote.id != noteID;
  });

  for (currNote of notesDB) {
    currNote.id = newID.toString();
    newID++;
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(notesDB));
  res.json(notesDB);
});

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });