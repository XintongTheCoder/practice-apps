db.words.findOneAndUpdate({ term: "fgeef" }, {$set: { description: "000" }}, { upsert: true, new: true, setDefaultOnInsert: true });

db.words.find({$or: [{term: {$regex: "fd"}}, {description: {$regex: "0"}}]});
