const { MongoClient, ServerApiVersion } = require('mongodb');

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    'mongodb+srv://nhat1042001:nhat1042001@swlprime.c7x3a.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 }
  )
    .then((client) => {
      console.log('Connected to MongoDB');
      _db = client.db();
      callback(client);
    })
    .catch((err) => console.log(err));
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
