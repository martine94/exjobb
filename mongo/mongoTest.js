var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var database = "db";

module.exports = {

  login : function(table, usr, psw, callback){
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      
      console.log("Connected to database!");

      var dbo = db.db(database);
      var query = { _user: usr, password: psw };
      
      dbo.collection(table).find(query).toArray(function(err, result) {
        if (err) throw err;

        console.log("Entered collection success!");
        
        db.close();

        callback(result);
      });
    });
  }

};

function addStudent(student)
{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("db");

    dbo.collection("student").ensureIndex({_user: 1}, {unique : true});

    dbo.collection("student").insertOne(student, function(err, res) {
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
