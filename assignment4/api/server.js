const fs = require('fs');
require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express/dist');
const { MongoClient } = require('mongodb');

const url = process.env.DB_URL || 'mongodb+srv://sasha:sasha881216@cluster0-f7tzz.mongodb.net/productDB';

let db;
const client = new MongoClient(url, { useNewUrlParser: true });

async function productList() {
  const product = await db
    .collection('product')
    .find({})
    .toArray();
  return product;
}

async function getNextSequence(name) {
  const result = await db
    .collection('counters')
    .findOneAndUpdate(
      { _id: name },
      { $inc: { current: 1 } },
      { returnOriginal: false },
    );
  return result.value.current;
}

async function addProduct(_, { product }) {
  const newProduct = product;
  newProduct.id = await getNextSequence('product');
  await db.collection('product').insertOne(newProduct);
  return await db.collection('product').find().toArray();
  
}

async function connectToDb() {
  await client.connect();
  console.log('Connected to MongoDB URL', url);
  db = client.db();
}

const resolvers = {
  Query: {
    productList,
  },
  Mutation: {
    addProduct,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('schema.graphql', 'utf-8'),
  resolvers,
  formatError: (error) => {
    console.log(error);
    return error;
  },
});

const app = express();

const enableCors = (process.env.ENABLE_CORS || 'true') === 'true';
console.log('CORS setting:', enableCors);
server.applyMiddleware({ app, path: '/graphql', cors: enableCors });

const port = process.env.API_SERVER_PORT || 3000;


(async function start() {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`API server started on port ${port}`);
    });
  } catch (err) {
    console.log('ERROR:', err);
  }
}());
