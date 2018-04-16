var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

let myaccounts = [
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

function createTestDb(content, func)
{
  for(stuff in content)
  {
    func(content[stuff]);
  }
}

function addStudent(student)
{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("db");

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
    let dbo = db.db("db");

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

function login(table, usr, psw)
{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("db");
    let query = { _user: usr, password: psw };
   
    dbo.collection(table).find(query).toArray(function(err, result) {
      if (err) throw err;
     
      console.log(result.length);
      db.close();
     
      if(result.length === 1)
        return true;
      else
        return false;
    });
  });
}

function showContent(table)
{
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("db");
   
    dbo.collection(table).find({},{_id: 0}).toArray(function(err, result) {
      if (err) throw err;
     
      console.log(result);
      db.close();
    });
  });
}
//createTestDb(myaccounts, addStudent);

//login("company", "a", "a");

//showContent("student");