const express = require("express");
const { MongoClient } = require("mongodb");
const {
  mongodb: { host, port, name, authenticate }
} = require("../config");

const router = express.Router();

/* GET home page. */
router.get("/", (req, res, _next) => {
  MongoClient.connect(
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
          console.log("results", results);
          return results;
        });
      client.close(err => {
        if (err) throw err;
      });
      return clientDb;
    })
    .catch(err => console.log(err));
  res.render("index", { title: "Express" });
});

module.exports = router;
