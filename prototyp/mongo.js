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
}

};

function getName(callback) {
    db.company.find({}, function (err, objs) {
        var returnable_name;
        if (objs.length == 1) {
            returnable_name = objs[0].name;
            console.log(returnable_name); // this prints "Renato", as it should
            callback(returnable_name);
        }
    });
}