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


app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));
//Ändra till express.static('../') för att nå riktiga sidan
app.use(express.static('./views/index'));
app.use(express.static(__dirname+'/style'));
app.use(express.static(__dirname+'/script'));
app.use(express.static(__dirname+'/views/company'));
app.use(express.static(__dirname+'/views/student'));
app.use(express.static(__dirname+'/views/index'));
app.use(express.static(__dirname+'/resources'));

app.get('/loadFile',urlEncodedParcer, function (req, res) {
    var location=req.query["l"];
    var path=req.query["p"];
    res.sendFile(path.join(__dirname, location, path));
});


app.get('/loadNewExJob', function(req,res){
    res.sendFile(path.join(__dirname, '/views/company', '/newExJob.html'));
});
app.get('/loadMyCPages', function(req,res){
    res.sendFile(path.join(__dirname, '/views/company', '/myCompanyPages.html'));
});
app.get('/loadmyCOffers', function(req,res){
    res.sendFile(path.join(__dirname, '/views/company', '/myOffers.html'));
});
app.get('/loadMyInterests', function(req,res){
    res.sendFile(path.join(__dirname, '/views/student', '/mySJobs.html'));
});
app.get('/loadMySProfile', function(req,res){
    res.sendFile(path.join(__dirname, '/views/student', '/mySProfile.html'));
});
app.get('/loadMyRecomendedJobs', function(req,res){
    res.sendFile(path.join(__dirname, '/views/student', '/myRecomendedJobs.html'));
});
app.get('/loadMyInfo', function(req,res){ //student
    res.sendFile(path.join(__dirname, '/views/student', '/mySInfo.html'));
});
app.get('/loadmyInfoC', function(req,res){ //company bör refaktoriseras
    res.sendFile(path.join(__dirname, '/views/company', '/myCInfo.html'));
});

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
        console.log("found session");
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
app.get('/userDataFromDBStudent', function (req, res) {
    console.log("GET /userDataFromDB.html request");
    var userID = getUserID(req);
    if (userID == "false") {
        console.log("could not find user")
        res.send("false");
    } else {
        console.log(userID);
        var ObjectId = require('mongodb').ObjectId;
        var o_id = new ObjectId(userID);
        Mongo.findOne("student", { "_id": o_id }, function (result) {
            console.log(JSON.stringify(result));
            if (result.length === 0) {
                console.log("false");
                res.send("false");
            } else {
                console.log("userInfo from DB");
                console.log(JSON.stringify(result));
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
        console.log(userID);
        var ObjectId = require('mongodb').ObjectId;
        var o_id = new ObjectId(userID);
        Mongo.findOne("company", { "_id": o_id }, function (result) {
            console.log(JSON.stringify(result));
            if (result.length === 0) {
                console.log("false");
                res.send("false");
            } else {
                console.log("userInfo from DB");
                console.log(JSON.stringify(result));
                res.send(result);
            }
        });
    }
});

app.get('/getJobsFromDB',function(req,res){
    Mongo.findOne("job", {}, function (result) {
        console.log(JSON.stringify(result));
        if (result.length === 0) {
            console.log("false");
            res.send("false");
        } else {
            console.log("userInfo from DB");
            console.log(JSON.stringify(result));
            res.send(result);
        }
    });
});

app.get('/logout', function (req, resp) {
    req.session.reset();
    var redirectAddress = serverAddress + '/index.html';
    resp.send("true");
});
app.post('/changeCompanyInfo',urlEncodedParcer,function(req,res){
    console.log("company change POST request");
    var user={
        companyName: req.query["cname"],
        companyAddress: req.query["caddress"],
        companyCity: req.query["ccity"],
        companyEmail: req.query["cemail"],
        userName: req.query["cuname"],
        password: req.query["psw"],
        website:req.query["cweb"],
        logoURL:req.query["clogo"]
    }
    try {
        myQuery=getUserID(req);
       console.log(myQuery);
        Mongo.changeCompanyInfo(myQuery,user,function (result) {
            if (result instanceof Error) {
                console.log("Error!");
                console.log(result);
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
        logoURL: ""
    };
    console.log(response)

    try {
        Mongo.addCompany(response, function (result) {
            if (result instanceof Error) {
                console.log("Error!");
                console.log(result);
                if (result.code === 11000) {
                    console.log("back");
                    resp.send("false");
                }
            }
            else {
                console.log("Success!");
                req.session.user = "_id:"+ response._id; // för session
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
        gender: req.query["gender"]
    };
    console.log(response)
    try {
        Mongo.addStudent(response, function (result) {
            if (result instanceof Error) {
                console.log("Error!");
                console.log(result);
                if (result.code === 11000) {
                    console.log("back");
                    resp.send("false");
                }
            }
            else {
                console.log("Success!");
                console.log(response._id);
                req.session.user ="_id:"+ response._id; // för session
                resp.send("true");
            }
        });
    }
    catch (error) {
        console.log("Caught error!");
        console.log(error.name);
    }
});

app.post('/addJobToDB',urlEncodedParcer, function (req, res){
    console.log("POST add job request");
    var userID = getUserID(req);
    if (userID == "false") {
        console.log("could not find user")
        res.send("false");
    } else {
        console.log(userID);
        var ObjectId = require('mongodb').ObjectId;
        var o_id = new ObjectId(userID);
        Mongo.findOne("company", { "_id": o_id }, function (result) {
            if (result.length === 0) {
                console.log("false");
                res.send("false");
            } else {
                console.log("userInfo from DB");
                console.log(result);
                console.log(req.query["exJobb"]);
                var exjobb=JSON.parse(req.query["exJobb"]);
                exjobb.logoURL=result[0].logoURL;
                exjobb.companyName=result[0].companyName;
                exjobb.website=result[0].website;
                console.log(exjobb);
                try {
                    Mongo.addJob(exjobb, function (result) {
                        if (result instanceof Error) {
                            console.log("Error!");
                            console.log(result);
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
    console.log(req.query);
    console.log("Checking if " + req.query["username"] + " and password " + req.query["password"] + ".");
    Mongo.findOne("company", { userName: req.query["username"] }, function (result) {
        console.log(JSON.stringify(result));
        if (result.length === 0) {
            res.send("false");
        } else {
            if (result[0].password === req.query["password"]) {
                req.session.user = result[0]; // för session
                res.send("true");
            } else {
                res.send("false");
                console.log(JSON.stringify(result[0].password));
            }
        }
    });
});

app.get('/logginStudent', urlEncodedParcer, function (req, res) {
    console.log("GET /loggin request");
    console.log(req.query);
    Mongo.findOne("student", { uname: req.query["_user"] }, function (result) {
        if (result.length === 0) {
            res.send("false");
        } else {
            if (result[0].password === req.query["password"]) {
                req.session.user = result[0];
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
