const fs = require('fs');
const express = require('express');
const noteRoutes = require('./routes/note-routes');
const htmlRoutes = require('./routes/htmlRoutes/index.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });