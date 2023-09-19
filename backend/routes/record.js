const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn.js");
 
// This helps convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/user").get(function (req, res) {
 let db_connect = dbo.getDatabase("PracticeDB");
 if(db_connect){
  console.log("connected to db");
 }
 db_connect
   .collection("Users")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
     console.log(result)
   });
});
 
// This section will help you get a single record by id
recordRoutes.route("/user/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("Users")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
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