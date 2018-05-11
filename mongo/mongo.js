var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var database = "db";

module.exports = {

  login : function(table, usr, psw, callback){
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      
      console.log("Connected to database!");

      var dbo = db.db(database);
      var query = { userName: usr, password: psw };
      
      dbo.collection(table).find(query).toArray(function(err, result) {
        if (err) throw err;

        console.log("Entered collection success!");
        
        db.close();

        callback(result);
      });
    });
  },
  
  getUserData: function (callback) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(database);
      dbo.collection('company').find().toArray(function (err, result) {
        db.close();
        callback(result);
      });
    });
  },
  removeInterestFromStudent:function(studentID,job,callback){
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(database);
      var ObjectId = require('mongodb').ObjectID;
      dbo.collection('student').update({"_id": new ObjectId(studentID)},{$pull: {joblist:job}},function (err, result) {
        db.close();
        callback(result);
      });
    });
  },
  removeInterestFromJob:function(jobID,student,callback){
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(database);
      var ObjectId = require('mongodb').ObjectID;
      dbo.collection('job').update({"_id": new ObjectId(jobID)},{$pull: {studentlist:student}},function (err, result) {
        db.close();
        callback(result);
      });
    });
  },
  changeCompanyInfo:function(myQuery,newValues,callback){
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(database);
      console.log(myQuery);
      var ObjectId = require('mongodb').ObjectID;
      dbo.collection('company').update({"_id": new ObjectId(myQuery)},{$set: newValues},function (err, result) {
        db.close();
        callback(result);
      });
    });
  },
  changeExJobInfo:function(jobID,newValues,callback){
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(database);
      console.log("JOBID: "+jobID);
      console.log(newValues);
      var ObjectId = require('mongodb').ObjectID;
      dbo.collection('job').update({"_id": new ObjectId(jobID)},{$set: newValues},function (err, result) {
        db.close();
        callback(result);
      });
    });
  },
  findSpecificJob:function(jobId,callback){
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(database);
      var ObjectId = require('mongodb').ObjectID;
      dbo.collection('job').find({"_id": new ObjectId(jobId)}).toArray(function (err, result) {
        db.close();
        callback(result);
      });
    });
  },

  findOne : function(table, query, callback){
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      
      console.log("Connected to database!");

      var dbo = db.db(database);
      // console.log(query);
      dbo.collection(table).find(query).toArray(function(err, result) {
        if (err) throw err;
        
        console.log("Entered collection success!");
        
        db.close();
        callback(result);
      });
    });
  },

  findCompanyJobs : function(query, callback){
    // console.log("COMPANYID: "+query);

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      
      console.log("Connected to database!");

      var dbo = db.db(database);
      dbo.collection('job').find({companyID:query}).toArray(function(err, result) {
        if (err) throw err;

        console.log("Entered collection success!");
        
        db.close();
        callback(result);
      });
    });
  },



  addJob: function(exjobb, callback)
  {
    MongoClient.connect(url, function(err, db) {
      if (err) callback(err);
      var dbo = db.db("db");

      dbo.collection("job").insertOne(exjobb, function(err, res) {
        if (err) {
          db.close();
          callback(err);
        }
        else{
          console.log("Number of documents inserted: " + res.insertedCount);
          db.close();
          callback(res);
        }
      });
    });
},
  addCompany: function(company, callback)
  {
    MongoClient.connect(url, function(err, db) {
      if (err) callback(err);
      var dbo = db.db("db");

      dbo.collection("company").ensureIndex({userName: 1}, {unique : true});

      dbo.collection("company").insertOne(company, function(err, res) {
        if (err) {
          db.close();
          callback(err);
        }
        else{
          console.log("Number of documents inserted: " + res.insertedCount);
          db.close();
          callback(res);
        }
      });
    });
},

addStudent: function(student, callback)
  {
    MongoClient.connect(url, function(err, db) {
      if (err) callback(err);
      var dbo = db.db("db");

      dbo.collection("student").ensureIndex({uname: 1}, {unique : true});

      dbo.collection("student").insertOne(student, function(err, res) {
        if (err) {
          db.close();
          // console.log(JSON.stringify(student));
          callback(err);
        }
        else{
          console.log("Number of documents inserted: " + res.insertedCount);
          db.close();
          callback(res);
        }
      });
    });
},
pushInterestToStudent:function(jobID,studentID,message,callback){
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(database);
    var ObjectId = require('mongodb').ObjectID;
    dbo.collection('student').update({"_id": new ObjectId(studentID)},{$push:{joblist:{jobID,message}}},function (err, result) {
      if(err){
        console.log(err);
        throw err;
      }
      db.close();

      callback(result);
    });
  });
},

pushInterest:function(jobID,studentID,message,callback){
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db(database);
    var ObjectId = require('mongodb').ObjectID;
    dbo.collection('job').update({"_id": new ObjectId(jobID)},{$push:{studentlist:{studentID,message}}},function (err, result) {
      if(err){
        console.log(err);
        throw err;
      }
      db.close();
      callback(result);
    });
  });
}

};

function addStudent(student, callback)
{
  MongoClient.connect(url, function(err, db) {
    if (err){
      console.log(err);
    }
    var dbo = db.db("db");

    dbo.collection("student").ensureIndex({_user: 1}, {unique : true});

    dbo.collection("student").insertOne(student, function(err, res) {
      if (err) {
        console.log(err);
      }
      
      db.close();

      callback(res);
    });
  });
}

function addCompany(company)
{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("db");

    dbo.collection("company").ensureIndex({_user: 1}, {unique : true});

    dbo.collection("company").insertOne(company, function(err, res) {
      if (err) {
          console.log(err);
          throw err;
      }
      console.log("Number of documents inserted: " + res.insertedCount);
      db.close();

      if(res.insertedCount === 1)
        return true;
      else
        return false;
    });
  });
}

//Array med test konton.

var myaccounts = [
  { _user: 'a', password: 'a'},
  { _user: 'b', password: 'b'},
  { _user: 'c', password: 'c'},
  { _user: 'd', password: 'd'},
  { _user: 'e', password: 'e'},
  { _user: 'f', password: 'f'},
  { _user: 'g', password: 'g'},
  { _user: 'h', password: 'h'},
  { _user: 'i', password: 'i'},
  { _user: 'j', password: 'j'}
];

//Function to populate db 

function createTestDb(content, func)
{
  for(stuff in content)
  {
    func(content[stuff]);
  }
}

//Uncomment to populate db.

//createTestDb(myaccounts, addCompany);
//createTestDb(myaccounts, addStudent);
