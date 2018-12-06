const { MongoClient } = require("mongodb");
const dbEmitter = require("../helpers/dbEmitter");
const {
  mongodb: { host, port, name, authenticate }
} = require("./config");

module.exports = MongoClient.connect(
  `mongodb://${authenticate}${host}:${port}/${name}`,
  { useNewUrlParser: true }
)
  .then(client => {
    const clientDb = client.db(name);
    clientDb
      .collection("users")
      .find()
      .toArray((error, results) => {
        if (error) return console.log(error);
        // console.log("results", results);
        return results;
      });
    // client.close(err => {
    //   if (err) throw err;
    // });
    dbEmitter.emit("start", clientDb);
    return clientDb;
  })
  .catch(err => console.log(err));
