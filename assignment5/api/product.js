const { getDb, getNextSequence } = require('./db.js');

async function get(_, {id}) {
    const db = getDb();
    const product = await db.collection('proudct').findOne({id});
    return product;
  }

async function productList(_, { status }) {
    const db = getDb();
    var product = await db;
    const filter = {};
    if (status) filter.status = status;
    product = await db.collection('product').find(filter).toArray();
    return product;
  }
  

  async function addProduct(_, { product }) {
    const db = getDb();
    // const newProduct = product;
    const newProduct = Object.assign({}, product);

    newProduct.id = await getNextSequence('product');
    await db.collection('product').insertOne(newProduct);
    return await db.collection('product').find().toArray();
  }

  module.exports = { productList, addProduct, get };
