const mongoose = require("mongoose");

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect("mongodb://127.0.0.1/words", { useNewUrlParser: true });

// 2. Set up any schema and models needed by the app
const wordSchema = mongoose.Schema({
  term: { type: String, unique: true },
  description: String,
});
const Word = mongoose.model("Word", wordSchema);

const save = (word) => {
  const wordModel = new Word(word);
  const filter = { term: word.term };
  const update = { description: word.description };
  const options = {
    upsert: true,
    new: true,
    setDefaultOnInsert: true,
  };

  return Word.findOneAndUpdate(filter, update, options);
};

const find = (query, sort) => {
  let filter = {};
  if (query) {
    filter = {
      $or: [{ term: { $regex: query } }, { description: { $regex: query } }],
    };
  }

  const results = Word.find(filter);

  if (!sort) {
    return results.exec();
  }
  const sortCriteria = sort === "asc" ? 1 : -1;
  return results.sort({ term: sortCriteria }).exec();
};

const deleteWord = (query) => {
  return Word.deleteOne({ term: query.term });
};

// 3. Export the models
module.exports.save = save;
module.exports.find = find;
module.exports.deleteWord = deleteWord;

// 4. Import the models into any modules that need them
