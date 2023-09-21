const express = require("express");
const app = express();
const bodyParser= require("body-parser");
app.use(bodyParser.json());
var jsonParser = bodyParser.json();

const {MongoClient, ServerApiVersion}= require('mongodb');
const { default: mongoose } = require('mongoose');
const uri= "mongodb+srv://troyboy:websci@cluster0.6dafd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var ObjectId = require('mongodb').ObjectID;

app.use(function (req, res, next) {

  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

app.get('/db', async (req, res) => {
  try {
      await client.connect();
      const collection = client.db("PracticeDB").collection("Users");
      const cursor = await collection.find().toArray();
      res.json(cursor);
  } catch(e) {
      console.error(e);
  } finally {
      await client.close();
  }
})
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn.js");
 
// This helps convert the id from string to ObjectId for the _id.
//const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/user").get(async function (req, res) {
 let db_connect = dbo.getDatabase("PracticeDB");
 if(db_connect){
  console.log("getDatabase working");
 }
 console.log(db_connect.collection("Users"))
//  db_connect
//    .collection("Users")
//    .findOne({}, function (err, result) {
//      if (err) throw err;
//      res.json(result);
//      console.log(result)
//    });
try {
  const answer = await db_connect.collection("Users").find({ firstName: "Chloe" }).toArray();
  console.log(answer);
} catch (error) {
  console.error(error);
}
    
});


 
// This section will help you get a single record by id
recordRoutes.route("/user/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 //let myquery = { _id: ObjectId(req.params.id) };
 let answer= db_connect.collection("Users").find({firstName: "chloe"}).toArray();
 console.log(answer);
});
 
// This section will help you create a new record.
recordRoutes.route("/user/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   _id: req.body.id,
   firstName: req.body.firstName,
   lastName: req.body.lastName,
   address: req.body.address
 };
 db_connect.collection("Users").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("Users").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;