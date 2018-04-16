var express = require('express');
var app = express();
var bodyParser=require('body-parser');
var urlEncodedParcer=bodyParser.urlencoded({extended:false});


//Ändra till express.static('../') för att nå riktiga sidan
//app.use(express.static('./copyPlattform/'))
app.use(express.static('../'));
app.get('/app_get', function (req, resp) {
    console.log("GET request");
    resp.send('Nothing to GET');
});
app.post('/register_company',urlEncodedParcer, function (req, resp) {
    console.log("POST request");
    response={
        //format: [variabelnamn]:req.body.[inmatningsfönstrets namn]
        //first_name:req.body.first_name,
        //last_name:req.body.last_name
        cname:req.body.cname,
        caddress:req.body.cadress,
        ccity:req.body.ccity,
        uwebpage:req.body.uwebpage,
        uemail:req.body.uemail,
        uname:req.body.uname,
        password:req.body.psw
    };
    console.log(response)
    //Fixa så man inte kommer åt helvete efter submit
    resp.end(JSON.stringify(response));
});

app.post('/register_student',urlEncodedParcer, function (req, resp) {
    console.log("POST request");
    response={
        //format: [variabelnamn]:req.body.[inmatningsfönstrets namn]
        //first_name:req.body.first_name,
        //last_name:req.body.last_name
        cname:req.body.cname,
        caddress:req.body.cadress,
        ccity:req.body.ccity,
        uwebpage:req.body.uwebpage,
        uemail:req.body.uemail,
        uname:req.body.uname,
        password:req.body.psw
    };
    console.log(response)
    //Fixa så man inte kommer åt helvete efter submit
    resp.end(JSON.stringify(response));
});

app.delete('/app_delete', function (req, resp) {
    console.log("Delete request");
    resp.send("Delete request sent");
});

var server = app.listen(80, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Express app listening at http://%s:%s', host, port);
});

server.on('connection',conn=>{
    console.log("Connection recieved");
});