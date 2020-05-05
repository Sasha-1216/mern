const { getDb, getNextSequence } = require('./db.js');

async function product(_, { id }) {
  const db = getDb();
  const product = await db.collection('product').findOne({ id });
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

async function updateProduct(_, { id, changes }) {
  const db = getDb();
  if (changes.price || changes.name || changes.image) {
    const product = await db.collection('product').findOne({ id });
    Object.assign(product, changes);
  }
  await db.collection('product').updateOne({ id }, { $set: changes });
  const updateProduct = await db.collection('product').findOne({ id });
  return updateProduct;
}

async function deleteProduct(_, { id }) {
  const db = getDb();
  const product = await db.collection('product').findOne({ id });
  if (!product) return false;

  let result = await db.collection('product').removeOne({ id });
  return result.deletedCount === 1;
}

async function counts(_) {
  const db = getDb();
  // const filter = {};
  // if(status) filter.status = status;
  const results = await db
    .collection('product')
    .aggregate([{ $group: { _id: null, count: { $sum: 1 } } }])
    .toArray();
  console.log('count: ' + results[0].count);
  return results[0].count;
}

module.exports = {
  productList,
  addProduct,
  product,
  updateProduct,
  deleteProduct,
  counts,
};
