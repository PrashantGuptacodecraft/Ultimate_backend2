const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.join(__dirname, "..", "..", ".env"), override: false });
dotenv.config({ path: path.join(__dirname, "..", ".env"), override: false });

const { MongoClient } = require("mongodb");

const MONGO_URL = process.env.MONGO_URL;
let _db;
const mongoConnect = (callback) => {
  if (!MONGO_URL) {
    throw new Error("MONGO_URL is missing. Add it to the .env file.");
  }

  MongoClient.connect(MONGO_URL, { serverSelectionTimeoutMS: 10000 })
    .then((client) => {
      callback();
      _db=client.db('airbnb');
    })
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      process.exitCode = 1;
    });
};
const getDb = () => {
  if (!_db) {
    throw new Error("Database not initialized. Call mongoConnect first.");
  }
    return _db;
};

module.mongoConnect= mongoConnect;
module.getDb=getDb;