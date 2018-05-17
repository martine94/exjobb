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
        if (error) {
          db.close();
          throw error;
        }

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
        if (error) {
          db.close();
          throw error;
        }

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
        if (error) {
          db.close();
          throw error;
        }

        logger.silly('Changing user information in database result', result);
        db.close();
        callback(result);
      });
    });
  },

  changeExJobInfo: function (jobID, newValues, callback) {
    logger.info('Change exjob information in database');
    logger.silly('Using jobID %s, new values %s', jobID, newValues);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);
      var ObjectId = require('mongodb').ObjectID;

      dbo.collection('job').update({ "_id": new ObjectId(jobID) }, { $set: newValues }, function (err, result) {
        if (error) {
          db.close();
          throw error;
        }

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
        if (error) {
          db.close();
          throw error;
        }

        logger.silly('Searching for specific job in database result', result);
        db.close();
        callback(result);
      });
    });
  },

  createKeywords: function (callback) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(database);
      dbo.createCollection("keywords", function (err, res) {
        if (err) throw err;
      });
      var Område = ["Artificiell intelligens", "Databaser", "Maskininlärning", "Robotik", "Webbprogrammering", "Kommunikationssystem"];
      var Typ = ["Dokumentation", "Hårdvaruprojekt", "Mjukvaruprojekt", "Annat"];
      var Operativsystem = ["Android", "IOS", "Linux", "Windows", "Mac", "Annat"];
      var Programmeringsspråk = ["Assembler", "C", "Csharp", "Cpp", "Java", "Javascript", "Python", "Annat"];
      // var docs=[Område,Typ,Operativsystem,Programmeringsspråk];
      dbo.collection("keywords").insertOne({ Område, Typ, Operativsystem, Programmeringsspråk }, function (err, res) {
        if (err) throw err;
      });
      dbo.collection("keywords").findOne({}, function (err, result) {
        if (err) throw err;
        db.close();
        callback(result);
      });
    });
  },

  createFaq: function (placeQuery, collExists, callback) {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db(database);
      if (!collExists) {
        dbo.createCollection("faq", function (err, res) {
          if (err) throw err;
        });
        dbo.collection("faq").insertMany(faqList,function(err,res){
          if(err) throw err;
        });
        dbo.collection("faq").find({ place: placeQuery }).toArray( function (err, result) {
          if (err) throw err;
          db.close();
          callback(result);
        });
      } else {
        dbo.collection("faq").find({ place: placeQuery }).toArray( function (err, result) {
          if (err) throw err;
          db.close();
          callback(result);
        });
      }
    });
  },

  findOne: function (table, query, callback) {
    logger.silly('Finding one in table %s', table);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);

      dbo.collection(table).find(query).toArray(function (error, result) {
        if (error) {
          db.close();
          throw error;
        }

        logger.silly('Found one result', result);
        db.close();
        callback(result);
      });
    });
  },

  findOnKeyWord: function (table, query, callback) {
    logger.info('Finding one in table %s', table);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);

      dbo.collection(table).find({ keywords: query }).toArray(function (error, result) {
        if (error) {
          db.close();
          throw error;
        }

        logger.silly('Found one result', result);
        db.close();
        callback(result);
      });
    });
  },

  findCompanyJobs: function (query, callback) {
    logger.info('Searching database for company jobs');
    logger.silly('Using query %s', query);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);

      dbo.collection('job').find({ companyID: query }).toArray(function (error, result) {
        if (error) {
          db.close();
          throw error;
        }

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
        if (error) {
          db.close();
          throw error;
        }

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
        if (error) {
          db.close();
          throw error;
        }

        logger.silly('Adding company to database result', result);
        db.close();
        callback(result);
      });
    });
  },

  changeStudentInfo: function (myQuery, newValues, callback) {
    logger.info('Changing student information in database');
    logger.silly('Using query %s, new values %j', myQuery, newValues);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);
      var ObjectId = require('mongodb').ObjectID;

      dbo.collection('student').update({ "_id": new ObjectId(myQuery) }, { $set: newValues }, function (error, result) {
        if (error) {
          db.close();
          throw error;
        }

        logger.silly('Changing student information in database result', result);
        db.close();
        callback(result);
      });
    });
  },

  addStudent: function (student, callback) {
    logger.info('Adding student to database');
    logger.silly('Using student object %j', student);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);

      dbo.collection("student").ensureIndex({ uname: 1 }, { unique: true });

      dbo.collection("student").insertOne(student, function (error, result) {
        if (error) {
          db.close();
          throw error;
        }

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
        if (error) {
          db.close();
          throw error;
        }

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
          if (error) {
            db.close();
            throw error;
          }

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

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

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

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);
      var ObjectId = require('mongodb').ObjectID;
      var jobID = new ObjectId(jobId);

      dbo.collection('job').remove({ '_id': jobID }, function (error, obj) {
        if (error) {
          db.close();
          throw error;
        }

        logger.debug('Remove job from job collection.', obj.result);
        callback(obj.result);
        db.close();
      });
    });
  },

  getStudentInterestMessages: function (studentId, callback) {
    logger.info('Getting student interest messages');
    logger.debug('Using userID %s', studentId);

    var ObjectId = require('mongodb').ObjectID;
    var studentObjectId = new ObjectId(studentId);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db(database);
      dbo.collection('student').findOne({ _id: studentObjectId }, { projection: { _id: 0, joblist: 1 } }, function (error, result) {
        if (error) {
          db.close();
          throw error;
        }

        var jobList = result.joblist;
        logger.debug('Found student object:', jobList);
        if (jobList.length === 0) {
          logger.info('No job interests found.');
          db.close();
          callback("false");
        }
        else {
          let jobArray = [];
          for (let i = 0; i < jobList.length; i++) {
            findSpecificJob(jobList[i].jobID, function (jobResult) {

              jobArray.push({ jobs: jobResult, message: jobList[i].message });

              if (jobArray.length === jobList.length) {
                logger.debug('Job array produced', jobArray);
                db.close();
                callback(jobArray);
              }
            });
          }
        }
      });
    });
  },

  getStudentsById: function (idArray, callback) {
    logger.info('Getting students by ids');
    logger.debug('Using idArray %j', idArray);

    var objectIdArray = makeObjectIdArray(idArray)
    MongoClient.connect(url, function (error, db) {
      if (error) throw error;
      var dbo = db.db(database);
      dbo.collection('student').find({ _id: { $in: objectIdArray } },
        { projection: { _id: 1, uemail: 1, cv: 1 } }).toArray(function (error, result) {
          if (error) {
            db.close();
            throw error;
          }

          logger.silly('Getting students by ids result:', result);
          db.close();
          callback(result);
        });
    });
  },

  getJobsDescriptions: function (NumberOfJobs, callback) {
    logger.debug('Get %s job descriptions', NumberOfJobs);

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db("db");

      dbo.collection("job").aggregate([
        {
          '$project': {
            'tile': 1,
            'logoURL': 1,
            'shortdesc': 1,
            'popularity': { '$size': '$studentlist' }
          }
        },
        { '$sort': { 'popularity': -1 } }
      ])
        .limit(NumberOfJobs)
        .toArray(function (error, result) {
          if (error) {
            db.close();
            throw error;
          }

          logger.silly("Get job description result", result);

          db.close();
          callback(result);
        });
    });
  },

  getNumberOfJobs: function (callback) {
    logger.debug('Get number of jobs');

    MongoClient.connect(url, function (error, db) {
      if (error) throw error;

      var dbo = db.db("db");

      dbo.collection("job").count(function (error, result) {
        if (error) {
          db.close();
          throw error;
        }

        logger.debug("Got %s jobs", result);

        db.close();
        callback(result);
      });
    });
  }
};

var faqList=[
  {place:"companyUtlogg",
  question:"Hur registrerar jag ett företag?",
  answer:"Håll muspekaren över fliken 'Registrera' högst upp i högra hörnet.<br>Klicka därefter på 'Företag' på menyn som fälls ned.<br>Fyll därefter i dina uppgifter och klicka på knappen 'Registrera'."},

  {place:"companyUtlogg",
  question:"Hur loggar jag in som företag?",
  answer:"Håll muspekaren över fliken 'logga in' högst upp i högra hörnet. <br> Klicka därefter på 'Företag' på menyn som fälls ned.<br>Fyll därefter i dina uppgifter och klicka på knappen 'LOGGA IN'."},

  {place:"studentUtlogg",
  question:"Hur registrerar jag ett studentkonto?",
  answer:"Håll muspekaren över fliken 'Registrera' högst upp i högra hörnet.<br>Klicka därefter på 'Student' på menyn som fälls ned.<br>Fyll därefter i dina uppgifter och klicka på knappen 'Registrera'."},

  {place:"studentUtlogg",
  question:"Hur loggar jag in som student?",
  answer:"Håll muspekaren över fliken 'logga in' högst upp i högra hörnet. <br> Klicka därefter på 'Student' på menyn som fälls ned.<br>Fyll därefter i dina uppgifter och klicka på knappen 'LOGGA IN'."},

  {place:"studentInlogg",
  question:"Hur anmäler jag intresse till ett examensarbete?",
  answer:"Du anmäler ditt intresse till ett examensarbete genom följande steg.<ol>"
  +"<li>Klicka på 'Bläddra examensarbete' eller 'Rekommenderade jobb'.</li>"
  +"<li>Klicka sedan 'Visa annons' på den annons du vill anmäla ditt intresse till.</li>"
  +"<li>Skriv sedan ett kort meddelande till företaget. Detta meddelande ger dig chansen att lämna ett första intryck hos företaget.</li>"
  +"<li>Klicka på 'Lämna intresseanmälan'.</li>"
  +"</ol>"
},

  {place:"studentInlogg",
  question:"Vad är 'Rekommenderade jobb'?",
  answer:"Rekommenderade jobb är arbeten som vi tror kan passa dig. Detta baseras på de nyckelord du valt att klickat i under 'Redigera information'."},

  {place:"studentInlogg",
  question:"Hur får jag matchande jobb?",
  answer:"Matchande jobb får du genom att klicka i en eller flera nyckelord under 'Redigera information'.<br>Dessa nyckelord matchas sedan ihop med företags examensarbetens områden.<br>Matchar ett eller flera av era nyckelord kommer examensarbetet visas under dina 'Rekommenderade jobb'"},

  {place:"studentInlogg",
  question:"Hur laddar jag upp mitt CV?",
  answer:"Du kan ladda upp ditt CV med dessa steg.<ol>"
  +"<li>Klicka på 'Redigera information'.</li>"
  +"<li>Klicka på 'Ladda upp cv(pdf)' under Personlig information.</li>"
  +"<li>Välj sedan ditt CV från din dator, detta cv måste vara av formatet .pdf.</li>"
  +"<li>Skriv sedan in ditt lösenord för att bekräfta att det är just du som utför förändringarna.</li>"
  +"<li>Klicka på 'Spara'.</li>"
  +"</ol>"
},

  {place:"studentInlogg",
  question:"Hur tar jag bort ett anmält intresse?",
  answer:"Detta gör du genom att klicka på fliken 'Mina intresseanmälningar'.<br>Klicka sedan på 'Ta bort intresseanmälan'"},

  {place:"studentInlogg",
  question:"Hur redigerar jag min information?",
  answer:"Klicka på fliken 'Redigera information'.<br>Fyll sedan i dina uppgifter efter angiven efterfråga.<br>Bekräfta din identitet med att ange ditt lösenord.<br>Glöm inte att klicka 'Spara'"},


  {place:"studentInlogg",
  question:"Hur avaktiverar jag mitt konot?",
  answer:"Det kan du inte. <br>Ändra din utbildning till 'TA BORT' och skicka ett mail till oss på skynet@oru.se, så tar vi bort ditt konto åt dig."},

  {place:"companyInlogg",
  question:"Hur lägger jag upp ett examensarbete?",
  answer:"Detta kan du göra genom följande steg.<ol>"
  +"<li>Klicka på fliken 'Lägg till annons'.</li>"
  +"<li>Fyll i den efterfrågade informationen i fälten.</li>"
  +"<li>Var sedan noga med att kryssa i de områden arbetet kommer behandla. Dessa nyckelord matchas med studenternas intressen.</li>"
  +"<li>Klicka 'Spara'.</li>"
  +"</ol>"
},

  {place:"companyInlogg",
  question:"Hur redigerar jag informationen på ett uppladdat examensarbete?",
  answer:"Detta gör du genom följande steg.<ol>"
  +"<li>Klicka på 'Aktiva erbjudanden'</li>"
  +"<li>Klicka sedan på 'Redigera' direkt, eller klicka på 'Visa annons' och sedan på 'Redigera'</li>"
  +"<li>Fyll i efterfrågad information i fälten.</li>"
  +"<li>Klicka på 'Spara'</li>"
  +"</ol>"
},

{place:"companyInlogg",
question:"Hur ser jag intresseanmälningar på ett examensarbete?",
answer:"Detta gör du genom följande steg.<ol>"
+"<li>Klicka på 'Aktiva erbjudanden'</li>"
+"<li>Klicka sedan på 'Intresseanmälningar' direkt, eller klicka på 'Visa annons' och sedan på 'Visa intresseanmälningar'</li>"
+"<li>Här kan du se alla studenter som skickat en intresseanmälan. Finns det inget efter en vecka rekommenderar vi att ändra informationen om examensarbetet.</li>"
+"<li>För att se kontaktuppgifter och information om student. Klicka på knappen 'Visa CV'</li>"
+"</ol>"
},

{place:"companyInlogg",
question:"Hur tar jag bort ett examensarbete?",
answer:"Detta gör du genom följande steg.<ol>"
+"<li>Klicka på 'Aktiva erbjudanden'</li>"
+"<li>Klicka sedan på 'Visa annons'.</li>"
+"<li>Klicka sedan på 'Radera annons'</li>"
+"</ol>"
+"När du klickat på 'Radera annons' tas arbetet bort från din profil samt hos alla studenter som skickat intresseanmälan.<br>"
+"Borttagen annons kan ej återskapas."
},

{place:"companyInlogg",
question:"Hur redigerar jag min information?",
answer:"Detta gör du genom följande steg.<ol>"
+"<li>Klicka på 'Redigera information'</li>"
+"<li>Fyll sedan i efterfrågad information i fälten.</li>"
+"<li>Bekräfta din identitet genom att bekräfta ändringen med ditt lösenord.</li>"
+"<li>Klicka sedan på 'Spara'</li>"
+"</ol>"
},

{place:"companyInlogg",
question:"Hur lägger jag till en logga?",
answer:"Detta gör du genom följande steg.<ol>"
+"<li>Klicka på 'Redigera information'</li>"
+"<li>Fyll sedan i en länk till en bild på din logotype.</li>"
+"<li>Bekräfta din identitet genom att bekräfta ändringen med ditt lösenord.</li>"
+"<li>Klicka sedan på 'Spara'</li>"
+"</ol>"
},

{place:"companyInlogg",
  question:"Hur avaktiverar jag mitt konot?",
  answer:"Det kan du inte. <br>Ändra din profil 'Om Oss' till 'TA BORT' och skicka ett mail till oss på skynet@oru.se, så tar vi bort ditt konto åt dig."},


];

function addInterestStudent(database, studentId, jobId, message, callback) {
  logger.info('Adding interest to student');
  logger.debug('Using studentId %s, jobId %s and message %s', studentId, jobId, message);

  var ObjectId = require('mongodb').ObjectID;
  var studentObjectId = new ObjectId(studentId);

  database.collection('student').updateOne({ '_id': studentObjectId },
    { $push: { joblist: { jobID: jobId, message: message } } }, function (error, result) {
      if (error) {
        database.close();
        throw error;
      }

      logger.debug('Adding job to student joblist, result:', result.result);
      callback(result);
    });
}

function addInterestJob(database, studentId, jobId, message, callback) {
  logger.info('Adding interest to job');
  logger.debug('Using studentId %s, jobId %s and message %s', studentId, jobId, message);

  var ObjectId = require('mongodb').ObjectID;
  var jobObjectId = new ObjectId(jobId);

  database.collection('job').updateOne({ '_id': jobObjectId },
    { $push: { studentlist: { studentID: studentId, message: message } } }, function (error, result) {
      if (error) {
        database.close();
        throw error;
      }

      logger.debug('Adding student to job studentlist, result:', result.result);
      callback(result);
    });
}

//Vet inte om den fungerar..
function checkExistingInterest(database, studentId, jobId, callback) {
  logger.info('Checking if already interest exists');
  logger.debug('Using studentId %s and jobId %s', studentId, jobId);

  var ObjectId = require('mongodb').ObjectID;
  var studentObjectId = new ObjectId(studentId);
  var jobObjectId = new ObjectId(jobId);

  database.collection('student').findOne({ _id: { $eq: studentObjectId }, joblist: { $elemMatch: { jobID: jobObjectId } } },
    function (error, result) {
      if (error) {
        database.close();
        throw error;
      }

      logger.silly('Checking if student already has job in joblist.', result);
      callback(result);
    });
}

function removeInterestFromStudent(database, studentId, jobId, callback) {
  logger.info('Removing interest from student');
  logger.debug('Using studentId %s and jobId %s', studentId, jobId);

  var ObjectId = require('mongodb').ObjectID;
  var studentObjectId = new ObjectId(studentId);

  database.collection('student').update({ '_id': studentObjectId },
    { $pull: { joblist: { jobID: jobId } } }, function (error, result) {
      if (error) {
        database.close();
        throw error;
      }

      logger.debug('Remove interest message from student.', result.result);
      callback(result);
    });
}

function findSpecificJob(jobId, callback) {
  logger.info('Searching for specific job in database');
  logger.debug('Using jobId %s', jobId);

  MongoClient.connect(url, function (error, db) {
    if (error) throw error;

    var dbo = db.db(database);
    var ObjectId = require('mongodb').ObjectID;

    dbo.collection('job').find({ "_id": new ObjectId(jobId) }).toArray(function (error, result) {
      if (error) {
        db.close();
        throw error;
      }

      db.close();
      callback(result);
    });
  });
}

function removeInterestFromJob(database, jobId, studentId, callback) {
  logger.info('Removing interest message from job in database');
  logger.debug('Using jobId %s and studentId %s', jobId, studentId);

  var ObjectId = require('mongodb').ObjectID;
  var jobObjectId = new ObjectId(jobId);

  database.collection('job').update({ '_id': jobObjectId },
    { $pull: { studentlist: { studentID: studentId } } }, function (error, result) {
      if (error) {
        db.close();
        throw error;
      }

      logger.debug('Remove interest message from job.', result.result);
      callback(result);
    });
}

function addStudent(student, callback) {
  MongoClient.connect(url, function (error, db) {
    if (error) throw error;

    var dbo = db.db("db");
    dbo.collection("student").ensureIndex({ _user: 1 }, { unique: true });

    dbo.collection("student").insertOne(student, function (error, result) {
      if (error) {
        db.close();
        throw error;
      }

      db.close();
      callback(result);
    });
  });
}

function addCompany(company, callback) {
  MongoClient.connect(url, function (error, db) {
    if (error) throw error;

    var dbo = db.db("db");
    dbo.collection("company").ensureIndex({ _user: 1 }, { unique: true });

    dbo.collection("company").insertOne(company, function (error, result) {
      if (error) {
        db.close();
        throw error;
      }

      logger.debug("Number of documents inserted: %s", result.insertedCount);

      db.close();
      callback(result);
    });
  });
}

function makeObjectIdArray(idArray) {
  var ObjectId = require('mongodb').ObjectID;

  let objectIdArray = [];
  for (let id in idArray) {
    objectIdArray.push(new ObjectId(idArray[id]));
  }

  return objectIdArray;
}

function getJobsDescriptions(NumberOfJobs, callback) {
  logger.debug('Get %s job descriptions', NumberOfJobs);

  MongoClient.connect(url, function (error, db) {
    if (error) throw error;

    var dbo = db.db("db");

    dbo.collection("job").aggregate([
      {
        '$project': {
          'title': 1,
          'logoURL': 1,
          'shortdesc': 1,
          'popularity': { '$size': '$studentlist' }
        }
      },
      { '$sort': { 'popularity': -1 } }
    ])
      .limit(NumberOfJobs)
      .toArray(function (error, result) {
        if (error) {
          db.close();
          throw error;
        }

        logger.debug("Get job description result", result);

        db.close();
        callback(result);
      });
  });
}


