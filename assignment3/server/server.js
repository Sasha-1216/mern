const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const productDB = [
  {
    id: 1,
    name: 'Levis 501',
    price: 28.0,
    category: 'Jeans',
    image:
      'https://slimages.macysassets.com/is/image/MCY/products/4/optimized/3585834_fpx.tif?op_sharpen=1&wid=402&hei=489&fit=fit,1&$filtersm$&fmt=webp'
  },
  {
    id: 2,
    name: 'Christmas Sweater',
    price: 19.5,
    category: 'Sweaters',
    image:
      'https://costumesanduglysweaters.com/wp-content/uploads/2019/05/Tipsy-Elves-Diamond-Tinsel-Ugly-Christmas-Sweater-for-Men.jpg'
  }
];

const resolvers = {
  Query: {
    productList
  },
  Mutation: {
    addProduct
  }
};

function addProduct(_, { product }) {
  product.id = productDB.length + 1;
  productDB.push(product);
  return productDB;
}

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
