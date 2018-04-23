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
  },

  addCompany : function(company, callback)
  {
    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log("Connect error!");
        callback(err);
      }
      var dbo = db.db("db");
      
      //dbo.collection("company").ensureIndex({userName: 1}, {unique : true});
      
      dbo.collection("company").insertOne(company, function(err, res) {
        if (err) {
            console.log("Collection error!");
            db.close();
            callback(err);
        }else{
          console.log("Number of documents inserted: " + res.insertedCount);
          db.close();
  
          callback(res);
        }
        
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
