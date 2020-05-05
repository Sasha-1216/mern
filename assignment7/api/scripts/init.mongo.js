/* global db */
/* eslint no-restricted-globals: "off" */

db.product.remove({});

const count = db.product.count();

db.counters.remove({});
db.counters.insert({ _id: 'product', current: count });

db.product.createIndex({ id: 1 }, { unique: true });
