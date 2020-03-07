
const MongoClient = require('mongodb').MongoClient;
const mongoURL = require('./url');

function writeItem(data) {
    const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
    client.connect(function(err) {
       
        if (err) {
          console.log('Connection error!');
          throw new Error(err);
        }
        const collection = client.db("final_project_fullstack2").collection("commodities");
        if (Array.isArray(data)) {
          collection.insertMany(data);
        } else {
          collection.insertOne(data);
        }
        client.close();
    })
}

function readItem(callback) {
    const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
    client.connect(function(err) {
        if (err) {
          console.log('Connection error!');
          throw new Error(err);
        }
        const collection = client.db("final_project_fullstack2").collection("commodities");
        return collection.find({}).toArray(callback);
  })
}

function deleteItem(item) {
  const client = new MongoClient(mongoURL.url, { useNewUrlParser: true });
  client.connect(function(err) {
    const collection = client.db("final_project_fullstack2").collection("commodities");
    collection.deleteOne(item, function(err, r){
      if (err) {
        throw new Error(err)
      } else {
        var _id = item._id;
        console.log(`IO delete finished, using: ${_id}`);
      }
    })
  })  
}

exports.writeItem = writeItem
exports.readItem = readItem
exports.deleteItem = deleteItem