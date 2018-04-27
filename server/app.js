var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Mongo = require('../mongo/mongo.js');
var urlEncodedParcer = bodyParser.urlencoded({ extended: true });
var session =require('client-sessions'); //kommentera ut denna om ni inte har Sessions installerat
var cookieParser=require('cookie-parser');
var ipAdress="127.0.0.1:2000"; //Används om man vill köra lokalt
//dgustafsson.ml buggar ibland, kör med 90.231.125.248
//var ipAdress="dgustafsson.ml";
//var ipAdress="90.231.125.248:2000";
var serverAddress="http://"+ipAdress; 
var portNumber="2000";
var path=require('path');


app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30*60*1000,
    activeDuration: 5*60*1000,
}));
//Ändra till express.static('../') för att nå riktiga sidan
app.use(express.static('../'));

app.get('/loadRegComp', function(req,res){
    console.log("Get /regCompany request");
    res.sendFile(path.join(__dirname, '../', '/regCompany.html'));
});
app.get('/loadRegStudent', function(req,res){
    console.log("Get /regStud request");
    res.sendFile(path.join(__dirname, '../', '/regStudent.html'));
});
app.get('/loadLogInStudent', function(req,res){
    console.log("Get /reglogStud request");
    res.sendFile(path.join(__dirname, '../', '/logInStudent.html'));
});
app.get('/loadLogInComp', function(req,res){
    console.log("Get /reglogComp request");
    res.sendFile(path.join(__dirname, '../', '/logInComp.html'));
});

app.get('/app_get', function (req, resp, next) {
    console.log("GET request");
    resp.send('Nothing to GET');
});

app.get('/loggedIn',function(req,resp){
    if(req.session&&req.session.user){
        console.log("found session");
        console.log(req.session.user);
        resp.end(JSON.stringify(req.session.user));
        //resp.end(req.session.user);
    }else{
        console.log("redirect2");
        resp.redirect('');
    }
});
app.get('/userData', function (req, res) {
    console.log("GET /userData.html request");
    /*Mongo.getUserData(function(result){
        console.log(result);
        res.send(result);
    });*/
    if(req.session&&req.session.user){
        console.log("found session");
        console.log(req.session.user);
        res.send(JSON.stringify(req.session.user));
    }else{
        console.log("not logged in");
        res.send("You are not logged in.")
    }
});
app.get('/logout',function(req,resp){
    req.session.reset();
    var redirectAddress=serverAddress+'/index.html';
    resp.redirect(redirectAddress);
});

app.post('/register_company', urlEncodedParcer, function (req, resp) {
    console.log("company register POST request");
    response = {
        //format: [variabelnamn]:req.body.[inmatningsfönstrets namn]
        companyName: req.body.cname,
        companyAddress: req.body.cadress,
        companyCity: req.body.ccity,
        companyEmail: req.body.uemail,
        userName: req.body.uname,
        password: req.body.psw
    };
    console.log(response)
    //Fixa så man kommer dit man ska efter post
    
    try{
        Mongo.addCompany(response, function(result){
            if(result instanceof Error){
                console.log("Error!");
                console.log(result);
                if(result.code === 11000)
                {
                    console.log("back");
                    resp.redirect('back');
                    //resp.redirect('#');
                    //req.body.uname.value = "Fel användarnamn";
                }
            }
            else{
                var redirectAddress=serverAddress+'/Company.html';
                console.log("Success!");
                console.log(redirectAddress);
                resp.redirect(303, redirectAddress);
            }
        });
    }
    catch(error){
        console.log("Caught error!");
        console.log(error.name);
    }
    
    //resp.end(JSON.stringify(response));
});

app.post('/register_student', urlEncodedParcer, function (req, resp) {
    console.log("student register POST request");
    var ugender = "";
    console.log(JSON.stringify(req.body.gender_male));
    if (req.body.gender_male) {
        ugender = "male";
    } else {
        ugender = "female";
    }
    response = {
        //format: [variabelnamn]:req.body.[inmatningsfönstrets namn]
        name: req.body.ufname,
        lastname: req.body.ulname,
        city: req.body.ucity,
        ueducation: req.body.ueducation,
        uemail: req.body.uemail,
        uname: req.body.uname,
        password: req.body.psw,
        gender: ugender
    };
    console.log(response)
    var redirectAddress=serverAddress + '/Student.html';
    resp.redirect(303, redirectAddress);
});

app.post('/login_student', urlEncodedParcer, function (req, resp) {
    console.log("student register POST request");
    response = {
        //format: [variabelnamn]:req.body.[inmatningsfönstrets namn]
        uname: req.body.uname,
        password: req.body.psw
    };
    console.log(response);

    //Fixa så man kommer dit man ska efter post

    Mongo.login("student", response.uname, response.password, function(result){
        console.log("Result has length: " + result.length);
        if(result.length == 1){
            console.log("Login successfull!");
            var redirectAddress=serverAddress+'/Student.html';
            req.session.user=result; // för session
            console.log(req.session.user);
            resp.redirect(303, redirectAddress);
        }
        else{
            console.log("Wrong password or username!");
        }
    });

    //resp.end(JSON.stringify(response));
    //resp.end();

    //skicka vidare till inloggad eller inte inloggad
});

app.post('/login_company', urlEncodedParcer, function (req, resp) {
    console.log("student register POST request");
    response = {
        //format: [variabelnamn]:req.body.[inmatningsfönstrets namn]
        uname: req.body.uname,
        password: req.body.psw
    };
    console.log(response)
    //Fixa så man kommer dit man ska efter post
    //resp.end(JSON.stringify(response));
    //resp.end();
    
    //skicka vidare till inloggad eller inte inloggad

    Mongo.login("company", response.uname, response.password, function(result){
        
        console.log("Result has length: " + result.length);

        if(result.length == 1){
            console.log("Login successfull!");
            var redirectAddress=serverAddress +'/Company.html';
            req.session.user=result; // för session
            console.log(req.session.user);
            resp.redirect(303, redirectAddress);
        }
        else{
            console.log("Wrong password or username!");
        }
    });
    
});

app.delete('/app_delete', function (req, resp) {
    console.log("Delete request");
    resp.send("Delete request sent");
});

var server = app.listen(portNumber, function () {
    var host = ipAdress;//server.address().address; 
    var port = portNumber;//server.address().port;
    console.log("Express app listening at http://%s:%s", host, port);
});

app.get('/logginComp', urlEncodedParcer, function(req, res){
    console.log("GET /loggin request");
    console.log(req.query);
    console.log("Checking if " + req.query["username"] + " and password " +req.query["password"]+ ".");
    Mongo.findOne("company", {username: req.query["userName"]}, function(result){
        if(result.length === 0){
            res.send("false");
        }else{
            if(result[0].password === req.query["password"])
            {
                res.send("true");
            }else{
                res.send("false");
            }
        }
    });
});

app.get('/logginStudent', urlEncodedParcer, function(req, res){
    console.log("GET /loggin request");
    console.log(req.query);
    Mongo.findOne("student", {_user: req.query["_user"]}, function(result){
        if(result.length === 0){
            res.send("false");
        }else{
            if(result[0].password === req.query["password"])
            {
                res.send("true");
            }else{
                res.send("false");
            }
        }
    });
});
/*var server = app.listen(2000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Express app listening at http://%s:%s", host, port);
});*/

server.on('connection', conn => {
    console.log("Connection recieved");
});
