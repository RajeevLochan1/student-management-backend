// import { MongoClient } from "mongodb";
const {MongoClient} = require("mongodb")
const url = "mongodb://0.0.0.0:27017";
const databaseName = "student";
const client = new MongoClient(url);

const dbConnect = async () => {
  let result = await client.connect();
  db = result.db(databaseName);
  return db.collection("studentList");
};

module.exports = dbConnect
