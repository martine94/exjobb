"use strict";

//#region Laddar in yttre biblotek

//Express
var express = require('express');
var app = express();

//Body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
var urlEncodedParcer = bodyParser.urlencoded({ extended: true });

//Mongo
var Mongo = require('./mongo/mongo.js');

//Client-sessions
var session = require('client-sessions'); //kommentera ut denna om ni inte har Sessions installerat
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));
var cookieParser = require('cookie-parser');

//Path - för att hämta sökvägen för projektet
var path = require('path');

//Serverns ip-address
var ipAdress = "127.0.0.1:2000"; //Används om man vill köra lokalt
//dgustafsson.ml buggar ibland, kör med 90.231.125.248
//var ipAdress="dgustafsson.ml";
//var ipAdress="90.231.125.248:2000";
var serverAddress = "http://" + ipAdress;
var portNumber = "2000";

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
            label: 'app.js',
            level: 'debug'
        }),
        new (winston.transports.File)({
            name: 'error-file',
            filename: 'applog-error.log',
            level: 'error'
        })
    ]
});

//#endregion

//#region Sökvägar

//Ändra till express.static('../') för att nå riktiga sidan
app.use(express.static('./views/index'));
app.use(express.static(__dirname + '/style'));
app.use(express.static(__dirname + '/script'));
app.use(express.static(__dirname + '/views/company'));
app.use(express.static(__dirname + '/views/student'));
app.use(express.static(__dirname + '/views/index'));
app.use(express.static(__dirname + '/resources'));

var dirIndex = path.join(__dirname, '/views/index');
var dirCompany = path.join(__dirname, '/views/company');
var dirStudent = path.join(__dirname, '/views/student');

//#endregion

//#region LoadFileFunctions

app.get('/loadFileIndex', urlEncodedParcer, function (req, res) {
    logger.info('GET /loadFileIndex location = %s path = %s', req.query['l'], req.query['p']);
    var location = req.query["l"];
    var _path = req.query["p"];
    res.sendFile(path.join(dirIndex, _path));
});
app.get('/removeExjob', urlEncodedParcer, function (req, res) {
    let jobID = req.query["jobID"];
    let companyID = getUserID(req);
    let userIDInterestArray=[];
    //getting specific Job from DB
    var ObjectId = require('mongodb').ObjectId;
    var o_id = new ObjectId(jobID);
    Mongo.findOne("job", { "_id": o_id }, function (result) {
        if (result.length === 0) {
            console.log("false");
        } else {
            result[0].studentlist.forEach(function(studID){
                console.log(studID);
                userIDInterestArray.push(studID.studentID);
            });
            console.log(userIDInterestArray);
        }
        if(userIDInterestArray.length>0){
            //Removing job from all students that have an interest in it
            for(let i=0;i<userIDInterestArray.length;++i){
                try {
                    Mongo.removeInterestMessage(userIDInterestArray[i], jobID, function (result2) {
                    });
                } catch (error) {
                    logger.error('Error', error);
                }
            }
            //Removing job object
            try {
                Mongo.removeJob( jobID, function (result3) {
                });
            } catch (error) {
                logger.error('Error', error);
            }
            res.send("true");
        } else{
            res.send("false");
        }
    });
});

app.get('/loadFileCompany', urlEncodedParcer, function (req, res) {
    logger.info('GET /loadFileCompany location = %s path = %s', req.query['l'], req.query['p']);
    var location = req.query["l"];
    var _path = req.query["p"];
    res.sendFile(path.join(dirCompany, _path));
});
app.get('/loadFileStudent', urlEncodedParcer, function (req, res) {
    logger.info('GET /loadFileStudent location = %s path = %s', req.query['l'], req.query['p']);
    var location = req.query["l"];
    var _path = req.query["p"];
    res.sendFile(path.join(dirStudent, _path));
});

//#endregion

//#region Loggin

app.get('/logginComp', urlEncodedParcer, function (req, res) {
    logger.info('GET /logginComp request');
    logger.debug('Username %s', req.query["username"]);

    Mongo.findOne("company", { userName: req.query["username"] }, function (result) {
        logger.debug('Loggin Company query result:', result);

        if (result.length === 0) {
            logger.info('Login failed: No user match');
            res.send("false");
        } else {
            if (result[0].password === req.query["password"]) {
                logger.info('Login success');
                req.session.user = "_id:" + result[0]._id;
                res.send("true");
            } else {
                logger.info('Login failed: Wrong password');
                res.send("false");
            }
        }
    });
});

app.get('/logginStudent', urlEncodedParcer, function (req, res) {
    logger.info('GET /logginStudent request');
    logger.debug('Username %s', req.query["_user"]);

    Mongo.findOne("student", { uname: req.query["_user"] }, function (result) {
        logger.debug('Loggin Company query result:', result);

        if (result.length === 0) {
            logger.info('Login failed: No user match');
            res.send("false");
        } else {
            if (result[0].password === req.query["password"]) {
                logger.info('Login success');
                req.session.user = "_id:" + result[0]._id;
                res.send("true");
            } else {
                logger.info('Login failed: Wrong password');
                res.send("false");
            }
        }
    });
});

app.get('/loggedIn', function (req, resp) {
    logger.info('GET /loggedIn request');

    if (req.session && req.session.user) {
        logger.debug('Found session', req.session.user);
        resp.end(JSON.stringify(req.session.user));
    } else {
        logger.debug('No session found', req.session);
        resp.redirect('');
    }
});

app.get('/logout', function (req, resp) {
    logger.info('GET /logout request');
    req.session.reset();
    //var redirectAddress = serverAddress + '/index.html';
    resp.send("true");
});

function getUserID(req) {
    if (req.session && req.session.user) {
        logger.debug('Found session', req.session.user);
        var cookieStr = JSON.stringify(req.session.user);
        var modstr = cookieStr.replace(/["']/g, "");
        var split = modstr.split(",");
        var sid = split[0].split(":");
        var userID = sid[1];
        return userID;
    } else {
        logger.debug('No session found', req.session);
        return ("false");
    }
}

function getUser(req) {
    let userID = getUserID(req);
    if (userID !== 'false') {
        Mongo.findOne("student", userID, function (result) {
            logger.debug('UserID is: %s \nMongo found: %j', userID, result);
        });
        return userID;
    }
    return false;
}

//#endregion

//#region Student

app.post('/register_student', urlEncodedParcer, function (req, resp) {
    logger.info('GET /register_student request');

    let response = {
        name: req.query["ufname"],
        lastname: req.query["ulname"],
        city: req.query["ucity"],
        ueducation: req.query["uedu"],
        uemail: req.query["uemail"],
        uname: req.query["uname"],
        password: req.query["psw"],
        keywords: [],
        joblist: [],
        cv: req.query["cv"]
    };

    logger.debug('Register form is:', response);

    try {
        Mongo.addStudent(response, function (result) {
            if (result instanceof Error) {
                logger.error('Error', result);
                if (result.code === 11000) {
                    resp.send("false");
                }
            }
            else {
                logger.debug('Successfully added an student');
                req.session.user = "_id:" + response._id; // för session
                resp.send("true");
            }
        });
    }
    catch (error) {
        logger.error('Caught error', error);
    }
});

app.post('/changeStudentInfo', urlEncodedParcer, function (req, res) {
    logger.info('GET /changeStudentInfo request');

    var user = {
        name: req.query["ufname"],
        lastname: req.query["ulname"],
        city: req.query["ucity"],
        ueducation: req.query["uedu"],
        uemail: req.query["uemail"],
        uname: req.query["uname"],
        password: req.query["psw"],
        keywords: req.query["keywords"],
        joblist: [],
        cv: req.body["cv"]
    }

    logger.debug('Change student info:', user);

    try {
        let myQuery = getUserID(req);
        Mongo.changeStudentInfo(myQuery, user, function (result) {
            if (result instanceof Error) {
                logger.error('Error', result);
                if (result.code === 11000) {
                    res.send("false");
                }
            }
            else {
                logger.debug('Successfully changed student info');
                res.send("true");
            }
        });
    }
    catch (error) {
        logger.error('Caught error', error);
    }
});


app.get('/userDataFromDBStudent', function (req, res) {
    console.log("GET /userDataFromDB.html request");
    var userID = getUserID(req);
    if (userID == "false") {
        console.log("could not find user")
        res.send("false");
    } else {
        //console.log(userID);
        var ObjectId = require('mongodb').ObjectId;
        var o_id = new ObjectId(userID);
        Mongo.findOne("student", { "_id": o_id }, function (result) {
            //console.log(JSON.stringify(result));
            if (result.length === 0) {
                console.log("false");
                res.send("false");
            } else {
                console.log("userInfo from DB");
                //console.log(JSON.stringify(result));
                res.send(result);
            }
        });
    }
});


app.post('/changeStudentInfo', urlEncodedParcer, function (req, res) {
    let userObj = JSON.parse(req.query["userObj"]);
    userObj["cv"] = req.body["cv"];
    try {
        let studentID = getUserID(req);
        Mongo.changeUserInfo('student', studentID, userObj, function (result) {
            if (result instanceof Error) {
                console.log("Error!");
                if (result.code === 11000) {
                    console.log("back");
                    res.send("false");
                }
            }
            else {
                console.log("Probably Sucess!");
                res.send("true");
            }
        });
    }
    catch (error) {
        console.log("Caught error!");
        console.log(error.name);
        console.log(error);
    }
});

//#region Interests

app.get('/removeInterestMessage', function (req, res) {
    logger.info('GET /removeInterestMessage request');

    let userId = getUserID(req);
    let jobId = req.query["jobID"];
    logger.debug('Removing interest from user: %s and jobid: %s', userId, jobId);

    try {
        Mongo.removeInterestMessage(userId, jobId, function (result) {
            res.send("true");
        });
    } catch (error) {
        logger.error('Error', error);
    }

});

app.post('/addInterestMessage', urlEncodedParcer, function (req, res) {
    logger.info('GET /removeInterestMessage request');

    let userId = getUserID(req);
    let jobId = req.query["jobID"];
    logger.debug('Removing interest from user: %s and jobid: %s', userId, jobId);

    try {
        Mongo.pushInterestMessage(jobId, userId, req.query["message"], function (result) {
            res.send('true');
        })
    } catch (error) {
        logger.error('Error', error);
        res.send('false');
    }
});

app.get('/getStudentInterestMessages', function (req, res) {
    logger.info("GET /getStudentInterestMessages request");

    let userId = getUserID(req);
    if (userId == "false") {
        logger.info("Could not find user");
        res.send("false");
    } else {
        Mongo.getStudentInterestMessages(userId, function (result) {
            res.send(result);
        });
    }
});

//#endregion

//#endregion

//#region Company

app.post('/changeCompanyInfo', urlEncodedParcer, function (req, res) {
    console.log("company change POST request");
    var user = {
        companyName: req.query["cname"],
        companyAddress: req.query["caddress"],
        companyCity: req.query["ccity"],
        companyEmail: req.query["cemail"],
        userName: req.query["cuname"],
        password: req.query["psw"],
        website: req.query["cweb"],
        logoURL: req.query["clogo"],
        about: req.query["cAboutUs"]
    }
    try {
        let companyID = getUserID(req);
        Mongo.changeUserInfo('company', companyID, user, function (result) {
            if (result instanceof Error) {
                console.log("Error!");
                if (result.code === 11000) {
                    console.log("back");
                    res.send("false");
                }
            }
            else {
                console.log("Probably Sucess!");
                res.send("true");
            }
        });
    }
    catch (error) {
        console.log("Caught error!");
        console.log(error.name);
        console.log(error);
    }
});

app.post('/register_company', urlEncodedParcer, function (req, resp) {
    console.log("company register POST request");
    var response = {
        companyName: req.query["cname"],
        companyAddress: req.query["caddress"],
        companyCity: req.query["ccity"],
        companyEmail: req.query["cemail"],
        userName: req.query["cuname"],
        password: req.query["psw"],
        website: "",
        logoURL: "sad.png",
        about: ""
    };
    // console.log(response)

    try {
        Mongo.addCompany(response, function (result) {
            if (result instanceof Error) {
                console.log("Error!");
                // console.log(result);
                if (result.code === 11000) {
                    console.log("back");
                    resp.send("false");
                }
            }
            else {
                console.log("Success!");
                req.session.user = "_id:" + response._id; // för session
                resp.send("true");
            }
        });
    }
    catch (error) {
        console.log("Caught error!");
        console.log(error.name);
    }
});

app.get('/userDataFromDBCompany', function (req, res) {
    console.log("GET /userDataFromDB.html request");
    var userID = getUserID(req);
    if (userID == "false") {
        console.log("could not find user")
        res.send("false");
    } else {
        //console.log(userID);
        var ObjectId = require('mongodb').ObjectId;
        var o_id = new ObjectId(userID);
        Mongo.findOne("company", { "_id": o_id }, function (result) {
            // console.log(JSON.stringify(result));
            if (result.length === 0) {
                console.log("false");
                res.send("false");
            } else {
                console.log("userInfo from DB");
                // console.log(JSON.stringify(result));
                res.send(result);
            }
        });
    }
});

//#endregion

//#region Jobs

app.post('/addJobToDB', urlEncodedParcer, function (req, res) {
    console.log("POST add job request");
    var userID = getUserID(req);
    if (userID == "false") {
        console.log("could not find user")
        res.send("false");
    } else {
        // console.log(userID);
        var ObjectId = require('mongodb').ObjectId;
        var o_id = new ObjectId(userID);
        Mongo.findOne("company", { "_id": o_id }, function (result) {
            if (result.length === 0) {
                console.log("false");
                res.send("false");
            } else {
                console.log("userInfo from DB");
                //console.log(result);
                //console.log(req.query["exJobb"]);
                var exjobb = JSON.parse(req.query["exJobb"]);
                exjobb.logoURL = result[0].logoURL;
                exjobb.companyName = result[0].companyName;
                exjobb.website = result[0].website;
                exjobb.companyID = userID;
                //console.log(exjobb);
                try {
                    Mongo.addJob(exjobb, function (result) {
                        if (result instanceof Error) {
                            console.log("Error!");
                            // console.log(result);
                            if (result.code === 11000) {
                                console.log("back");
                                res.send("false");
                            }
                        }
                        else {
                            console.log("Success!");
                            res.send("true");
                        }
                    });
                }
                catch (error) {
                    console.log("Caught error!");
                    console.log(error.name);
                }
            }
        });
    }

});

app.get('/getJobsFromDB', function (req, res) {
    Mongo.findOne("job", {}, function (result) {
        // console.log(JSON.stringify(result));
        if (result.length === 0) {
            console.log("false, job could not be found.");
            res.send("false");
        } else {
            res.send(result);
        }
    });
});

app.get('/getCompanyJobsFromDB', function (req, res) {
    var userid = getUserID(req);
    Mongo.findCompanyJobs(userid, function (result) {
        // console.log(JSON.stringify(result));
        if (result.length === 0) {
            console.log("false, job could not be found.");
            res.send("false");
        } else {
            res.send(result);
        }
    });
});

app.get('/getSpecificJobFromDB', urlEncodedParcer, function (req, res) {
    var jobid = req.query["jobID"];
    Mongo.findSpecificJob(jobid, function (result) {
        if (result.length === 0) {
            console.log("false, job could not be found.");
            res.send("false");
        } else {
            // console.log("RESULTATET: "+JSON.stringify(result));
            res.send(result);
        }
    });
});

app.post('/changeExJobInfo', urlEncodedParcer, function (req, res) {
    console.log("company change POST request");
    var exjobb = JSON.parse(req.query["exJobb"]);
    try {
        jobID = req.query["jobID"];
        //console.log("EXJOBB= "+JSON.stringify(exjobb));
        Mongo.changeExJobInfo(jobID, exjobb, function (result) {
            if (result instanceof Error) {
                console.log("Error!");
                // console.log(result);
                if (result.code === 11000) {
                    console.log("back");
                    res.send("false");
                }
            }
            else {
                console.log("Probably Sucess!");
                res.send("true");
            }
        });
    }
    catch (error) {
        console.log("Caught error!");
        console.log(error.name);
        console.log(error);
    }
});

//#endregion

var server = app.listen(portNumber, function () {
    var host = ipAdress;//server.address().address; 
    var port = portNumber;//server.address().port;
    logger.info("Express app listening at http://%s", host);
});

server.on('connection', conn => {
    logger.info("Connection recieved");
});
