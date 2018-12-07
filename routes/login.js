const express = require("express");
const { MongoClient } = require("mongodb");
const jwt = require("jsonwebtoken");
const {
  mongodb: { host, port, name, authenticate },
  jwt: { secret, expiresIn }
} = require("../config");
// const db=require("../database/db");

const router = express.Router();

router.post("/", async (req, res, _next) => {
  const { login, password } = req.body;
  const user = { login, password };
  console.log("user start", user);
  await MongoClient.connect(
    `mongodb://${authenticate}${host}:${port}/${name}`,
    { useNewUrlParser: true }
  )
    .then(client => {
      const clientDb = client.db(name);
      return clientDb.collection("users").insertOne(user);
    })
    .then(result => {
      console.log("insertedId", result.insertedId);
      user._id = result.insertedId;
    })
    .catch(err => console.log(err));

  console.log("user end", user);
  console.log("expiresIn", { expiresIn });

  jwt.sign(user, secret, { expiresIn }, (err, token) => {
    res.json({ token });
  });
});

module.exports = router;
