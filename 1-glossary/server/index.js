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

const findWords = ({ req, res }) => {
  const page = req ? Number(req.query.page) : 1;
  const limit = req ? Number(req.query.limit) : 10;
  const query = req ? req.query.query : "";
  const sort = req ? req.query.sort : "";

  db.find(page, limit, query, sort)
    .then(([words, count]) => {
      res.status(200).json({
        words,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
};

app.post("/api/words", (req, res) => {
  db.save(req.body).then(() => {
    findWords({ res });
  });
});

app.get("/api/words", (req, res) => {
  findWords({ req, res });
});

app.delete("/api/words", (req, res) => {
  db.deleteWord(req.body).then(() => findWords({ res }));
});

let port = process.env.PORT || 3000;
app.listen(port);
console.log(`Listening at http://localhost:${port}`);
