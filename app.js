var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Mongo = require('./mongo/mongo.js');
var urlEncodedParcer = bodyParser.urlencoded({ extended: true });
var session = require('client-sessions'); //kommentera ut denna om ni inte har Sessions installerat
var cookieParser = require('cookie-parser');
var ipAdress = "127.0.0.1:2000"; //Används om man vill köra lokalt
//dgustafsson.ml buggar ibland, kör med 90.231.125.248
//var ipAdress="dgustafsson.ml";
//var ipAdress="90.231.125.248:2000";
var serverAddress = "http://" + ipAdress;
var portNumber = "2000";
var path = require('path');

//#region Logging
const winston = require('winston');

winston.configure({
    //Winston uses six levels of logging: error, warn, info, verbose, debug and silly.
    transports: [
        new (winston.transports.Console)({
            level: 'debug'
        }),
        new (winston.transports.File)({
            name: 'debug-file',
            filename: 'applog-debug.log',
            level: 'debug'
        })
    ]
});

//loggning test
/* winston.log('error', 'Error test!');
winston.log('info', 'Info test!');
winston.log('debug', 'Debug test!'); */

//#endregion

app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));
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

//#region LoadFileFunctions
app.get('/loadFileIndex', urlEncodedParcer, function (req, res) {
    var location = req.query["l"];
    var _path = req.query["p"];
    res.sendFile(path.join(dirIndex, _path));
});

app.get('/loadFileCompany', urlEncodedParcer, function (req, res) {
    var location = req.query["l"];
    var _path = req.query["p"];
    res.sendFile(path.join(dirCompany, _path));
});
app.get('/loadFileStudent', urlEncodedParcer, function (req, res) {
    var location = req.query["l"];
    var _path = req.query["p"];
    res.sendFile(path.join(dirStudent, _path));
});

//#endregion

app.get('/loggedIn', function (req, resp) {
    if (req.session && req.session.user) {
        console.log("found session");
        console.log(req.session.user);
        resp.end(JSON.stringify(req.session.user));
        //resp.end(req.session.user);
    } else {
        console.log("redirect2");
        resp.redirect('');
    }
});

function getUserID(req) {
    if (req.session && req.session.user) {
        //console.log("found session");
        var cookieStr = JSON.stringify(req.session.user);
        var modstr = cookieStr.replace(/["']/g, "");
        var split = modstr.split(",");
        var sid = split[0].split(":");
        var userID = sid[1];
        return userID;
    } else {
        return ("false");
    }
}
app.get('/removeInterest', function (req, res) {
    console.log("/Get removeInterest");
    let userID = getUserID(req);
    let jobID = req.query["jobID"];
    console.log(userID + " : " + jobID);
    var ObjectId = require('mongodb').ObjectId;
    var o_id = new ObjectId(userID);
    Mongo.findOne("student", { "_id": o_id }, function (result) {
        if (result.length === 0) {
            //res.send("false");
        } else {
            for (let i = 0; i < result[0].joblist.length; ++i) {
                if (result[0].joblist[i].jobID === jobID) {
                    Mongo.removeInterestFromStudent(userID, result[0].joblist[i], function (resultat2) {
                        if (resultat2.length === 0) {
                        } else {
                            var o_id2 = new ObjectId(jobID);
                            Mongo.findOne("job", { "_id": o_id2 }, function (result3) {
                                if (result3.length === 0) {
                                } else {
                                    for (let i = 0; i < result3[0].studentlist.length; ++i) {
                                        if (result3[0].studentlist[i].studentID === userID) {
                                            Mongo.removeInterestFromJob(jobID, result3[0].studentlist[i], function (resultat2) {
                                                console.log("DELETED");
                                            });
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            }
            res.send("true");
        }
    });
});

app.get('/getInterestJob', function (req, res) {
    console.log("/GET getInterestJob request");
    let userID = getUserID(req);
    if (userID == "false") {
        console.log("could not find user")
        res.send("false");
    } else {
        var ObjectId = require('mongodb').ObjectId;
        var o_id = new ObjectId(userID);
        Mongo.findOne("student", { "_id": o_id }, function (result) {
            if (result.length === 0) {
                console.log("false");
                res.send("false");
            } else {
                var jobArray = [];
                if (!result[0].joblist) { res.send("false"); } else {
                    for (let i = 0; i < result[0].joblist.length; ++i) {
                        var jobid = result[0].joblist[i].jobID;
                        Mongo.findSpecificJob(jobid, function (jobresult) {
                            if (jobresult.length === 0) {
                                console.log("false, job could not be found.");
                                res.send("false");
                            } else {
                                jobArray.push({ jobs: jobresult, message: result[0].joblist[i].message });
                                if (jobArray.length === result[0].joblist.length) {
                                    res.send(jobArray);
                                }
                            }
                        });
                    }
                }

            }
        });
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

app.get('/logout', function (req, resp) {
    req.session.reset();
    var redirectAddress = serverAddress + '/index.html';
    resp.send("true");
});
app.post('/addInterest', urlEncodedParcer, function (req, res) {
    try {
        Mongo.pushInterest(req.query["jobID"], getUserID(req), req.query["message"], function (result) {
            if (result instanceof Error) {
                if (result.code === 11000) {
                    console.log("back");
                    res.send("false");
                }
            }
            else {
                // res.send("true");
                try {
                    Mongo.pushInterestToStudent(req.query["jobID"], getUserID(req), req.query["message"], function (result) {
                        if (result instanceof Error) {
                            if (result.code === 11000) {
                                console.log("back");
                                res.send("false");
                            }
                        }
                        else {
                            console.log("true");
                            res.send("true");
                        }
                    });
                }
                catch (error) {
                    console.log("Caught error!");
                    console.log(error.name);
                    console.log(error);
                }
            }
        });
    }
    catch (error) {
        console.log("Caught error!");
        console.log(error.name);
        console.log(error);
    }

});
app.post('/changeStudentInfo',urlEncodedParcer,function(req,res){
    let userObj=JSON.parse(req.query["userObj"]);
    try {
        let studentID = getUserID(req);
        Mongo.changeUserInfo('student',studentID, userObj, function (result) {
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
        Mongo.changeUserInfo('company',companyID, user, function (result) {
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

app.post('/register_company', urlEncodedParcer, function (req, resp) {
    console.log("company register POST request");
    response = {
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

app.post('/register_student', urlEncodedParcer, function (req, resp) {
    console.log("student register POST request");
    response = {
        name: req.query["ufname"],
        lastname: req.query["ulname"],
        city: req.query["ucity"],
        ueducation: req.query["uedu"],
        uemail: req.query["uemail"],
        uname: req.query["uname"],
        password: req.query["psw"],
        gender: req.query["gender"],
        keywords:[]
    };
    // console.log(response)
    try {
        Mongo.addStudent(response, function (result) {
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
                // console.log(response._id);
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
app.delete('/app_delete', function (req, resp) {
    console.log("Delete request");
    resp.send("Delete request sent");
});

var server = app.listen(portNumber, function () {
    var host = ipAdress;//server.address().address; 
    var port = portNumber;//server.address().port;
    console.log("Express app listening at http://%s", host);
});

app.get('/logginComp', urlEncodedParcer, function (req, res) {
    console.log("GET /loggin request");
    // console.log(req.query);
    console.log("Checking if " + req.query["username"] + " and password " + req.query["password"] + ".");
    Mongo.findOne("company", { userName: req.query["username"] }, function (result) {
        // console.log(JSON.stringify(result));
        if (result.length === 0) {
            res.send("false");
        } else {
            if (result[0].password === req.query["password"]) {
                // req.session.user = result[0]; // för session
                req.session.user = "_id:" + result[0]._id;
                res.send("true");
            } else {
                res.send("false");
                // console.log(JSON.stringify(result[0].password));
            }
        }
    });
});

app.get('/logginStudent', urlEncodedParcer, function (req, res) {
    console.log("GET /loggin request");
    // console.log(req.query);
    Mongo.findOne("student", { uname: req.query["_user"] }, function (result) {
        if (result.length === 0) {
            res.send("false");
        } else {
            if (result[0].password === req.query["password"]) {
                req.session.user = "_id:" + result[0]._id;
                res.send("true");
            } else {
                res.send("false");
            }
        }
    });
});
server.on('connection', conn => {
    console.log("Connection recieved");
});
