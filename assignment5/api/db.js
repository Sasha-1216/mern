require('dotenv').config();
const { MongoClient } = require('mongodb');

let db;

async function connectToDb() {
  const url =
    process.env.DB_URL ||
    'mongodb+srv://sasha:sasha881216@cluster0-f7tzz.mongodb.net/productDB';

  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  console.log('Connected to MongoDB URL', url);
  db = client.db();
}

async function getNextSequence(name) {
  const result = await db
    .collection('counters')
    .findOneAndUpdate(
      { _id: name },
      { $inc: { current: 1 } },
      { returnOriginal: false }
    );
  return result.value.current;
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getNextSequence, getDb };
