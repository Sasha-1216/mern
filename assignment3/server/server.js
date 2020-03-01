const fs = require('fs');
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

let productmsg = 'hello world';

const resolvers = {
  Query: {
    product: () => productmsg,
    productList
  }
};

function addProduct() {
  return productmsg;
}

const productDB = [
  {
    id: 3,
    name: 'pants',
    price: '14.00',
    category: 'Jeans',
    image: 'imageURL'
  },
  {
    id: 4,
    name: 'pants',
    price: '14.00',
    category: 'Jeans',
    image: 'imageURL'
  }
];

function productList() {
  return productDB;
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers
});

const app = express();

app.use(express.static('public'));

server.applyMiddleware({ app, path: '/graphql' });

app.listen(3000, function() {
  console.log('App started on port 3000');
});
