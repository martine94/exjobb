"use strict";

//#region loading libs

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var database = "db";

/* 
+++ Winston loggnings verktyg +++
Winston använder sex nivåer: error, warn, info, verbose, debug and silly.
Man kan använda string interpolation för att plocka in variabler i meningar,
%s strängar, %j objekt. 
Mer info: https://www.npmjs.com/package/winston
*/

const winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      name: 'debug-console',
      colorize: true,
      label: 'mongo.js',
      level: 'debug'
    }),
    new (winston.transports.File)({
      name: 'error-file',
      filename: 'mongolog-error.log',
      level: 'error'
    })
  ]
});

//#endregion

module.exports = {

  login: function (table, user, password, callback) {
    logger.info("Checking login information in database");
    logger.debug('Using collection %s, username %s and password %s', table, user, password);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;
      
      var dbo = db.db(database);
      var query = { userName: user, password: password };

      dbo.collection(table).find(query).toArray(function (error, result) {
        if (error) throw error;

        logger.silly('Loggin database result', result);
        db.close();
        callback(result);
      });
    });
  },

  getUserData: function (callback) {
    logger.info('Getting userdata from database');

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(db);

      dbo.collection('company').find().toArray(function (error, result) {
        if(error) throw error;

        logger.silly('Get user data from database result', result);
        db.close();
        callback(result);
      });
    });
  },



  changeUserInfo: function (table, userID, newValues, callback) {
    logger.info('Changing user information in database');
    logger.debug('Using userID %s', userID);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);
      
      var ObjectId = require('mongodb').ObjectID;
      dbo.collection(table).update({ "_id": new ObjectId(userID) }, { $set: newValues }, function (err, result) {
        if(err) throw err;

        logger.silly('Changing user information in database result', result);
        db.close();
        callback(result);
      });
    });
  },

  changeExJobInfo: function (jobID, newValues, callback) {
    logger.info('Change exjob information in database');
    logger.debug('Using jobID %s, new values %s', jobID, newValues);

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;

      var dbo = db.db(database);
      var ObjectId = require('mongodb').ObjectID;

      dbo.collection('job').update({ "_id": new ObjectId(jobID) }, { $set: newValues }, function (err, result) {
        if(err) throw err;

        logger.silly('Change exjob information in database result', result);
        db.close();
        callback(result);
      });
    });
  },

  findSpecificJob: function (jobId, callback) {
    logger.info('Searching for specific job in database');
    logger.debug('jobId %s', jobId);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);
      var ObjectId = require('mongodb').ObjectID;

      dbo.collection('job').find({ "_id": new ObjectId(jobId) }).toArray(function (error, result) {
        if(error) throw error;

        logger.silly('Searching for specific job in database result', result);
        db.close();
        callback(result);
      });
    });
  },

  findOne: function (table, query, callback) {
    logger.info('Finding one query %s in table %s', query, table);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);

      dbo.collection(table).find(query).toArray(function (error, result) {
        if (error) throw error;

        logger.silly('Found one result', result);
        db.close();
        callback(result);
      });
    });
  },

  findCompanyJobs: function (query, callback) {
    logger.info('Searching database for company jobs');
    logger.debug('Using query %s', query);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);

      dbo.collection('job').find({ companyID: query }).toArray(function (error, result) {
        if (error) throw error;

        logger.silly('Searching database for company jobs result', result);
        db.close();
        callback(result);
      });
    });
  },

  addJob: function (exjobb, callback) {
    logger.info('Adding job to database');
    logger.debug('Using exjobb object %j', exjobb);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);

      dbo.collection("job").insertOne(exjobb, function (error, result) {
        if (error) throw error;

        logger.silly('Adding job to database result', result);
        db.close();
        callback(result);
      });
    });
  },

  addCompany: function (company, callback) {
    logger.info('Adding company to database');
    logger.debug('Using company object %j', company);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);

      dbo.collection("company").ensureIndex({ userName: 1 }, { unique: true });

      dbo.collection("company").insertOne(company, function (error, result) {
        if (error) throw error;
        
        logger.silly('Adding company to database result', result);
        db.close();
        callback(result);
      });
    });
  },

  changeStudentInfo: function (myQuery, newValues, callback) {
    logger.info('Changing student information in database');
    logger.debug('Using query %s, new values %j', myQuery, newValues);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);
      var ObjectId = require('mongodb').ObjectID;

      dbo.collection('student').update({ "_id": new ObjectId(myQuery) }, { $set: newValues }, function (error, result) {
        if(error) throw error;

        logger.silly('Changing student information in database result', result);
        db.close();
        callback(result);
      });
    });
  },

  addStudent: function (student, callback) {
    logger.info('Adding student to database');
    logger.debug('Using student object %j', student);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);

      dbo.collection("student").ensureIndex({ uname: 1 }, { unique: true });

      dbo.collection("student").insertOne(student, function (error, result) {
        if (error) throw error;

        logger.silly('Adding student to database result', result);
        db.close();
        callback(result);
      });
    });
  },

  pushInterestToStudent: function (jobID, studentID, message, callback) {
    logger.info('Pushing interest to student');
    logger.debug('Using jobID %s, studentID %s and message %s', jobID, studentID, message);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);
      var ObjectId = require('mongodb').ObjectID;

      dbo.collection('student').update({ "_id": new ObjectId(studentID) }, { $push: { joblist: { jobID, message } } }, function (err, result) {
        if(err) throw err;

        logger.silly('Pushing interest to student result', result);
        db.close();
        callback(result);
      });
    });
  },

  pushInterest: function (jobId, studentId, message, callback) {
    logger.info('Pushing interest message to database');
    logger.debug('Using jobId %s, studentId %s and message %s', jobId, studentId, message);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);
      var ObjectId = require('mongodb').ObjectID;

      dbo.collection('job').update({ "_id": new ObjectId(jobId) },
        { $push: { studentlist: { studentId, message } } }, function (error, result) {
          if (error) throw error;

          logger.silly('Pushing interest message to database result', result);
          db.close();
          callback(result);
        });
    });
  },

  pushInterestMessage: function (jobId, studentId, message, callback) {
    logger.info('Pusing Interest Message to database');
    logger.debug('Using jobId %s, studentId %s and message %s', jobId, studentId, message);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);
      var ObjectId = require('mongodb').ObjectID;

      addInterestJob(dbo, studentId, jobId, message, function (result) {
        addInterestStudent(dbo, studentId, jobId, message, function (result) {
          db.close()
          callback(result);
        });
      });
    });
  },

  removeInterestMessage: function (studentId, jobId, callback) {
    logger.debug('Removing Interest Message from studentId %s and jobId %s', studentId, jobId);

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;

      var dbo = db.db(database);
      removeInterestFromStudent(dbo, studentId, jobId, function (result) {
        removeInterestFromJob(dbo, jobId, studentId, function (result) {
          db.close();
          callback(result);
        });
      });
    });
  },

  removeJob: function (jobId, callback) {
    logger.debug('Removing jobId %s', jobId);

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;

      var dbo = db.db(database);
      var ObjectId = require('mongodb').ObjectID;
      var jobID = new ObjectId(jobId);

      dbo.collection('job').remove({ '_id': jobID },function(err,obj){
          if (err) throw err;

          logger.debug('Remove job from job collection.', obj.result);
          callback(obj.result);
          db.close();
        });
    });
  },

  getStudentInterestMessages: function (studentId, callback) {
    logger.info('Getting student interest messages, userID: %s', studentId);

    var ObjectId = require('mongodb').ObjectID;
    var studentObjectId = new ObjectId(studentId);

    MongoClient.connect(url, function (err, db) {
      if (err) throw err;

      var dbo = db.db(database);
      dbo.collection('student').findOne({ _id: studentObjectId }, { projection: { _id: 0, joblist: 1 } }, function (err, result) {
        if (err) throw err;

        var jobList = result.joblist;
        logger.debug('Found student object:', jobList);
        if (jobList.length === 0) {
          logger.info('No job interests found.');
          callback("false");
        }
        else {
          let jobArray = [];
          for (let i = 0; i < jobList.length; i++) {
            findSpecificJob(jobList[i].jobID, function (jobResult) {

              jobArray.push({ jobs: jobResult, message: jobList[i].message });

              if (jobArray.length === jobList.length) {
                logger.debug('Job array produced', jobArray);
                callback(jobArray);
              }
            });
          }
        }
      });
    });
  }
};

function addInterestStudent(database, studentId, jobId, message, callback) {
  var ObjectId = require('mongodb').ObjectID;
  var studentObjectId = new ObjectId(studentId);

  database.collection('student').updateOne({ '_id': studentObjectId },
    { $push: { joblist: { jobID: jobId, message: message } } }, function (err, result) {
      if (err) throw err;

      logger.debug('Adding job to student joblist, result:', result.result);
      callback(result);
    });
}

function addInterestJob(database, studentId, jobId, message, callback) {
  var ObjectId = require('mongodb').ObjectID;
  var jobObjectId = new ObjectId(jobId);

  database.collection('job').updateOne({ '_id': jobObjectId },
    { $push: { studentlist: { studentID: studentId, message: message } } }, function (err, result) {
      if (err) throw err;

      logger.debug('Adding student to job studentlist, result:', result.result);
      callback(result);
    });
}

//Vet inte om den fungerar..
function checkExistingInterest(database, studentId, jobId, callback) {
  var ObjectId = require('mongodb').ObjectID;
  var studentObjectId = new ObjectId(studentId);
  var jobObjectId = new ObjectId(jobId);

  database.collection('student').findOne({ _id: { $eq: studentObjectId }, joblist: { $elemMatch: { jobID: jobObjectId } } },
    function (err, result) {
      if (err) throw err;

      logger.debug('Checking if student already has job in joblist.', result);
      callback(result);
    });
}

function removeInterestFromStudent(database, studentId, jobId, callback) {
  var ObjectId = require('mongodb').ObjectID;
  var studentObjectId = new ObjectId(studentId);

  database.collection('student').update({ '_id': studentObjectId },
    { $pull: { joblist: { jobID: jobId } } }, function (err, result) {
      if (err) throw err;

      logger.debug('Remove interest message from student.', result.result);
      callback(result);
    });
}

function findSpecificJob(jobId, callback) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    var dbo = db.db(database);
    var ObjectId = require('mongodb').ObjectID;

    dbo.collection('job').find({ "_id": new ObjectId(jobId) }).toArray(function (err, result) {
      db.close();
      callback(result);
    });
  });
}

function removeInterestFromJob(database, jobId, studentId, callback) {
  var ObjectId = require('mongodb').ObjectID;
  var jobObjectId = new ObjectId(jobId);

  database.collection('job').update({ '_id': jobObjectId },
    { $pull: { studentlist: { studentID: studentId } } }, function (err, result) {
      if (err) throw err;

      logger.debug('Remove interest message from job.', result.result);
      callback(result);
    });
}

function addStudent(student, callback) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    var dbo = db.db("db");
    dbo.collection("student").ensureIndex({ _user: 1 }, { unique: true });

    dbo.collection("student").insertOne(student, function (err, res) {
      if (err) throw err;

      db.close();
      callback(res);
    });
  });
}

function addCompany(company, callback) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;

    var dbo = db.db("db");
    dbo.collection("company").ensureIndex({ _user: 1 }, { unique: true });

    dbo.collection("company").insertOne(company, function (err, res) {
      if (err) throw err;

      logger.debug("Number of documents inserted: %s", res.insertedCount);

      db.close();
      callback(res);
    });
  });
}