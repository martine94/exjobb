var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var urlEncodedParcer=bodyParser.urlencoded({extended:true});


//Ändra till express.static('../') för att nå riktiga sidan
//app.use(express.static('./copyPlattform/'))
app.use(express.static('../'));
app.get('/app_get', function (req, resp) {
    console.log("GET request");
    resp.send('Nothing to GET');
});
app.post('/register_company',urlEncodedParcer, function (req, resp) {
    console.log("company register POST request");
    response={
        //format: [variabelnamn]:req.body.[inmatningsfönstrets namn]
        cname:req.body.cname,
        caddress:req.body.cadress,
        ccity:req.body.ccity,
        uwebpage:req.body.uwebpage,
        uemail:req.body.uemail,
        uname:req.body.uname,
        password:req.body.psw
    };
    console.log(response)
    //Fixa så man kommer dit man ska efter post
    //resp.end(JSON.stringify(response));
    resp.redirect(303,'http://127.0.0.1/Company.html');

    //Kalla på databasgrejer
});

app.post('/register_student',urlEncodedParcer, function (req, resp) {
    console.log("student register POST request");
    var ugender="";
    console.log(JSON.stringify(req.body.gender_male));
    if(req.body.gender_male){
        ugender="male";
    } else{
        ugender="female";
    }
    response={
        //format: [variabelnamn]:req.body.[inmatningsfönstrets namn]
        name:req.body.ufname,
        lastname:req.body.ulname,
        city:req.body.ucity,
        ueducation:req.body.ueducation,
        uemail:req.body.uemail,
        uname:req.body.uname,
        password:req.body.psw,
        gender:ugender
    };
    console.log(response)
    //Fixa så man kommer dit man ska efter post
    resp.end(JSON.stringify(response));
    //resp.end();
});

app.post('/login_student',urlEncodedParcer, function (req, resp) {
    console.log("student register POST request");
    response={
        //format: [variabelnamn]:req.body.[inmatningsfönstrets namn]
        uname:req.body.uname,
        password:req.body.psw
    };
    console.log(response)
    //Fixa så man kommer dit man ska efter post
    //resp.end(JSON.stringify(response));
    //resp.end();
    resp.redirect(303,'http://127.0.0.1/Student.html');
    //skicka vidare till inloggad eller inte inloggad
});

app.post('/login_company',urlEncodedParcer, function (req, resp) {
    console.log("student register POST request");
    response={
        //format: [variabelnamn]:req.body.[inmatningsfönstrets namn]
        uname:req.body.uname,
        password:req.body.psw
    };
    console.log(response)
    //Fixa så man kommer dit man ska efter post
    //resp.end(JSON.stringify(response));
    //resp.end();
    resp.redirect(303,'http://127.0.0.1/Company.html');
    //skicka vidare till inloggad eller inte inloggad
});

app.delete('/app_delete', function (req, resp) {
    console.log("Delete request");
    resp.send("Delete request sent");
});

var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Express app listening at http://%s:%s", host, port);
});

server.on('connection',conn=>{
    console.log("Connection recieved");
});