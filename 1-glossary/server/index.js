require("dotenv").config();
const db = require("./db.js");
const express = require("express");
const path = require("path");

const app = express();

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/api/words", (req, res) => {
  db.save(req.body)
    .then(() => db.find())
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.get("/api/words", (req, res) => {
  db.find(req.query.query, req.query.sort)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

app.delete("/api/words", (req, res) => {
  db.deleteWord(req.body)
    .then(() => db.find())
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

let port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening at http://localhost:${port}`);
