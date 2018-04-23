var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Mongo = require('../mongo/mongoTest.js');
var urlEncodedParcer = bodyParser.urlencoded({ extended: true });


var ipAdress="127.0.0.1"; //Används om man vill köra lokalt
//var ipAdress="90.231.125.248";
var serverAddress='http://'+ipAdress; 
var portNumber="1999";

//Ändra till express.static('../') för att nå riktiga sidan
//app.use(express.static('./copyPlattform/'))
app.use(express.static('../'));
app.get('/app_get', function (req, resp) {
    console.log("GET request");
    resp.send('Nothing to GET');
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
    Mongo.addCompany(response, function(result){
        if(result.insertedCount === 1)
            console.log("Success!");
        else
            console.log("Failure!");
    });
    //resp.end(JSON.stringify(response));
    var redirectAddress=serverAddress+':'+portNumber+'/Company.html';
    resp.redirect(303, redirectAddress);

    //Kalla på databasgrejer
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
    //Fixa så man kommer dit man ska efter post
    //resp.end(JSON.stringify(response));
    var redirectAddress=serverAddress+':'+portNumber+'/Student.html';
    resp.redirect(303, redirectAddress);
    //resp.end();
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
            var redirectAddress=serverAddress+':'+portNumber+'/Student.html';
            resp.redirect(303, redirectAddress);
        }
        else{
            console.log("Wrong password or username!");
            //Tillsvidare
            var redirectAddress=serverAddress+':'+portNumber;
            resp.redirect(303, redirectAddress);

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
            var redirectAddress=serverAddress+':'+portNumber+'/Company.html';
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

/*var server = app.listen(2000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Express app listening at http://%s:%s", host, port);
});*/

server.on('connection', conn => {
    console.log("Connection recieved");
});
