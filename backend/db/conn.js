// const { MongoClient } = require("mongodb");
// const Db = process.env.ATLAS_URI;
// const client = new MongoClient(Db);
 
// var _db;
 
// module.exports = {
//   connectToServer: function (callback) {
//     client.connect(function (err, db) {
//       // Verify we got a good "db" object
//       if (db)
//       {
//         _db = db.db("PracticeDB");
//         console.log("Successfully connected to MongoDB."); 
//       }else{
//         console.log(db);
//       }
//       return callback(err);
//          });
//   },
 
//   getDb: function () {
//     return _db;
//   },
// };

const { MongoClient } = require("mongodb");

// MongoDB connection URI, replace with your own URI
const mongoURI = process.env.ATLAS_URI;

// MongoDB client instance
let client;

async function connectToDatabase() {
  try {
    // Create a new MongoClient
    client= new MongoClient(mongoURI);

    // Connect to the MongoDB server
    await client.connect();

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

function getDatabase() {
  if (client) {
    // Return a reference to the connected database
    return client.db();
  } else {
    throw new Error("Database connection not established.");
  }
}

function closeDatabase() {
  if (client) {
    // Close the MongoDB client when no longer needed
    client.close();
    console.log("MongoDB connection closed.");
  }
}

module.exports = {
  connectToDatabase,
  getDatabase,
  closeDatabase,
};
